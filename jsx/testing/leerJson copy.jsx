// ==============================
// SELECCIONAR JSON
// ==============================
var file = File.openDialog("Selecciona el archivo JSON", "*.json");

if (file != null) {

    file.open("r");
    var content = file.read();
    file.close();

    var data = eval("(" + content + ")");

    var targetSize = "SML";
    var targetVariant = "Y";

    var filtered = [];

    for (var i = 0; i < data.length; i++) {

        if (
            data[i].size == targetSize &&
            data[i].variant == targetVariant
        ) {
            filtered.push(data[i]);
        }
    }


    alert("Coincidencias encontradas: " + filtered.length);


    // ==============================
    // GUARDAR RUTA DEL PDF BASE
    // ==============================
    var rutaBase = app.activeDocument.fullName.fsName;


    // ==============================
    // LOOP DE GENERACIÓN
    // ==============================
    for (var j = 0; j < filtered.length; j++) {

        var doc = app.activeDocument;


        // DATOS ACTUALES
        var numeroNuevo = filtered[j].player;


        var nombreNuevo =
            filtered[j].firstName + " " + filtered[j].lastName;

        nombreNuevo = nombreNuevo.replace(/^\s+|\s+$/g, "");


        // REEMPLAZAR PLACEHOLDERS
        for (var k = 0; k < doc.textFrames.length; k++) {

            var tf = doc.textFrames[k];


            if (tf.contents == "27" && numeroNuevo != "") {
                if (numeroNuevo != null){
                    tf.contents = numeroNuevo;
                }else if (numeroNuevo == 0){
                    tf.contents = "0";
                }
                else{
                    tf.contents = " ";
                }
            }


            if (tf.contents == "NAME" && nombreNuevo != " ") {
                tf.contents = nombreNuevo;
            }

        }


        // GUARDAR COPIA
        var nombreOriginal = doc.name.replace(/\.pdf$/i, "");

        if (numeroNuevo != null) {
        var nombreGuardar = nombreOriginal + " " + numeroNuevo + ".pdf";
        }else if (numeroNuevo == null && nombreNuevo == "") {
            var nombreGuardar = nombreOriginal + " " + "SIN DATOS" + ".pdf";
        }
        else if (nombreNuevo != " ") {
            var nombreGuardar = nombreOriginal + " " + nombreNuevo + ".pdf";
        }
        

        var destino = new File(doc.path + "/" + nombreGuardar);

        var opciones = new PDFSaveOptions();

        doc.saveAs(destino, opciones);


        // CERRAR
        doc.close(SaveOptions.DONOTSAVECHANGES);


        // REABRIR BASE
        app.open(new File(rutaBase));

    }

    alert("Proceso terminado.");

}