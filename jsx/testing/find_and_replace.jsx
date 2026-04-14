var doc = app.activeDocument;
// guardar ruta del documento abierto para usarla como base para guardar la copia
var rutaBase = doc.fullName;



// Valores de prueba
var numeroViejo = "6";
var numeroNuevo = "63";

var nombreViejo = "NAME";
var nombreNuevo = "ALBERTO";


// CAMBIO DE NOMBRE Y NUMERO EN TODO EL DOCUMENTO
var cambioNumero = false;
var cambioNombre = false;


// Recorremos todos los textos
for (var i = 0; i < doc.textFrames.length; i++) {
    var tf = doc.textFrames[i];

    if (tf.contents == numeroViejo) {
        tf.contents = numeroNuevo;
        cambioNumero = true;
    }

    if (tf.contents == nombreViejo) {
        tf.contents = nombreNuevo;
        cambioNombre = true;
    }
}


// Si hubo al menos un cambio
if (cambioNumero || cambioNombre) {

    alert("Cambios realizados correctamente.");


    // Obtener nombre base del archivo abierto
    var nombreOriginal = doc.name.replace(/\.pdf$/i, "");


    // Concatenar número nuevo al nombre
    var nombreSugerido = nombreOriginal + " " + numeroNuevo + ".pdf";

    alert("Nombre sugerido para la copia: " + nombreSugerido);
    var carpetaBase = doc.path;
    var archivoSugerido = new File(carpetaBase + "/" + nombreSugerido);

    var destino = archivoSugerido.saveDlg("Guardar copia como");    


    if (destino != null) {

        var opciones = new PDFSaveOptions();

        doc.saveAs(destino, opciones);

        alert("Copia guardada correctamente.");
    }

}
else {

    alert("No se encontraron coincidencias para reemplazar.");

}