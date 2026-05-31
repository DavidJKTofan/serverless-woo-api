# Serverless API

**Disclaimer:** This project is intended for educational purposes only and was originally developed approximately in the year 2022.

Followed this tutorial: [Build a Serverless API with Cloudflare Workers](https://egghead.io/lessons/cloudflare-introduction-to-build-a-serverless-api-with-cloudflare-workers)

The API data is saved at `src/resources.ts`.

For more advanced use cases: [Build an API for your front end using Cloudflare Workers](https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers)

## WOO API

Overview and usage: https://api.cf-testing.com/

The entire API data content can be accessed like this: `https://api.cf-testing.com/api/resources`

Add a number at the end of the URL to return a specific ID: `https://api.cf-testing.com/api/resources/1`

Filter by main category with the `category` query parameter (case-insensitive): `https://api.cf-testing.com/api/resources?category=WEB%20DEV`

List the distinct main categories: `https://api.cf-testing.com/api/categories`

All endpoints return minified JSON by default. Append `?pretty` to any request for an indented, human-readable response. Responses are wrapped in a `{ "data": ..., "count": ... }` envelope (`count` is omitted for single-resource lookups).

## OpenAPI Schema

With OpenAPI Schema one can use Cloudflare's [API Shield Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) feature in order to define which API requests are valid.

View the OpenAPI Schema of this API here: [SwaggerHub OpenAPI Schema](https://app.swaggerhub.com/apis/tototatutu/serverless-api-resources/0.1#/info)

```yaml
openapi: 3.0.1
info:
  title: Serverless API on Resources
  description: World of Opportunities API through Cloudflare Workers
  version: '0.2'
  license:
    name: MIT
servers:
  - url: https://api.cf-testing.com/api
components:
  parameters:
    Pretty:
      name: pretty
      in: query
      required: false
      description: When present, the JSON response is indented for readability.
      schema:
        type: boolean
  schemas:
    Resource:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        description:
          type: string
        url:
          type: string
        main_cat1:
          type: string
        main_cat2:
          type: string
        tag1:
          type: string
        tag2:
          type: string
        tag3:
          type: string
paths:
  /resources:
    get:
      summary: List all resources, optionally filtered by main category
      operationId: listResources
      tags:
        - resources
      parameters:
        - name: category
          in: query
          required: false
          description: Filter resources by main category (case-insensitive), e.g. 'WEB DEV', 'CYBERSEC'.
          schema:
            type: string
        - $ref: '#/components/parameters/Pretty'
      responses:
        '200':
          description: A list of resources
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Resource'
                  count:
                    type: integer
        '404':
          description: No resources found for the given category

  /resources/{id}:
    get:
      summary: Get a single resource by ID
      operationId: getResource
      tags:
        - resources
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the resource to retrieve (0–381)
          schema:
            type: integer
            format: int32
        - $ref: '#/components/parameters/Pretty'
      responses:
        '200':
          description: A single resource
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    $ref: '#/components/schemas/Resource'
              examples:
                '0':
                  value: >-
                    {"data":{"id":2,"title":"1 Million Free Pictures","description":"Alternative source of free public domain pictures","url":"https://www.1millionfreepictures.com/","main_cat1":"CREATIVE","main_cat2":"","tag1":"PHOTO STOCKS","tag2":"","tag3":""}}
        '400':
          description: Invalid resource ID (must be a number)
        '404':
          description: Resource not found

  /categories:
    get:
      summary: List all distinct main categories (sorted)
      operationId: listCategories
      tags:
        - categories
      parameters:
        - $ref: '#/components/parameters/Pretty'
      responses:
        '200':
          description: Sorted list of distinct main categories
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      type: string
                  count:
                    type: integer
```
