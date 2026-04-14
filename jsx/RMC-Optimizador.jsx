#include "components/dropdowns.jsx"
#include "components/leerJson.jsx"


function main() {

    // generarJSON();

    var config = flujoControlado();
    
    if (config == null) {
        return; // cancelado
    }

    procesarJSON(config.size, config.style);

    alert("Proceso terminado.");
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

main();


// function generarJSON() {
//     // Preguntar al usuario
// var generarJSON = confirm("¿Deseas generar el JSON desde Excel?");

// if (generarJSON) {

//     var script = new File("/tmp/runNode.sh");

//     script.open("w");
//     script.write("#!/bin/bash\nusr/local/bin/node /Users/rmlsub1/Documents/DEv/readExcel.js");
//     script.close();

//     script.execute();
//     // Ejecutar Node.js
//     // app.callSystem("/usr/local/bin/node /Users/rmlsub1/Documents/DEv/readExcel.js");

//     // Esperar a que se genere el JSON
//     var jsonFile = new File("/Users/rmlsub1/Documents/DEv/output.json");

//     var intentos = 0;

//     while (!jsonFile.exists && intentos < 10) {
//         $.sleep(500); // espera 0.5 segundos
//         intentos++;
//     }

//     if (!jsonFile.exists) {
//         alert("⚠️ No se pudo generar el JSON.");
//         exit();
//     }

//     alert("✅ JSON generado correctamente.");
// }
// }