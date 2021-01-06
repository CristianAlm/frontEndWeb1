document.addEventListener("DOMContentLoaded", function () {
    "use strict"
    console.log("El script del tp 3 esta funcionando");
    
    document.getElementById("confirmar").addEventListener("click", function () {
        confirmarDatos();
    });
    document.getElementById("borrar").addEventListener("click",function(){
        borrarTabla();
    })
    function borrarTabla(){
        console.log("Entro a borrar");
        persona =[];
        console.log(persona);
        actualizarBorrado(persona);
    }
    function actualizarBorrado(persona){
        document.getElementById("paraTabla").innerHTML = "<tr><td>Fila</td><td>Nombre</td><td>Apellido</td><td>DNI</td></tr>";
    }
    document.getElementById("Crear3").addEventListener("click", function(){
        mostrarTres();
    })
    function mostrarTres(){
        console.log("Cargando tres personas");
        
        console.log(persona);
        cargarTres();
    }
    function cargarTres(){
        console.log("Entro a tres!");
        tresPersonas.forEach(element => {
            console.log(element);
            console.log(persona);
            document.getElementById("paraTabla").innerHTML += "<tr class='item'" + (persona.length+1) + "'><td>" + (persona.length+1) + "</td><td>" + element.nombre + "</td><td>" + element.apellido + "</td><td>" + element.dni + "</td></tr>";
            persona.push(tresPersonas[element]);
        });
    }
    
    let tresPersonas = [{
        "nombre": "Cristian",
        "apellido": "Almiron",
        "dni": "runing",
      },
      {
        "nombre": "Rafael",
        "apellido": "Lotero",
        "dni": "caballos",
      },
      {
        "nombre": "Jim",
        "apellido": "Morrison",
        "dni": "autos",
      }]
    let persona =[];
    
    function confirmarDatos() {
        console.log('Entro en confirmarDatos');
        let nombreTable = document.getElementById("nombre-table").value;
        let apellidoTable = document.getElementById("apellido-table").value;
        let dniTable = document.getElementById("dni-table").value;
        console.log(nombreTable, apellidoTable, dniTable);
        cargarPersona(nombreTable, apellidoTable, dniTable);
    }
    function cargarPersona(nombreTable, apellidoTable, dniTable,i){
        let fila = {//objeto
            "nombre": nombreTable,
            "apellido": apellidoTable,
            "dni": dniTable,
          }
        persona.push(fila);
        console.log(persona);
        actualizarTabla(nombreTable, apellidoTable, dniTable);
    }
    function actualizarTabla(nombreTable, apellidoTable, dniTable){
        if(dniTable=='ciclismo'){
            console.log("elegio ciclismo");
            document.getElementById("paraTabla").innerHTML += "<tr class='item-especial'" + (persona.length) + "'><td>" + (persona.length) + "</td><td>" + nombreTable + "</td><td>" + apellidoTable + "</td><td>" + dniTable + "</td></tr>";
        }else{
            console.log("No elegio ciclismo");
            document.getElementById("paraTabla").innerHTML += "<tr class='item'" + (persona.length) + "'><td>" + (persona.length) + "</td><td>" + nombreTable + "</td><td>" + apellidoTable + "</td><td>" + dniTable + "</td></tr>";
        }
        /*for(let i =0;i<persona.length;i++){
        }*/

            /*let tableString = "<tr><td>Fila</td><td>Nombre</td><td>Apellido</td><td>DNI</td></tr>";
            for (let i = 0; i < persona.length; i++) {
              persona[i];
        
              tableString += "<tr class='item-" + (i + 1) + "'><td>" + (i + 1) + "</td><td>" + nombreTable + "</td><td>" + apellidoTable + "</td><td>" + dniTable + "</td></tr>";
            }
            let tableNode = document.querySelector('table');
            console.log('Tab ', persona);
            tableNode.innerHTML = tableString;*/
    }
})