# mirador-static

Current Mirador version: [v2.1.2-umd-1.0](https://github.com/umd-lib/mirador/releases/tag/v2.1.2-umd-1.0).

## Running this version

To prevent cross-origin requests, please clone this repo to a local web server and run via HTTP.

A simple local web server: [https://www.browsersync.io/](https://www.browsersync.io/).

If using browsersync, run `browser-sync start --server` and visit: [http://localhost:3000/mirador.html](http://localhost:3000/mirador.html).

## Testing dynamic manifest:

- [`http://localhost:3000/mirador.html`](http://localhost:3000/mirador.html) (default)
   * `@define {string} iiifURLPrefix` = ''
   * `@define {string} manifestPcdmID` = ''
   * `@define {string} manifestURI` = '/demo/manifest.json'

- [`http://localhost:3000/mirador.html?iiifURLPrefix=http://iiif-sandbox.lib.umd.edu/manifests/&manifest=sn83045081/1902-01-15/issue.json`](http://localhost:3000/mirador.html?iiifURLPrefix=http%3A%2F%2Fiiif-sandbox.lib.umd.edu%2Fmanifests%2F&manifest=sn83045081%2F1902-01-15%2Fissue.json) 
   * `@define {string} iiifURLPrefix` = 'http://iiif-sandbox.lib.umd.edu/manifests/'
   * `@define {string} manifestPcdmID` = 'sn83045081/1902-01-15/issue.json'
   * `@define {string} manifestURI` = 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/issue.json'

- [`http://localhost:3000/mirador.html?manifest=http://taixiaoyu.com/mirador-static/manifest.json`](http://localhost:3000/mirador.html?manifest=http%3A%2F%2Ftaixiaoyu.com%2Fmirador-static%2Fmanifest.json)
   * `@define {string} iiifURLPrefix` = 'http://taixiaoyu.com/mirador-static/'
   * `@define {string} manifestPcdmID` = 'manifest.json'
   * `@define {string} manifestURI` = 'http://taixiaoyu.com/mirador-static/manifest.json'

## Configure annotation styles

`annotationTypeStyles` now supports customizable annotation styles, hovering styles, and ability to show or hide annotation tooltips.  

Annotation with @type: `umd:Hits`, `umd:Article`, `umd:ArticleSelected`, `umd:Line` will have different appearance according to the seetings of `'annotationTypeStyles'` in [`site.js`](site.js):
```js
'annotationTypeStyles': {
  'umd:Article': {
    'strokeColor': 'rgba(255, 255, 255, 0)',
    'fillColor': 'green',
    'fillColorAlpha': 0.08,
    'hoverColor': 'rgba(255, 255, 255, 0.2)',
    'hoverFillColor': 'green',
    'hoverFillColorAlpha': 0.4,
    'hideTooltip': true
  },
  ...
}
```

An example oa:annotation:
```json
{
  "@id": "P1_TL00160",
  "@type": [
    "oa:Annotation",
    "umd:Hits"
  ],
  "resource": [
    {
      "@type": "cnt:ContentAsText",
      "format": "text/plain",
      "chars": "College Park"
    }
  ],
  "on": {
    "@type": "oa:SpecificResource",
    "selector": {
      "@type": "oa:FragmentSelector",
      "value": "xywh=1536,5408,260,33"
    },
    "full": "0002.xml"
  },
  "motivation": "sc:painting"
},
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (Apache 2.0).

