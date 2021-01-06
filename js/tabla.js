document.addEventListener("DOMContentLoaded", function () {
    "use strict"
    console.log("El script tabla esta funcionando");
    
    let baseURL = 'https://web-unicen.herokuapp.com/api/groups/';
let groupID = '139';
let collectionID = 'periodicocarreras';

let contenedor = document.querySelector("#result");

let persona =[];
let auxiliar = [];
let filter= null;
let iDeditando=false;

document.getElementById("btn-reset").addEventListener("click",function(){
  filter = null;
  getData();
})
    
    function confirmarDatos() {
        console.log('Entro en confirmarDatos');
        let nombreTable = document.getElementById("nombre-table").value;
        let apellidoTable = document.getElementById("apellido-table").value;
        let favoritoTable = document.getElementById("favorito-table").value;
        console.log(nombreTable, apellidoTable, favoritoTable);
        cargarPersona(nombreTable, apellidoTable, favoritoTable);
    }
    function cargarPersona(nombreTable, apellidoTable, favoritoTable){
        let fila = {//objeto
            "nombre": nombreTable,
            "apellido": apellidoTable,
            "favorito": favoritoTable,
          }
        persona.push(fila);
        console.log(persona);
        //actualizarTabla(nombreTable, apellidoTable, dniTable);
      }

      document.getElementById("Crear3").addEventListener("click", function(){
        cargarTres();
    })
    function cargarTres(){
      console.log("Entro a tres!");
      tresPersonas.forEach(element => {
        let i = 0;
          console.log(element);
          persona.push(element);
          //sendTres(element);
          
          //confirmarDatos();
          
          let name = "pepe";
          if( name.length === 0 ) { 
            //contenedor.innerHTML = "Ingrese un nombre";
            return;
          }

          //let edad = document.querySelector("#edad").value;
          let data = {
            "thing": {
              "nombre": element.nombre,
              "apellido": element.apellido,
              "favorito": element.favorito
            }
          }
          fetch(baseURL + groupID + "/" + collectionID, {
            "method": "POST",
            "mode": 'cors',
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(data)
          }).then(function(r){
            if(!r.ok){
              console.log("error")
            }
            return r.json()
          })
          .then(function(json) {
              let numero= 10;
            
          
            getData();
        
            console.log(json);
          })
          .catch(function(e){
            console.log(e)
          })

      });
  }

  
  let tresPersonas = [{
      "nombre": "Cristian",
      "apellido": "Almiron",
      "favorito": "autos",
    },
    {
      "nombre": "Rafael",
      "apellido": "Lotero",
      "favorito": "caballos",
    },
    {
      "nombre": "Jim",
      "apellido": "Morrison",
      "favorito": "runing",
    }]

function sendData(){
  confirmarDatos();
  let name = document.querySelector("#nombre-table").value;
  if( name.length === 0 ) { 
    contenedor.innerHTML = "Ingrese un nombre";
    return;
  }
  let apellido = document.querySelector("#apellido-table").value;
  let favorito = document.querySelector("#favorito-table").value;
  //let edad = document.querySelector("#edad").value;
  let data = {
    "thing": {
      "nombre": name,
      "apellido": apellido,
      "favorito": favorito
    }
  };

  if(iDeditando){
    fetch(baseURL + groupID + "/" + collectionID + "/"+iDeditando, {
      "method": "PUT",
      "mode": 'cors',
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(data)
    }).then(function(r){
      if(!r.ok){
        console.log("error")
      }
      return r.json()
    })
    .then(function(json) {
      console.log(json);

      getData();
    })
    .catch(function(e){
      console.log(e)
    })

  }else{
  fetch(baseURL + groupID + "/" + collectionID, {
    "method": "POST",
    "mode": 'cors',
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(function(r){
    if(!r.ok){
      console.log("error")
    }
    return r.json()
  })
  .then(function(json) {
      let numero= 1;
    
    if(favorito=='ciclismo'){
        console.log("elegio ciclismo");
        document.getElementById("paraTabla").innerHTML += "<tr class='item-especial'" + numero + "'><td>" + json.information.thing.nombre + "</td><td>" + json.information.thing.apellido + "</td><td>" + json.information.thing.favorito + "</td><td><button>Eliminar</button></td></tr>";
        let IdButton  = querySelector("button");
        console.log(IdButton);
    }else{
        console.log("No elegio ciclismo");
        document.getElementById("paraTabla").innerHTML += "<tr class='item'" + numero + "'><td>" + json.information.thing.nombre + "</td><td>" + json.information.thing.apellido + "</td><td>" + json.information.thing.favorito + "</td><td><button>Eliminar</button></td></tr>";
    }
    getData();

    numero++;

    console.log(json);
  })
  .catch(function(e){
    console.log(e)
  })

}

}

document.querySelector("#confirmar").addEventListener('click', sendData)

function getData() {
    fetch(baseURL + groupID + "/" + collectionID, {
        method: "GET",
        mode: 'cors',
    }).then(function (r) {
        if (!r.ok) {
            console.log("error")
        }
        return r.json()
    })
        .then(function (json) {
            console.log(json);
            let contenedor = document.querySelector("#paraTabla");
            let numero=1;

            contenedor.innerHTML = ''
            console.log("Listo para el get");
            contenedor.innerHTML +=  "<tr><td>Nombre</td><td>Apellido</td><td>Favorito</td></tr>"

            auxiliar = json.periodicocarreras;

            if (filter) {
              auxiliar = auxiliar.filter(elem => elem.thing.nombre.toLowerCase().indexOf(filter.toLowerCase()) >= 0 );
            }

            for (let data of auxiliar) {
                //data.thing.nombre + "<br />";
              if(data.thing.favorito=='ciclismo'){
                contenedor.innerHTML += "<tr class='item-especial' data-id='" + data._id + "'><td>" + data.thing.nombre + "</td><td>" + data.thing.apellido + "</td><td>" + data.thing.favorito + "</td><td><button class='eliminar-fila'>Eliminar</button><button class='editar-fila'>Editar</button></td></tr>";
              }else{
                contenedor.innerHTML += "<tr class='item' data-id='" + data._id + "'><td>" + data.thing.nombre + "</td><td>" + data.thing.apellido + "</td><td>" + data.thing.favorito + "</td><td><button class='eliminar-fila'>Eliminar</button><button class='editar-fila'>Editar</button></td></tr>";
              }
            }
            
            //editar-fila
            //Codigo de eliminar
            let botonesBorrar = document.querySelectorAll('.eliminar-fila');
            botonesBorrar.forEach((botonBorrar) => botonBorrar.addEventListener('click', (e) => {
              console.log('el boton eliminar anda.');
              let boton = e.target;
              let padreTd = boton.parentNode;
              let padreTr = padreTd.parentNode;
              let id = padreTr.getAttribute('data-id');
              console.log(id);

              borrarFila(id);
              console.log(padreTr);
              //deleteDataId();

            }))

            let botonesEditar = document.querySelectorAll('.editar-fila');
            botonesEditar.forEach((editarBorrar) => editarBorrar.addEventListener('click', (e) => {
              console.log('el boton editar anda.');
              let editarBtn = e.target;
              let padreTd = editarBtn.parentNode;
              let padreTr = padreTd.parentNode;
              let id = padreTr.getAttribute('data-id');

              iDeditando= id;

              console.log(id);
              
              let editarEncontrado = 0;

              for(let i =0; i<auxiliar.length;i++){
                if(id==auxiliar[i]._id){
                  editarEncontrado = auxiliar[i];
                  console.log("Encontro es igual: " , editarEncontrado);


                  document.querySelector("#nombre-table").value = editarEncontrado.thing.nombre;
                  document.querySelector("#apellido-table").value = editarEncontrado.thing.apellido;
                  document.querySelector("#favorito-table").value = editarEncontrado.thing.favorito;
                }
              }

              editarFila(id);
              console.log(padreTr);
              //deleteDataId();
            }))

    })
        .catch(function (e) {
            console.log(e)
        })
}

function editarFila(e){
  console.log("el boton editar anda");



  //putsendData(e);

}

function borrarFila(e){
  console.log('preparado para borrar fila');
  deleteDataId(e);
}

document.querySelector("#mostarGet").addEventListener('click', function () {
    getData();
})


function deleteDataId(id) {
    console.log("Listo para borrar el dato");
    let idJson = id;

    fetch(baseURL + groupID + "/" + collectionID + "/" + idJson, {
        method: "DELETE",
        mode: 'cors',
    }).then(function (r) {
        if (!r.ok) {
            console.log("error")
        }
        return r.json()
    })
        .then(function (json) {
            console.log(json);
            console.log("La variable es: " + idJson);

            getData();

        })
        .catch(function (e) {
            console.log(e)
        })

}
document.querySelector(".editar-tabla").addEventListener("click", function(){
  console.log("El boton editar anda");
});



document.querySelector("#btn-filtrar").addEventListener("click", () => {
  filter =  document.getElementById("myInput").value;
  getData();
});




getData();
setInterval(getData, 10000);

})