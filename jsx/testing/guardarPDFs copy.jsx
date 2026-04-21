function guardarPDFs(filtered, config) {
    // Guardar la ruta del documento activo para reabrirlo después
    var rutaBase = app.activeDocument.fullName.fsName;

    // Iterar sobre los datos filtrados para procesar cada PDF
    for (var j = 0; j < filtered.length; j++) {

        var doc = app.activeDocument;

        // Obtener el número y nombre nuevo del objeto filtrado
        var numeroNuevo = filtered[j].player;
        var nombreNuevo =
            filtered[j].firstName + " " + filtered[j].lastName;

        nombreNuevo = nombreNuevo.replace(/^\s+|\s+$/g, "");

        // Obtener la posición del jugador, aunque no se está usando actualmente
        var positionNueva = filtered[j].position;

        // Reemplazar los campos en el PDF
        for (var k = 0; k < doc.textFrames.length; k++) {
            
            var tf = doc.textFrames[k];
            // Reemplazar el campo "27" con el número nuevo, o dejarlo en blanco si no hay número
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
            // Reemplazar el campo "NAME" con el nombre nuevo, o dejarlo en blanco si no hay nombre
            if (tf.contents == "NAME") {
                if (nombreNuevo != "") {

                    tf.contents = nombreNuevo;

                    // 🔥 Resetear escala antes de medir
                    tf.textRange.characterAttributes.horizontalScale = 100;
                    tf.textRange.characterAttributes.verticalScale = 100;

                    // Obtener el ancho máximo permitido desde la zona segura y ajustar el tamaño del texto si es necesario
                    var maxWidth = obtenerAnchoZonaSafe(doc);

                    var maxHeight = obtenerAltoZonaSafe(doc); // Si quieres ajustar también por altura, implementa una función similar a obtenerAnchoZonaSafe para obtener la altura máxima permitida

                    // if (maxWidth != null) {
                        
                    //     // Obtener el ancho actual del texto
                    //     var ancho = tf.width;

                    //     if (ancho > maxWidth) {
                            
                    //         // Agregar un buffer para que no quede justo al borde, por ejemplo un 99% del tamaño máximo
                    //         var buffer = 0.99; // 99%
                            
                    //         // Calcular la escala necesaria para que el texto se ajuste al ancho máximo permitido, considerando el buffer
                    //         var escala = (maxWidth / ancho) * 100 * buffer;

                    //         // escala = Math.floor(escala); // o Math.round
                    //         tf.textRange.characterAttributes.horizontalScale = escala;
                    //         // tf.textRange.characterAttributes.verticalScale = escala;
                    //     }
                    // } else {
                    //     // alert("⚠️ No se encontró ZONASAFE del texto, agregala un rectángulo con ese nombre para ajustar el tamaño del texto automáticamente.");
                    // }
                    if (maxHeight != null) {
                        // Obtener el ancho actual del texto
                        var alto = tf.height;
                        if (alto > maxHeight) {
                            
                            // Agregar un buffer para que no quede justo al borde, por ejemplo un 99% del tamaño máximo
                            var buffer = 0.99; // 99%
                            
                            // Calcular la escala necesaria para que el texto se ajuste al alto máximo permitido, considerando el buffer
                            var escala = (maxHeight / alto) * 100 * buffer;

                            // escala = Math.floor(escala); // o Math.round
                            tf.textRange.characterAttributes.horizontalScale = escala;
                            // tf.textRange.characterAttributes.verticalScale = escala;
                        }
                    }
                } else {
                    tf.contents = " ";
                }
            }
            // Reemplazar el campo "ATT" con la posición nueva, o dejarlo en blanco si no hay posición
            if (tf.contents == "ATT" && positionNueva != "") {
               tf.contents = positionNueva;
            }
        }

        // Generar el nombre para guardar el PDF, basado en el nombre original y el número o nombre nuevo
        var nombreOriginal = doc.name.replace(/\.pdf$/i, "");

        // Si hay un número nuevo, usarlo; si no, usar el nombre nuevo; si ninguno, indicar que no hay datos
        var nombreGuardar;
        
        // Aquí se asume que si numeroNuevo es 0, también se quiere usar ese valor, por eso se verifica que no 
        // sea null y no esté vacío, pero se permite el 0
        if (numeroNuevo != null || numeroNuevo === 0) {
            nombreGuardar = nombreOriginal + " " + numeroNuevo + ".pdf";
        } 
        else if (nombreNuevo) {
            nombreGuardar = nombreOriginal + " " + nombreNuevo + ".pdf";
        }
        else {
            nombreGuardar = nombreOriginal + " SIN_DATOS.pdf";
        }

        // Guardar el PDF con el nuevo nombre en la misma ubicación que el original
        var destino = new File(doc.path + "/" + nombreGuardar);

        // 🔥 Verificar si el archivo ya existe para evitar sobreescritura
        if (destino.exists) {

            // Si hay nombre, lo agregamos al archivo
            if (nombreNuevo != "") {
                nombreGuardar = nombreOriginal + " " + numeroNuevo + " " + nombreNuevo + ".pdf";
            } else {
                nombreGuardar = nombreOriginal + " " + numeroNuevo + " DUP.pdf";
            }

            destino = new File(doc.path + "/" + nombreGuardar);
        }

        // 🔥 Extra: asegurar que nunca se repita (caso extremo)
        var contador = 1;

        while (destino.exists) {
            nombreGuardar = nombreGuardar.replace(/\.pdf$/i, "") + " (" + contador + ").pdf";
            destino = new File(doc.path + "/" + nombreGuardar);
            contador++;
        }
        // Configurar las opciones de guardado para PDF
        var opciones = new PDFSaveOptions();
        // Guardar el documento con las opciones especificadas
        doc.saveAs(destino, opciones);
        // Cerrar el documento sin guardar cambios para volver a abrir el original en la siguiente iteración
        doc.close(SaveOptions.DONOTSAVECHANGES);
        // Reabrir el documento original para la siguiente iteración 
        app.open(new File(rutaBase));
    }
}

function obtenerAnchoZonaSafe(doc) {

    for (var i = 0; i < doc.pageItems.length; i++) {

        var item = doc.pageItems[i];

        if (item.name == "ZONASAFE") {
            return item.width; // 👈 ya está en pulgadas si tu doc está en pulgadas
        }
    }

    return null;
}

function obtenerAltoZonaSafe(doc) {

    for (var i = 0; i < doc.pageItems.length; i++) {

        var item = doc.pageItems[i];

        if (item.name == "ZONASAFE") {
            return item.height; // 👈 ya está en pulgadas si tu doc está en pulgadas
        }
    }

    return null;
}