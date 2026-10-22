const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const workerTemplate = fs.readFileSync(path.join(__dirname, '..', 'maintenance.js'), 'utf8');

class MockHeaders {
    constructor(values = {}) {
        this.values = new Map(Object.entries(values).map(([key, value]) => [key.toLowerCase(), String(value)]));
    }

    get(name) {
        return this.values.has(name.toLowerCase()) ? this.values.get(name.toLowerCase()) : null;
    }

    set(name, value) {
        this.values.set(name.toLowerCase(), String(value));
    }

    append(name, value) {
        this.set(name, this.get(name) ? `${this.get(name)}, ${value}` : value);
    }
}

class MockRequest {
    constructor(url, init = {}) {
        this.url = url;
        this.headers = new MockHeaders(init.headers);
    }
}

class MockResponse {
    constructor(body, init = {}) {
        this.body = body;
        this.status = init.status === undefined ? 200 : init.status;
        this.headers = init.headers;
    }
}

function renderWorker(whitelistPath = 'null') {
    const values = {
        company_name: 'Synthetic Company',
        logo_url: 'https://assets.example.invalid/logo.png',
        favicon_url: 'https://assets.example.invalid/favicon.ico',
        image_url: '',
        font: 'Synthetic Sans',
        email: 'support@example.invalid',
        info_html: '',
        statuspage_url: 'null',
        google_font: 'Synthetic+Sans',
    };
    let worker = workerTemplate;

    const conditionals = [
        ['info_html', '', values.info_html !== ''],
        ['statuspage_url', 'null', values.statuspage_url !== 'null'],
        ['image_url', '', values.image_url !== ''],
    ];

    for (const [name, disabledValue, include] of conditionals) {
        const opening = `%{ if ${name} != "${disabledValue}" }`;
        const closing = '%{ endif }';
        const start = worker.indexOf(opening);
        const end = worker.indexOf(closing, start);
        assert.notEqual(start, -1, `missing ${name} template condition`);
        assert.notEqual(end, -1, `missing ${name} template end`);
        const block = include ? worker.slice(start + opening.length, end) : '';
        worker = worker.slice(0, start) + block + worker.slice(end + closing.length);
    }

    worker = worker.replace(/\$\{([a-z_]+)\}/g, (placeholder, name) => {
        assert.ok(Object.prototype.hasOwnProperty.call(values, name), `unexpected template variable ${name}`);
        return values[name];
    });

    let fetchHandler;
    const originRequests = [];
    const context = {
        WHITELIST_IPS: 'null',
        WHITELIST_PATH: whitelistPath,
        Headers: MockHeaders,
        Request: MockRequest,
        Response: MockResponse,
        URL,
        fetch: async (request) => {
            originRequests.push(request.url);
            return new MockResponse('synthetic origin', { status: 200 });
        },
        addEventListener: (name, handler) => {
            assert.equal(name, 'fetch');
            fetchHandler = handler;
        },
    };

    vm.runInNewContext(worker, context, { timeout: 1000 });
    assert.equal(typeof fetchHandler, 'function', 'Worker registers its fetch handler');

    return async (pathname) => {
        let responsePromise;
        fetchHandler({
            request: new MockRequest(`https://synthetic.example.invalid${pathname}`),
            respondWith: (promise) => {
                responsePromise = promise;
            },
        });
        return { response: await responsePromise, originRequests: [...originRequests] };
    };
}

async function main() {
    const blankPath = renderWorker('');
    const blankResult = await blankPath('/');
    assert.equal(blankResult.response.status, 503, 'an empty path whitelist must not expose every route');
    assert.deepEqual(blankResult.originRequests, [], 'an empty path whitelist must not fetch the origin');

    const configuredPath = renderWorker('^/health$');
    const healthResult = await configuredPath('/health');
    const rootResult = await configuredPath('/');
    assert.equal(healthResult.response.status, 200, 'a matching synthetic health path is whitelisted');
    assert.equal(rootResult.response.status, 503, 'a non-matching path remains in maintenance mode');

    console.log('Synthetic Worker tests passed.');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
