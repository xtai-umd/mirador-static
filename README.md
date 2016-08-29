# mirador-static

Current version: `2.1 rc1` IIIF/mirador: [7477baa](https://github.com/IIIF/mirador/tree/7477baafd06ba2f9bd78b48313aef5c8a607e04b)


## Running this version

To prevent cross origin requests, please clone this repo to a local web server and run via http.

A simple local web server: [https://www.browsersync.io/](https://www.browsersync.io/).

If using browsersync, visit: [http://localhost:3000/mirador.html](http://localhost:3000/mirador.html).

## Testing annotations

Two annotation files are included in this repo:
[`annotation-static.json`](annotation-static.json) and [`annotation-dynamic.json`](annotation-dynamic.json)

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
