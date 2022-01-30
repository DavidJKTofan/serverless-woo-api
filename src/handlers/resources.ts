import Store from '../resources_store'

const Resources = async () => {
  const resources = new Store()
  const body = JSON.stringify(await resources.all())
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json' 
  }
  return new Response(body, { headers })
}

export default Resources