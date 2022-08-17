var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.getSelectedDocument();
  var ui = require('sketch/ui')
  var doc = context.document;
  var Library = require('sketch/dom').Library

  var libraries = Library.getLibraries()

  //console.log(libraries)

// Disable all libraries

libraries.forEach(function (libraries) {
  libraries.enabled = true;
});


  ui.message("🌈: Done enabling all "+libraries.length+" libraries! 👏 🚀");
};
