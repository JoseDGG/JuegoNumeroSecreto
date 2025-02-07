let numeroSecreto = 0;
let numeroIntentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 0;

function asignarTextoElemento (elemento, texto) {
    //Asigna un texto al elemento html que sea llamado
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento () {
    //Verifica si el número ingresado por el usuario conincide con el número secreto
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log('Intento numero: ' + numeroIntentos);
    if (numeroDeUsuario === numeroSecreto){
        //El usuario acertó
        asignarTextoElemento('p',`Acertaste el número en ${numeroIntentos} ${numeroIntentos === 1 ? 'Intento' : 'Intentos'}`);
        document.getElementById('nuevoJuego').removeAttribute('disabled');
        limpiarCaja();
        document.getElementById('intentar').setAttribute('disabled',true);
    } else {
        //El usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p',`El número secreto es menor. Recuerda es del 1 al ${numeroMaximo}`);
        }
        else {
            asignarTextoElemento('p',`El número secreto es mayor. Recuerda es del 1 al ${numeroMaximo}`);
        }
        numeroIntentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja(){
    //Limpia el valor del input de html
    document.querySelector('#valorUsuario').value = '';
    return;
}

function generarNumeroSecreto() {
    //Genera un número seudoaleatorio del 1 al numeromaximo
    console.log('Numero maximo es: ' + numeroMaximo);
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo) + 1;
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == Math.abs(numeroMaximo)){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles, actualiza la página para volver a jugar');
        document.getElementById('intentar').setAttribute('disabled',true);
    } else{
        //Si el número generado ya esta en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
            
        } else{
            listaNumerosSorteados.push(numeroGenerado);
            console.log(listaNumerosSorteados);
            return numeroGenerado;
        }
    }
}

function numeroMaximoJuegos(){
    document.getElementById('empezar').removeAttribute('disabled');
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p','Adivina el numero del 1 al __ : por favor selecciona el rango');
    numeroMaximo = parseInt(document.getElementById('valorUsuario').value);
    limpiarCaja();
    if (numeroMaximo){
        console.log('Entré');
        condicionesIniciales();
    }
    return;
}

function condicionesIniciales() {
    document.querySelector('#empezar').setAttribute('disabled', 'true')
    document.getElementById('intentar').removeAttribute('disabled');
    /*Establece las condiciones iniciales del jueg, como asignar textos iniciales,
    generar el número secreto y deshabilitar el botón de Nuevo juego.*/
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    console.log('El numero secreto es: ' + numeroSecreto);
    numeroIntentos = 1
    return;
}


function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#nuevoJuego').setAttribute('disabled', 'true')    
    return;
}

numeroMaximoJuegos();
//condicionesIniciales();