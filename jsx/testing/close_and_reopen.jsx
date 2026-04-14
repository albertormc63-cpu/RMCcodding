var doc = app.activeDocument;

// Guardamos la ruta como string
var rutaBase = doc.fullName.fsName;

alert("Ruta guardada:\n" + rutaBase);

// Cerramos documento
doc.close(SaveOptions.DONOTSAVECHANGES);

// Recreamos objeto File
var archivoBase = new File(rutaBase);

// Abrimos archivo
app.open(archivoBase);

alert("Archivo reabierto correctamente");