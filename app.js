let numeroSecreto = 0;
let intentos= 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;




function asignarTextoElemento (elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}


function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (intentos === 5){
        asignarTextoElemento('p', 'Llegaste al número de intentos maximos, el juego ha terminado');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'Intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(numeroDeUsuario > numeroSecreto){
        asignarTextoElemento('p', 'El número secreto es menor');
        intentos ++;
        limpiarCaja();
    }else{
        asignarTextoElemento('p', 'El número secreto es mayor');
        intentos ++;
        limpiarCaja();
    }
    return;
} 
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value= '';
}


function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo+1); 
    //Si ya se sortearon todos los numeros posibles
    if (listaNumerosSorteados.length === numeroMaximo){
        asignarTextoElemento('p', 'Se han sorteado todos los numeros posibles');
    }else{

    //Si el numro generado está incluido en la lista 
    //el includes recorre todo el array con el fin de verificar si el numero generado ya existe
    if (listaNumerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto(); //si ya existe, vuelve a llamar a la funcion para generar un nuevo numero
    }else{
        listaNumerosSorteados.push(numeroGenerado); //si no existe, lo agrega a la lista
        return numeroGenerado; //como no se ha jugado con el numero, lo retorna y valida para jugar con este
    }
}

}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del Número Secreto!');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}, tienes 5 intentos`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego(){
    //limpiar la caja
    limpiarCaja();
    //indicar instruccion de inicio, generar numero aleatorio, reiniciar el contador intentos
    condicionesIniciales();
    //desabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();