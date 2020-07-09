const white_list = WHITE_LIST_IPS.split(',');

addEventListener("fetch", event => {
  event.respondWith(fetchAndReplace(event.request))
})

async function fetchAndReplace(request) {

  let modifiedHeaders = new Headers()

  modifiedHeaders.set('Content-Type', 'text/html')
  modifiedHeaders.append('Pragma', 'no-cache')


  //Allow users from trusted into site
  if (white_list.indexOf(request.headers.get("cf-connecting-ip")) > -1)
  {
    //Fire all other requests directly to our WebServers
    return fetch(request)
  }
  else //Return maint page if you're not calling from a trusted IP
  {
    // Return modified response.
    return new Response(maintPage(COMPANY_NAME, LOGO_URL), {
      status: 503,
      headers: modifiedHeaders
    })
  }
}

let maintPage = (company_name, logo_url) => `
<!doctype html>
<title>Site Maintenance</title>
<style>
    body {
        text-align: center;
        padding: 150px;
    }

    .content {
        background-color: rgba(255, 255, 255, 0.75);
        background-size: 100%;
        color: inherit;
        padding-top: 1px;
        padding-bottom: 10px;
        padding-left: 100px;
        padding-right: 100px;
        border-radius: 15px;
    }

    h1 {
        font-size: 40pt;
    }

    body {
        font: 20px Helvetica, sans-serif;
        color: #333;
    }

    article {
        display: block;
        text-align: left;
        width: 75%;
        margin: 0 auto;
    }

    a:hover {
        color: #333;
        text-decoration: none;
    }
</style>

<article>
    <div class="content">
        <h1>We&rsquo;ll be back soon!</h1>
        <img src="${logo_url}">
        <p>We&rsquo;re very sorry for the inconvenience but we&rsquo;re performing maintenance. Please check back soon...</p>
        <p>&mdash; ${company_name} Team</p>
    </div>
</article>

`;

