document.addEventListener("DOMContentLoaded" , function(){
    "use strict"
    console.log("El script del tp 2 del contacto esta funcionando");
    
    // variable elegida
    let pass = '';
    
    function generarcaptcha() {
        let d1 = Math.floor((Math.random() * 6) + 1);
        console.log(d1);
        
        document.getElementById("captcha").src = "js/imgcaptchas/" +  d1 + ".jpg"; //link externo
        
        if(d1 == 1)
        pass = "Flushing Economy" ;
        if(d1 == 2)
        pass = "plumpho";
        if(d1 == 3)
        pass = "toads buttocks";
        if(d1 == 4)
            pass = "blinic" ;
        if(d1 == 5)
            pass = "infinite been";
        if(d1 == 6)
            pass =  "cheaper indian";
          
    }
    generarcaptcha();
    
    // cuando apriete enviar llamo a validar
    
    function validar(e) {
        let nodoInput = document.getElementById("contrasena");
        let passuser = nodoInput.value;
        console.log(passuser);
    
    //get del input del usuario
    // mivariable = document . get eleemtn input capcha
    if (passuser == pass)
        alert("No sos un robot");
    else {
        e.preventDefault();
        alert("Sos un robot");
        }
    }
    let btn = document.getElementById("btn-enviar");
    btn.addEventListener("click", validar);
})

