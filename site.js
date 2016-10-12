/* site */
$(function() {
  var manifest = "./manifest.json";

  Mirador({
    'id': 'mirador-viewer',
    'data': [
      { 'manifestUri': manifest, 'location': 'University of Maryland' }
    ],
    'layout': '1x1',
    'windowObjects': [
      {
        'loadedManifest': manifest,
        'canvasID': 'http://iiif-sandbox.lib.umd.edu/manifests/sn83045081/1902-01-15/2',
        'viewType': 'ImageView',
        'displayLayout': false,
        'sidePanel' : false, //whether or not to make the side panel available in this window
        //control what is available in the side panel. if 'sidePanel' is false, these options won't be applied
        // 'sidePanelOptions' : {
        //   'toc' : true,
        //   'annotations' : true
        // },
        'bottomPanelVisible': true, //whether or not to make the bottom panel visible in this window on load. This setting is dependent on bottomPanel being true
        'canvasControls': { // The types of controls available to be displayed on a canvas
          'annotations': {
            'annotationLayer': true, //whether or not to make annotation layer available in this window
            'annotationCreation': false, 
            /*whether or not to make annotation creation available in this window,
                         only valid if annotationLayer is set to True and an annotationEndpoint is defined.
                         This setting does NOT affect whether or not a user can edit an individual annotation that has already been created.*/
            'annotationState': 'on', //[_'off'_, 'on'] whether or not to turn on the annotation layer on window load
            // 'annotationRefresh' : false, //whether or not to display the refresh icon for annotations
          },
          'imageManipulation': {
            'manipulationLayer': true,
          }
        }
      }
    ],

    'mainMenuSettings': {
      'show': false,
      'buttons' : {
        'bookmark' : false,
        'layout' : false,
        'options' : false,
        'fullScreenViewer': false
      }
      //'height': 25,
      //'width': '100%'
    },

    'workspacePanelSettings': {
      'maxRows': 3,
      'maxColumns': 3,
      'preserveWindows': true
    },

    'drawingToolsSettings': {
      'selectedColor': 'yellow',
      // 'doubleClickReactionTime': 300,
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
          'hoverFillColorAlpha': 0.4
        },
        'umd:Line': {
          'strokeColor': 'rgba(255, 255, 0, 0.05)',
          'fillColor': 'yellow',
          'fillColorAlpha': 0.01,
          'hoverColor': 'rgba(255, 255, 0, 0.4)',
          'hoverFillColor': 'yellow',
          'hoverFillColorAlpha': 0.4
        }
      }
    },
  });
});
