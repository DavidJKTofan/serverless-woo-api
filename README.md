# Serverless API

Followed this tutorial: [Build a Serverless API with Cloudflare Workers](https://egghead.io/lessons/cloudflare-introduction-to-build-a-serverless-api-with-cloudflare-workers)

The API data is saved at `src/resources_store.ts`.

For more advanced use cases: [Build an API for your front end using Cloudflare Workers](https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers)

## WOO API

Overview and usage: https://api.cf-testing.com/

The entire API data content can be accessed like this: `https://api.cf-testing.com/api/resources/`

Add a number at the end of the URL to return the specific ID: `https://api.cf-testing.com/api/resources/1`

[Custom Error Response](https://developers.cloudflare.com/rules/custom-error-responses/): `https://api.cf-testing.com/api/resources/?custom=error`

## OpenAPI Schema

With OpenAPI Schema one can use Cloudflare's [API Shield Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) feature in order to define which API requests are valid.

View the OpenAPI Schema of this API here: [SwaggerHub OpenAPI Schema](https://app.swaggerhub.com/apis/tototatutu/serverless-api-resources/0.1#/info)

```
openapi: 3.0.1
info:
  title: Serverless API on Resources
  description: World of Opportunities API through Cloudflare Workers
  version: '0.1'
  license:
    name: MIT
servers:
  - url: https://api.cf-testing.com/api
paths:
  /resources:
    get:
      summary: List all resources from the World of Opportunities database
      operationId: listResources
      tags:
        - resources
      description: Auto generated using Swagger Inspector
      responses:
        '200':
          description: Auto generated using Swagger Inspector

  /resources/{id}:
    get:
      summary: Resource from the World of Opportunities database
      operationId: listResource
      tags:
        - resource
      description: Auto generated using Swagger Inspector
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the resource to retrieve (max 381)
          schema:
            type: integer
            format: int32
      responses:
        '200':
          description: Auto generated using Swagger Inspector
          content:
            application/json:
              schema:
                type: object
                properties:
                  main_cat1:
                    type: string
                  tag1:
                    type: string
                  main_cat2:
                    type: string
                  description:
                    type: string
                  id:
                    type: integer
                  title:
                    type: string
                  url:
                    type: string
                  tag2:
                    type: string
                  tag3:
                    type: string
              examples:
                '0':
                  value: >-
                    {"id":2,"title":"1 Million Free
                    Pictures","description":"Alternative source of free public
                    domain
                    pictures","url":"https://www.1millionfreepictures.com/","main_cat1":"CREATIVE","main_cat2":"","tag1":"PHOTO
                    STOCKS","tag2":"","tag3":""}
```

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
