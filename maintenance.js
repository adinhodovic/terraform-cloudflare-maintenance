addEventListener("fetch", event => {
  event.respondWith(fetchAndReplace(event.request))
})

async function fetchAndReplace(request) {

  let modifiedHeaders = new Headers()

  modifiedHeaders.set('Content-Type', 'text/html')
  modifiedHeaders.append('Pragma', 'no-cache')

  // Allow users from configured IPs into site
  if (WHITELIST_IPS !== "null") {
    if (WHITELIST_IPS.split(',').indexOf(request.headers.get("cf-connecting-ip")) > -1)
    {
      return fetch(request)
    }
  }

  // Allow users to access paths that are whitelisted using regex expressions
  if (WHITELIST_PATH !== "null") {
    const { pathname } = new URL(request.url);
    if (pathname.match(WHITELIST_PATH))
    {
      return fetch(request)
    }
  }

    // Return modified response.
  return new Response(maintenancePage, {
    status: 503,
    headers: modifiedHeaders
  })
}

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
            <h1>Our site is currently down for maintenance</h1>
            <p>We apologize for any inconvenience caused and we will be online as soon as possible. Please check again in a little while. Thank you!</p>
            %{ if statuspage_url != "null" }
            <p>You can follow the updated information on our <a href="${statuspage_url}">status page</a>.</p>
            %{ endif }
            <p>&mdash; ${company_name}</p>
        </div>
        %{ if image_url != "" }
        <img class="image-main" src="${image_url}" alt="Maintenance image">
        %{ endif }
        <hr />
        <a href="mailto:${email}?subject=Maintenance">You can reach us at: ${email}</a>
    </div>
</body>
`;
