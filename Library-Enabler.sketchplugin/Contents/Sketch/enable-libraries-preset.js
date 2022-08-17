var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.getSelectedDocument();
  var ui = require('sketch/ui')
  var doc = context.document;
  var Settings = require('sketch/settings');
  var Library = require('sketch/dom').Library

  var libraries = Library.getLibraries()


  var enabledLibraries = []

  for (l = 0; l < libraries.length; l += 1){

    if (libraries[l].enabled == true && libraries[l].libraryType === "RemoteTeam"){
      //console.log(libraries[l].name)
      enabledLibraries.push(libraries[l].name)

      // count = count + 1;
    }
  }

  // Doc level
  // console.log(Settings.documentSettingForKey(document, 'defaultLibraries'));

  // App level
  //console.log(Settings.globalSettingForKey('defaultLibraries'));


  var defaultLibraries = ["Dark,Light,High-Contrast"]

  defaultLibraries = Settings.globalSettingForKey('defaultLibraries')) || defaultLibraries

  var librariesArray = defaultLibraries

  var instructionalTextForInput = "Activate Libraries from a preset:";
  // var description = "Choose a preset number:\n" + defaultLibraries.split("\n").length;
  var initialValue = defaultLibraries

  // const str = 'a\n multi \n line \r string \n!';

initialValue = initialValue.replace(/,/gm, ', ');


  ui.getInputFromUser(
    instructionalTextForInput,
    {
      type: ui.INPUT_TYPE.selection,
      possibleValues: initialValue.split("\n"),
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        ui.message("🌈: Ooops! Try again later! 😀");

        return
      } else {

        libraries.forEach(function (libraries) {
          libraries.enabled = false;
        });

        result = value;

        ui.message("🌈: Yay! Library Preset activated with " + result.split(",").length + " Libraries: " + result + " 👏 🚀");


      }
    }
  )

  var librariesForDoc = Settings.globalSettingForKey('defaultLibraries') || []


  librariesForDoc = result.replace(", ",",");

  //// end lib lookup


  var librariesForDocArray = librariesForDoc

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  // var selectedLayers = document.selectedLayers.layers;

  var count = 0;

  for (l = 0; l < libraries.length; l += 1){

    if (librariesForDoc.includes("*")){
      var cleanedLibrariesForDoc = librariesForDoc.replace("*","")

      if (libraries[l].name.includes(cleanedLibrariesForDoc)){
        //console.log("yep: " + libraries[l].name)
        libraries[l].enabled = true

      } else {
        //console.log("nope: " + libraries[l].name)

      }
      count = count + 1;
    } else {
      if (librariesForDoc.includes(libraries[l].name) && libraries[l].libraryType === "RemoteTeam"){
        libraries[l].enabled = true

        count = count + 1;
      }

    }

  }



  ui.message("🌈: Activated "+count+" libraries: " + distinctLibraries.join(", ") + " 👏 🚀 ");
};
