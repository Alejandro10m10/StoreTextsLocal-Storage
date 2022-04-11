// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const btnPostTweet = document.querySelector('#btnPostTweet');
let tweetArea = document.querySelector('#tweet');
let tweets = [];

// Event Listeners

eventListeners();

function eventListeners(){
    //formulario.addEventListener('submit', agregarTweet);
    tweetArea.addEventListener('keyup', escribirTweet);
}

// Funciones

function escribirTweet(e){

    let tweet = e.target.value;

    (tweet.length) 
        ? setEnableBtn(true)
        : setEnableBtn(false);

}

function setEnableBtn(value){
    if(value){
        if(btnPostTweet.classList.contains('btnDisabled')){
            btnPostTweet.classList.remove('btnDisabled');
            btnPostTweet.classList.add('btnEnabled');
        }
    } else{
        if(btnPostTweet.classList.contains('btnEnabled')){
            btnPostTweet.classList.add('btnDisabled');
            btnPostTweet.classList.remove('btnEnabled');
        }
    }
}

/*
function agregarTweet(e){
    e.preventDefault();


    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('El Tweet no puede ir vacio');
        return; // Evitar que se ejecuten más lineas de código
    }
    console.log(tweet);
}
*/
/*
// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;

}
*/