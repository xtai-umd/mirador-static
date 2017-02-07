/**
 * Mirador Static (Client) Configuration File
 * Mirador Version: v2.1.2-umd-1.0
 *
 * @author xtai@umd.edu (Xiaoyu Tai)
 */

/**
 * Mirador Core - OCR side-by-side required global varibles
 * @define {boolean} umdMiradorOCR - enable OCR side text
 * @define {string} umdMiradorOCRText - OCR side text
 * @define {number} umdMiradorOCRHovered - OCR anotation hovered number
*/
var umdMiradorOCR = true;
var umdMiradorOCRText = '';
var umdMiradorOCRHovered = 0;

$(function() {
  /**
   * Get Manifest URI and Prefix from URL querystring
   * @define {function} getParamValue Get the parameter value from URL querystring
   *
   * e.g. .../mirador.html?iiifURLPrefix=http%3A%2F%2Fiiif-sandbox.lib.umd.edu%2Fmanifests%2F&manifest=sn83045081%2F1902-01-15%2Fissue.json
   * @define {string} iiifURLPrefix = 'http://iiif-sandbox.lib.umd.edu/manifests/'
   * @define {string} manifestPcdmID = 'sn83045081/1902-01-15/issue.json'
   * @define {string} manifestURI = 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/issue.json'
   */
  var getParamValue = function(parameterName){
    var queryArray = window.location.search.substring(1).split('&'); // querystring without '?' => key-value pairs
    for (var i = 0; i < queryArray.length; i++) {
      var parameterArr = queryArray[i].split('='); //split key and value
      if (parameterArr[0] == parameterName) { return parameterArr[1]; }
    }
  }
  var manifestPcdmID = getParamValue('manifest');
  var iiifURLPrefix = decodeURIComponent(getParamValue('iiifURLPrefix'));
  var manifestURI = iiifURLPrefix + manifestPcdmID;
  // var manifestURI = 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/issue.json';

  /**
   * OCR side-by-side required local varibles
   *
   * @define {object} m - Mirador instance
   * @define {boolean} sidePanelVisible - inital side panel visiblity
   * @define {function} ocrEvent - Event Listener function for OCR text side-by-side feature
   */
  var m = null;
  var sidePanelVisible = false;
  var ocrEvent = function() {
    if (umdMiradorOCRHovered > 0 && umdMiradorOCRText) {
      if (!sidePanelVisible) { m.eventEmitter.publish('sidePanelVisibilityByTab', true); }
      $('div.sidePanel').html('<h2 style=\"color: #a40404;\">Selection Text</h2><p><a style=\"color: #006699;\" ' +
          'href=\"http://www.lib.umd.edu/\" target=\"_blank\">Feedback</a></p><p style=\"color: #555555;\">' +
          umdMiradorOCRText.replace(/(?:-\r\n|-\r|-\n)/g, '').replace(/(?:\r\n|\r|\n)/g, ' ') + '</p>');
    }
  }

  /** check current PCDM ID is an issue or a page/image file and return corresponding canvasID */
  var getCanvasID = function(iiifURLPrefix, currentPcdmID, data) {
    var canvasesJSON = data['sequences'][0]['canvases'];
    // if the requested PCDM ID is not issue
    if (iiifURLPrefix + currentPcdmID + '/manifest' !== data['@id']) {
      // loop all canvases to match requested PCDM ID
      for (var i = 0; i < canvasesJSON.length; i++) {
        // check if requesting PCDM ID matches canvas id; if so, return the canvas id
        if (canvasesJSON[i]['@id'].split('/canvas/')[1] === currentPcdmID) {
          return canvasesJSON[i]['@id'];
        // check if requesting PCDM id matches imaeg file; if so, return the canvas id
        } else if (canvasesJSON[i]['images'][0]['@id'].split('/annotation/')[1] === currentPcdmID) {
          return canvasesJSON[i]['@id'];
        }
      }
    }
    return canvasesJSON[0]['@id'];
  }

  /** Get manifests and initalize Mirador instance */
  $.ajax({
    url: manifestURI,
    dataType: 'json',
    async: true,
    success: function (data) {
      /** @define {string} canvasID get page CanvasID or first page */
      var canvasID = getCanvasID(iiifURLPrefix, manifestPcdmID, data);
      // var canvasID = 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/2';

      /** initalize and configure Mirador instance */
      m = Mirador({
        'id': 'mirador-viewer',
        'layout': '1x1',
        'buildPath': 'build/mirador-v2.1.2-umd-1.0/',
        'data': [
          // { "manifestUri": "http://iiif.harvardartmuseums.org/manifests/object/299843", "location": "Harvard University"},
          { 'manifestUri': manifestURI, 'location': 'University of Maryland', 'manifestContent': data }
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
    },

    /** 
     * OCR Side-by-Side feature initalization:
     * this function listens to windowUpdated event
     *    1. when sidePanelVisible is changed
     *    2. when annotation is ready
     *    3. when viewType is switched
     */
    complete: function () {
      m.eventEmitter.subscribe('windowUpdated', function(event, options) {
        if (typeof options.sidePanelVisible !== 'undefined') {
          m.eventEmitter.publish('sidePanelToggled');
          sidePanelVisible = options.sidePanelVisible;
          $('div.sidePanel').css('overflow', 'scroll').css('width', '');
        }

        if (typeof options.annotationState !== 'undefined') {
          var a = document.querySelectorAll('[id^="draw_canvas_"]')[0];
          if (typeof a !== 'undefined' && a.id !== 'undefined') {
            // add/remove event listener of the osd annotation canvas
            if (options.annotationState === 'pointer') {
              document.getElementById(a.id).removeEventListener('click', ocrEvent);
              document.getElementById(a.id).addEventListener('click', ocrEvent);
            } else {
              document.getElementById(a.id).removeEventListener('click', ocrEvent);
            }
          }
        }

        if (typeof options.viewType !== 'undefined') {
          if (options.viewType === 'ImageView') {
            $('div.sidePanel').html('<h2 style=\"color: #a40404;\">Selection Text</h2><p><a style=\"color: #006699;\" '+
                'href=\"http://www.lib.umd.edu/\" target=\"_blank\">Feedback</a></p><p style=\"color: #555555;\">' +
                'Click on annotations to display selection text.</p>');
          } else {
            $('div.sidePanel').html('<h2 style=\"color: #a40404;\">Selection Text</h2><p><a style=\"color: #006699;\" ' +
                'href=\"http://www.lib.umd.edu/\" target=\"_blank\">Feedback</a></p><p style=\"color: #555555;\">' +
                'Switch to the Image View and click on annotations to display selection text.</p>');
            if (sidePanelVisible) { m.eventEmitter.publish('sidePanelVisibilityByTab', false); }
          }
          // enable selection on side panel and meta data information panel
          $('div.sidePanel').mousemove(function(e){ e.stopPropagation(); });
          $('div.content-container > div.overlay').mousemove(function(e){ e.stopPropagation(); });
        }
      });
    }
  });
});
