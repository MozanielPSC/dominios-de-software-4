// const baseUrl = `https://www.google.com/maps/dir/?api=1&origin=-16.731706,-49.261479&destination=-15.798720,
// -47.863916&travelmode=driving&waypoints=-16.329111,-48.955995|13.731706,-44.261479`

export const generateMapsUrl = (routes: any[]) => {
  let url = 'https://www.google.com/maps/dir/?api=1'
  url += `&origin=${routes[0].initLat},${routes[0].initLong}`
  url += `&destination=${routes[routes.length - 1].initLat}, ${routes[routes.length - 1].initLong}&travelmode=driving`

  routes.pop()
  routes.shift()

  if (routes.length > 0) {
    url += `&waypoints=${routes.map(route =>(`${route.initLat},${route.initLong}`)).join('|')}`
  }

  return url
}
