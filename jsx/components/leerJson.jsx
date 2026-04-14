function procesarJSON(targetSize, targetStyle) {

    var file = new File("/Users/rmlsub1/Documents/DEv/output.json");

    if (!file.exists) {
        file = File.openDialog("Selecciona el JSON");
        if (file == null) {
            alert("No seleccionaste archivo.");
            return;
        }
    }
    // var file = File.openDialog("Selecciona el archivo JSON", "*.json");

    

    file.open("r");
    var content = file.read();
    file.close();

    var data = eval("(" + content + ")");

    var filtered = [];

    for (var i = 0; i < data.length; i++) {

        if (
            data[i].size == targetSize &&
            data[i].variant == targetStyle
        ) {
            filtered.push(data[i]);
        }
    }
    
    alert("Coincidencias encontradas: " + filtered.length);


    var rutaBase = app.activeDocument.fullName.fsName;


    for (var j = 0; j < filtered.length; j++) {

        var doc = app.activeDocument;

        var numeroNuevo = filtered[j].player;

        var nombreNuevo =
            filtered[j].firstName + " " + filtered[j].lastName;

        nombreNuevo = nombreNuevo.replace(/^\s+|\s+$/g, "");


        for (var k = 0; k < doc.textFrames.length; k++) {

            var tf = doc.textFrames[k];

            if (tf.contents == "27") {
                if (numeroNuevo != null && numeroNuevo != "") {
                    tf.contents = numeroNuevo;
                } else if (numeroNuevo == 0) {
                    tf.contents = 0;
                }
                else
                {
                    tf.contents = " ";
                }
            }

            if (tf.contents == "NAME") {
                if (nombreNuevo != "") {
                    tf.contents = nombreNuevo;
                } else {
                    tf.contents = " ";
                }
            }
        }


        var nombreOriginal = doc.name.replace(/\.pdf$/i, "");

        var nombreGuardar;

        if (numeroNuevo != null || numeroNuevo === 0) {
            nombreGuardar = nombreOriginal + " " + numeroNuevo + ".pdf";
        } else if (nombreNuevo) {
            nombreGuardar = nombreOriginal + " " + nombreNuevo + ".pdf";
        } else {
            nombreGuardar = nombreOriginal + " SIN_DATOS.pdf";
        }


        var destino = new File(doc.path + "/" + nombreGuardar);
        var opciones = new PDFSaveOptions();

        doc.saveAs(destino, opciones);

        doc.close(SaveOptions.DONOTSAVECHANGES);

        app.open(new File(rutaBase));
    }
}