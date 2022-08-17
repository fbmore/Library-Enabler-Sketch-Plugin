var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Library = require('sketch/dom').Library
  var libraries = Library.getLibraries()

  // var librariesForDoc = "Libraries-Colors,Libraries-Buttons,Libraries-Icons"

  var librariesForDoc = []


  //// Lookup libraries used in doc
  var createLibrariesLookup = function (librariesForeignSymbols) {
    if(librariesForeignSymbols.length > 0) {
      var lookup = {};
      var allnames = ""
      var name = ""

      librariesForeignSymbols.forEach(function (librariesForeignSymbol) {
        allnames = allnames +", "+ librariesForeignSymbol.sourceLibraryName();
        lookup = allnames
      });
      return lookup;
    } else {
      ui.message("🌈: No libraries used in this doc! 🤓");

    }
  };

  var librariesForeignSymbols = context.document.documentData().foreignSymbols();

  var librariesLookups = createLibrariesLookup(librariesForeignSymbols);

  //console.log(librariesLookups)

  var libArray = JSON.stringify(librariesLookups).replace('", ','').replace('"','').split(", ")

  var distinctLibraries = [...new Set(libArray)]

  librariesForDoc = distinctLibraries;

  //// end lib lookup



  // var librariesForDocArray = librariesForDoc.split(",")
  var librariesForDocArray = librariesForDoc

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  // var selectedLayers = document.selectedLayers.layers;

  var count = 0;

  for (l = 0; l < libraries.length; l += 1){

    if (librariesForDoc.includes(libraries[l].name) && libraries[l].libraryType === "RemoteTeam"){
      //console.log(libraries[l].name)
      //console.log(libraries[l].enabled)
      libraries[l].enabled = true
      //console.log(libraries[l].enabled)

      count = count + 1;
    }
  }

  ui.message("🌈: Done enabling "+count+" libraries: " + distinctLibraries.join(", ") + " 👏 🚀 ");
};
