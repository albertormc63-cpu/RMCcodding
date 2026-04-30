var doc = app.activeDocument;

alert("Hola desde JSX!");
var script = 'do shell script "/usr/local/bin/node /Users/rmlsub1/Documents/DEv/js/readExcel.js"';
app.doScript(script, ScriptLanguage.APPLESCRIPT_LANGUAGE);