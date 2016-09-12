# mirador-static

Current Mirador version: `v2.1.0-rc5` IIIF/mirador: [v2.1.0-rc5](https://github.com/IIIF/mirador/tree/v2.1.0-rc5)
with modification at [7145be6](https://github.com/xtai-umd/mirador/commit/7145be67a645ebd8f0d648dd86ea63e5c2a2ec73) in xtai-umd/mirador.


## Running this version

To prevent cross-origin requests, please clone this repo to a local web server and run via HTTP.

A simple local web server: [https://www.browsersync.io/](https://www.browsersync.io/).

If using browsersync, run `browser-sync start --server` and visit: [http://localhost:3000/mirador.html](http://localhost:3000/mirador.html).

## Testing annotations

Four annotation files are included:

- [`annotations/annotation-p1-static.json`](https://github.com/xtai-umd/mirador-static/blob/gh-pages/annotations/annotation-p1-static.json)
- [`annotations/annotation-p1-dynamic.json`](https://github.com/xtai-umd/mirador-static/blob/gh-pages/annotations/annotation-p1-dynamic.json).
- [`annotations/annotation-p2-static.json`](https://github.com/xtai-umd/mirador-static/blob/gh-pages/annotations/annotation-p2-static.json)
- [`annotations/annotation-p2-dynamic.json`](https://github.com/xtai-umd/mirador-static/blob/gh-pages/annotations/annotation-p2-dynamic.json).

These files are referenced in the local manifest file [`manifest.json`](manifest.json) for page 1 and 2.

Annotation with @type: `umd:searchResult` and `umd:articleSegment` will have different appearance according to the [`site.js`](site.js).

An example oa:annotation:
```json
{
  "@id" : "http://iiif-sandbox.lib.umd.edu/annotation/article/001",
  "@type" : ["oa:Annotation", "umd:articleSegment"],
  "resource" : [ {
    "@type" : "dctypes:Text",
    "chars": ""
  } ],
  "on" : {
    "@type" : "oa:SpecificResource",
    "selector" : {
      "@type" : "oa:FragmentSelector",
      "value" : "xywh=335,1240,820,500"
    },
    "full" : "http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/1"
  },
  "motivation" : "oa:highlighting"
}
```
