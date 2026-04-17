function procesarJSON(targetSize, targetStyle) {

    // Intentar abrir el JSON en una ruta predefinida
    var file = new File("/Users/rmlsub1/Documents/DEv/output.json");

    if (!file.exists) {
        file = File.openDialog("Selecciona el JSON");
        if (file == null) {
            alert("No seleccionaste archivo.");
            return;
        }
    }
    // Leer el contenido del JSON
    file.open("r");
    var content = file.read();
    file.close();
    // Evaluar el contenido para convertirlo en un objeto JavaScript
    var data = eval("(" + content + ")");
    
    var filtered = [];
    // Filtrar los objetos que coincidan con el tamaño y estilo objetivo
    for (var i = 0; i < data.length; i++) {

        if (
            data[i].size == targetSize &&
            data[i].variant == targetStyle
        ) {
            filtered.push(data[i]);
        }
    }
    // Mostrar el número de coincidencias encontradas, para que el usuario tenga una idea de cuántos PDFs se generarán
    alert("Coincidencias encontradas: " + filtered.length);
    
    // Devolver el array filtrado para que se pueda generar los pdfs con los datos correctos
    return filtered;
    
}
