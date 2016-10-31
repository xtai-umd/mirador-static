/* site */

// Mirador global instance
var m = '';

// Required variables and event listener for OCR text side-by-side feature
var umdMiradorOCR = true;
var umdMiradorOCRText = '';
var umdMiradorOCRHovered = false;
$(document).click(function(){
  if(umdMiradorOCRHovered && umdMiradorOCRText){
    m.eventEmitter.publish('sidePanelVisibilityByTab', true);
    m.eventEmitter.publish('sidePanelToggled');
    m.eventEmitter.publish('sidePanelVisibilityByTab', true);
    $('div.sidePanel').html('<h2>OCR Text</h2><p>' + umdMiradorOCRText.replace(/(?:\r\n|\r|\n)/g, ' ') + '</p>');
    $('div.sidePanel').css('overflow', 'scroll');
    $('div.sidePanel').css('width', '');
    m.eventEmitter.publish('sidePanelToggled');
  }
});

$(function() {
  // create temporary manifest uri
  // var manifestPcdmID = getParamValue('manifest');
  // var iiifURLPrefix = decodeURIComponent(getParamValue('iiifURLPrefix')); // default 'https://iiiflocal/manifests/'
  // var manifestURI = iiifURLPrefix + manifestPcdmID;
  var manifestURI = './manifest.json';

  // to get the manifest before initiate the Mirador viewer
  $.ajax({
    url: manifestURI,
    dataType: 'json',
    async: true,
    success: function (data) {
      // get page CanvasID or first page
      // var canvasID = getCanvasID(iiifURLPrefix, manifestPcdmID, data);
      var canvasID = 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/2';
      m = Mirador({
        'id': 'mirador-viewer',
        'layout': '1x1',
        'buildPath': 'build/mirador/',
        'data': [
          { 'manifestUri': manifestURI, 'location': 'University of Maryland', 'manifestContent': data }
          // { "manifestUri": "http://iiif.harvardartmuseums.org/manifests/object/299843", "location": "Harvard University"}
        ],
        'mainMenuSettings': {
          'show': false
        },
        'windowObjects': [{
          // loadedManifest: "http://iiif.harvardartmuseums.org/manifests/object/299843",
          // viewType: "ImageView",
          'loadedManifest': data['@id'],
          'canvasID': canvasID,
          'viewType': 'ImageView',
          'displayLayout': false,
          'sidePanel' : true,
          'sidePanelVisible': false,
          'sidePanelOptions' : {
            'toc' : false,
            'annotations' : true
          },
          'canvasControls': {
            'annotations': {
              'annotationLayer': true,
              'annotationCreation': false, 
              'annotationState': 'on'
            }
          }
        }],
        'drawingToolsSettings': {
          'selectedColor': 'yellow',
          'strokeColor': 'rgba(255, 255, 255, 0)',
          'fillColor': 'yellow',
          'fillColorAlpha': 0.1,
          'hoverColor': 'rgba(255, 255, 255, 0)',
          'hoverFillColor': 'yellow',
          'hoverFillColorAlpha': 0.5,
          //customize anno styling
          'annotationTypeStyles': {
            'umd:searchResult': {
              'strokeColor': 'rgba(255, 255, 0, 0.6)',
              'fillColor': 'yellow',
              'fillColorAlpha': 0.4,
              'hoverColor': 'rgba(255, 255, 0, 0.6)',
              'hoverFillColor': 'yellow',
              'hoverFillColorAlpha': 0.6,
              'hideTooltip': true
            },
            'umd:articleSegment': {
              'strokeColor': 'rgba(255, 255, 255, 0.2)',
              'fillColor': 'green',
              'fillColorAlpha': 0.1,
              'hoverColor': 'rgba(255, 255, 255, 0.2)',
              'hoverFillColor': 'green',
              'hoverFillColorAlpha': 0.4,
              'hideTooltip': true
            },
            'umd:Article': {
              'strokeColor': 'rgba(255, 255, 255, 0)',
              'fillColor': 'green',
              'fillColorAlpha': 0.1,
              'hoverColor': 'rgba(255, 255, 255, 0.2)',
              'hoverFillColor': 'green',
              'hoverFillColorAlpha': 0.4,
              'hideTooltip': true
            },
            'umd:Line': {
              'strokeColor': 'rgba(255, 255, 0, 0.05)',
              'fillColor': 'yellow',
              'fillColorAlpha': 0.01,
              'hoverColor': 'rgba(255, 255, 0, 0.4)',
              'hoverFillColor': 'yellow',
              'hoverFillColorAlpha': 0.4,
              'hideTooltip': true
            }
          }
        },
      });
    }
  });
});
