addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
});

const whitelistIps = process.env.WHITELIST_IPS?.split(',') || null;
const whitelistPath = process.env.WHITELIST_PATH ? new RegExp(process.env.WHITELIST_PATH) : null;

const maintenancePage = `
  <!doctype html>
  <head>
    <title>Site Maintenance</title>
    <link href="https://fonts.googleapis.com/css2?family=${google_font}&display=swap" rel="stylesheet"/>
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <link rel="icon" href="${favicon_url}"/>
    <style>
        body {
            text-align: center;
            font-family: "${font}", sans-serif;
            color: #0C1231;
        }

        .logo {
            margin-top: 3rem;
            max-height: 35px;
            width: auto;
        }

        .content {
            margin: 0 auto;
            max-width: 1000px;
            width: 90%;
        }

        .info {
            margin: 0 auto;
            margin-top: 3rem;
            max-width: 500px;
        }

        h1 {
            font-weight: 600;
            font-size: 1.8rem;
        }

        .image-main {
            margin-top: 3rem;
            max-width: 90%;
        }

        hr {
            border: 1px solid rgba(0, 0, 0, 0.08);
            margin: 0 auto;
            margin-top: 2rem;
            margin-bottom: 1rem;
            max-width: 90%;
        }

        a {
            text-decoration: none;
            color: #535353
        }

        a:hover {
            color: #0C1231;
        }

        @media (min-width: 968px) {
            .logo {
                max-height: 45px;
            }

            h1 {
                font-size: 2.5rem;
            }

            .info {
                margin-top: 6rem;
            }

            hr {
                margin-top: 6rem;
                margin-bottom: 3rem;
            }
        }
    </style>
  </head>
  <body>
    <div class="content">
      <img class="logo" src="${logo_url}" alt="${company_name}">
      <div class="info">
        <h1>Our site is currently undergoing maintenance. We apologize for the inconvenience and will be back online soon.</h1>
      </div>
    </div>
    <img class="image-main" src="${maintenance_image_url}" alt="Maintenance">
    <hr>
    <div class="info">
      <p>In the meantime, you can contact us at <a href="mailto:${support_email}">${support_email}</a> for any urgent matters.</p>
    </div>
  </body>
</html>
`;

async function handleRequest(request) {
  const { headers } = request;
  const requestPath = new URL(request.url).pathname;
  const remoteAddress = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.headers.get("x-client-ip") || request.headers.get("x-remote-ip") || request.connection.remoteAddress;

  // check if the request is coming from a whitelisted IP
  if (whitelistIps?.includes(remoteAddress)) {
    return fetch(request);
