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
  libraries.remove();
});


  ui.message("🌈: Done removing all "+libraries.length+" libraries! 👏 🚀");
};
