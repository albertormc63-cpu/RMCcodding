#include "components/dropdowns.jsx"
#include "components/leerJson.jsx"
#include "components/guardarPDFs.jsx"


function main() {

    // Leer el JSON generado
    var config = flujoControlado();
    // Si el usuario canceló la selección, salir del script
    if (config == null) {
        return; // cancelado
    }
    // Procesar el JSON y obtener los datos filtrados
    var filtered = procesarJSON(config.size, config.style);
    
    // Procesar los PDFs con los datos filtrados
    guardarPDFs(filtered)

    alert("Proceso terminado.");
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

main();