import AMapLoader from '@amap/amap-jsapi-loader'

export default async function () {
  return AMapLoader.load({
    key: '441bbfaafaa1a694d12c50dd8df0cb29',
    version: '2.0'
  })
}

export async function AMapLoaderAndUI (plugins) {
  return AMapLoader.load({
    key: '441bbfaafaa1a694d12c50dd8df0cb29',
    version: '2.0',
    AMapUI: {
      version: '1.1',
      plugins
    }
  })
}
