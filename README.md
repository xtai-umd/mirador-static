# mirador-static

Current Mirador version: `v2.1.0-rc3` IIIF/mirador: [v2.1.0-rc3](https://github.com/IIIF/mirador/tree/v2.1.0-rc3)
with modification at [91cee56](https://github.com/xtai-umd/mirador/commit/91cee56aeb750910aa9fd77a4eee4230925c642a) in xtai-umd/mirador.


## Running this version

To prevent cross origin requests, please clone this repo to a local web server and run via http.

A simple local web server: [https://www.browsersync.io/](https://www.browsersync.io/).

If using browsersync, run `browser-sync start --server` and visit: [http://localhost:3000/mirador.html](http://localhost:3000/mirador.html).

## Testing annotations

Two annotation files are included in this repo: [`annotation-static.json`](annotation-static.json) and [`annotation-dynamic.json`](annotation-dynamic.json).

These two files are referenced in the local manifest file: [`manifest.json`](manifest.json)

Annotation with @type: `umd:searchResult` and `umd:articleSegment` will have different appearance.

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
