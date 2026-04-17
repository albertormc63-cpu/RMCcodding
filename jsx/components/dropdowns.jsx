var doc = app.activeDocument;
var nombreArchivo = doc.name;


// ==============================
// DIÁLOGO
// ==============================
function dialogDropdowns() {

    var win = new Window("dialog", "Configuración de proceso");

    var grupo = win.add("group");
    grupo.orientation = "column";
    grupo.alignChildren = ["left", "center"];

    // STYLE
    var styleGroup = grupo.add("group");
    styleGroup.add("statictext", undefined, "Style:");
    var styleDropdown = styleGroup.add("dropdownlist", undefined, ["A", "W", "Y", "G", "I"]);
    styleDropdown.selection = 0;

    // SIZE
    var sizeGroup = grupo.add("group");
    sizeGroup.add("statictext", undefined, "Size:");
    var sizeDropdown = sizeGroup.add("dropdownlist", undefined, [
        "XSM","SML","MED","LGE","XLG","2XL","3XL","4XL", "ALL"
    ]);
    sizeDropdown.selection = 0;

    // BOTONES
    var btnGroup = grupo.add("group");
    btnGroup.alignment = "right";

    btnGroup.add("button", undefined, "Procesar", {name: "ok"});
    btnGroup.add("button", undefined, "Cancelar", {name: "cancel"});

    // RESULTADO
    if (win.show() == 1) {

        return {
            style: styleDropdown.selection.text,
            size: sizeDropdown.selection.text
        };

    } else {

        return null;
    }
}


// ==============================
// VALIDACIÓN
// ==============================
function validarArchivo(style, size) {

    if (
        nombreArchivo.indexOf(style) == -1 ||
        nombreArchivo.indexOf(size) == -1
    ) {
        return false;
    }

    return true;
}


// ==============================
// FLUJO CONTROLADO
// ==============================
var config;
function flujoControlado(){
    while (true) {

        config = dialogDropdowns();

        if (config == null) {
            alert("Proceso cancelado.");
            return null;
        }

        if (validarArchivo(config.style, config.size)) {
            break; // ✅ sale del loop si todo está bien
        }

        alert("⚠️ El archivo no coincide. Intenta de nuevo.");

    }
    return config;
}



