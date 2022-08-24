# Serverless API

Followed this tutorial: [Build a Serverless API with Cloudflare Workers](https://egghead.io/lessons/cloudflare-introduction-to-build-a-serverless-api-with-cloudflare-workers)

The API data is saved at `src/resources_store.ts`.

For more advanced use cases: [Build an API for your front end using Cloudflare Workers](https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers)

## WOO API

Overview and usage: https://serverless-woo-api.cf-testing.workers.dev/

The entire API data content can be accessed like this: `https://serverless-woo-api.cf-testing.workers.dev/api/resources/`

Add a number at the end of the URL to return the specific ID: `https://serverless-woo-api.cf-testing.workers.dev/api/resources/1`

## OpenAPI Schema

View the OpenAPI Schema of this API here: [SwaggerHub OpenAPI Schema](https://app.swaggerhub.com/apis/tototatutu/serverless-api-resources/0.1#/info)

* * * *
* * * *


# ʕ •́؈•̀) `worker-typescript-template`

A batteries included template for kick starting a TypeScript Cloudflare worker project.

## Note: You must use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) 1.17 or newer to use this template.

## 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate my-ts-project https://github.com/cloudflare/worker-typescript-template
```

### 👩 💻 Developing

[`src/index.ts`](./src/index.ts) calls the request handler in [`src/handler.ts`](./src/handler.ts), and will return the [request method](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) for the given request.

### 🧪 Testing

This template comes with jest tests which simply test that the request handler can handle each request method. `npm test` will run your tests.

### ✏️ Formatting

This template uses [`prettier`](https://prettier.io/) to format the project. To invoke, run `npm run format`.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

## 🤢 Issues

If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/cloudflare/worker-typescript-template/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/wrangler/issues).

## ⚠️ Caveats

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.
