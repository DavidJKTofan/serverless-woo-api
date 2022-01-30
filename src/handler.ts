import { Router } from 'itty-router'

import Resources from './handlers/resources'
import Resource from './handlers/resource'

const router = Router()

router
  .get('/api/resources', Resources)
  .get('/api/resources/:id', Resource)
  .get('*', () => new Response("Not found", { status: 404 }))

export const handleRequest = request => router.handle(request)