const Resources = async () => {
  // Reference: https://github.com/ejcx/csprng.xyz/blob/master/csprng.js
  const body = `<!DOCTYPE html>
  <head>
  <style>
    body {
      max-width:650px;
      margin: 2em auto 4em;
      padding: 0 1rem;
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      -webkit-font-smoothing: antialiased;
    }
    ul {
      list-style:none;
      padding-left:0;
    }
    li.spacer {
      padding-top:15px;
    }
    .code {
      font-family:monospace;
      padding-right:25px;
    }
    .codeblock {
      font-family:monospace;
      background-color:#e2e2e2;
      padding:25px;
    }
  </style>
  </head>
  <body>
    <h2>Serverless World of Opportunities API</h2>
    <p>
    <table>
      <tr><td class="code">/api/resources</td><td>Request JSON data from Cloudflare's edge servers.</td></tr>
      <tr></tr>
      <tr></tr>
      <tr class="padrow"></tr>
      <tr><td><i>Path params:</i></td><td></td></tr>
      <tr><td>/</td><td>Returns all.</td></tr>
      <tr><td>#</td><td>ID Number. Valid for integer between 1 and 381</td></tr>
    </table>
    <h3>Example</h3>
    <pre class="codeblock">
  $ curl https://api.cf-testing.com/api/resources/32
  {
    "id":32,
    "title":"Bitbucket",
    "description":"Bitbucket is more than just Git code management",
    "url":"https://bitbucket.org/product",
    "main_cat1":"WEB DEV",
    "main_cat2":"",
    "tag1":"DEVELOPMENT",
    "tag2":"PLATFORM",
    "tag3":"GIT CODE"
 }</pre>
  <a href="https://github.com/DavidJKTofan/serverless-woo-api" target="_blank">GitHub Repository</a>
  </body>
  </html>`;

  const headers = {
    // 'Access-Control-Allow-Origin': '*',
    'Content-type': 'text/html',
  }
  return new Response(body, { headers })
}

export default Resources
