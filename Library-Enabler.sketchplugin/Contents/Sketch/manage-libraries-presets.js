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

    // if (libraries[l].enabled == true && libraries[l].libraryType === "RemoteTeam"){
    if (libraries[l].enabled == true){
      // console.log(libraries[l].name)
      enabledLibraries.push(libraries[l].name)
    }
  }



  var defaultLibraries = enabledLibraries || ["Library-A,Library-A2\nLibrary-B,Library-B2\nLibrary-C,Library-C2"]

  defaultLibraries = Settings.globalSettingForKey('defaultLibraries') || defaultLibraries

  var librariesArray = defaultLibraries

  var instructionalTextForInput = "Define Libraries presets";
  var description = "One Library preset per line, each Library name separated by a comma, and as many\nLibraries per preset you want 😀.\n\nUse an '*' before a keyword to enable\nall Libraries that include that keyword.";
  var initialValue = defaultLibraries


  ui.getInputFromUser(
    instructionalTextForInput,
    {
      initialValue: initialValue,
      description: description,
      numberOfLines: 10
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        ui.message("🌈: Ooops! Try again later! 😀");

        return
      } else {


        result = value;

        // Doc level
        // Settings.setDocumentSettingForKey(document, 'defaultLibraries', result);

        // App level
        Settings.setGlobalSettingForKey('defaultLibraries', result);


        ui.message("🌈: Yay! Preset saved with " + result.split(",").length + " Libraries: " + result + " 👏 🚀");


      }
    }
  )

  // console.log(Settings.documentSettingForKey(document, 'defaultLibraries'));

  var librariesForDoc = Settings.documentSettingForKey(document, 'defaultLibraries') || []


  librariesForDoc = result;

  //// end lib lookup

  var librariesForDocArray = librariesForDoc

  var doc = context.document;
  var document = sketch.getSelectedDocument();


  var count = defaultLibraries.split("\n").length || 0;

  ui.message("🌈: Defined "+count+" Library presets 👏 🚀 ");
};
