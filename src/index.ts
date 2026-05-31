import ResourcesStore from './resources';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  main_cat1: string;
  main_cat2: string;
  tag1: string;
  tag2: string;
  tag3: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

interface SuccessResponse<T> {
  data: T;
  count?: number;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const store = new ResourcesStore();

function jsonResponse<T>(data: ApiResponse<T>, status = 200, pretty = false): Response {
  return new Response(JSON.stringify(data, null, pretty ? 2 : undefined), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

function errorResponse(message: string, statusCode: number, pretty = false): Response {
  return jsonResponse<never>(
    {
      error: 'Error',
      message,
      statusCode,
    },
    statusCode,
    pretty
  );
}

async function handleGetAll(pretty: boolean): Promise<Response> {
  try {
    const resources = await store.all();
    return jsonResponse({ data: resources, count: resources.length }, 200, pretty);
  } catch (error) {
    console.error('Error fetching all resources:', error);
    return errorResponse('Internal server error', 500, pretty);
  }
}

async function handleGetById(id: string, pretty: boolean): Promise<Response> {
  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return errorResponse('Invalid resource ID. Must be a number.', 400, pretty);
    }

    const resource = await store.find(parsedId);

    if (!resource) {
      return errorResponse(`Resource with ID ${parsedId} not found`, 404, pretty);
    }

    return jsonResponse({ data: resource }, 200, pretty);
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error);
    return errorResponse('Internal server error', 500, pretty);
  }
}

async function handleGetByCategory(category: string, pretty: boolean): Promise<Response> {
  try {
    const decodedCategory = decodeURIComponent(category).toUpperCase();
    const resources = await store.filter(decodedCategory);

    if (resources.length === 0) {
      return errorResponse(
        `No resources found for category: ${decodedCategory}`,
        404,
        pretty
      );
    }

    return jsonResponse({ data: resources, count: resources.length }, 200, pretty);
  } catch (error) {
    console.error(`Error filtering by category ${category}:`, error);
    return errorResponse('Internal server error', 500, pretty);
  }
}

function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

function handleNotFound(pretty: boolean): Response {
  return errorResponse('Endpoint not found', 404, pretty);
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // Pretty-print JSON only when `?pretty` is present; minified otherwise.
    const pretty = searchParams.has('pretty');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return errorResponse('Method not allowed', 405, pretty);
    }

    // Route: GET /api/resources
    if (pathname === '/api/resources') {
      const category = searchParams.get('category');

      if (category) {
        return handleGetByCategory(category, pretty);
      }

      return handleGetAll(pretty);
    }

    // Route: GET /api/resources/:id
    const resourceMatch = pathname.match(/^\/api\/resources\/(\d+)$/);
    if (resourceMatch) {
      const id = resourceMatch[1];
      return handleGetById(id, pretty);
    }

    // Route: GET /api/categories
    if (pathname === '/api/categories') {
      try {
        const categories = await store.categories();
        return jsonResponse({ data: categories, count: categories.length }, 200, pretty);
      } catch (error) {
        console.error('Error fetching categories:', error);
        return errorResponse('Internal server error', 500, pretty);
      }
    }

    // 404 for unknown routes
    return handleNotFound(pretty);
  },
};