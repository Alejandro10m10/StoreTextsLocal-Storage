// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const btnPostTweet = document.querySelector('#btnPostTweet');
const btnCloseTweetOptions = document.querySelector('#btnCloseTweetOptions');
let tweetSelected;
let tweetArea = document.querySelector('#tweet');
let tweets = [];
let sendTweet = false;

// Event Listeners

eventListeners();

function eventListeners(){

    // Cuando el usuario agrega un nuevo tweet 
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el usuario esta escribiendo un tweet 
    tweetArea.addEventListener('keyup', escribirTweet);

    btnCloseTweetOptions.addEventListener('click', closeTweetOptionsBackground);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

// Funciones

function escribirTweet(e){
    (e.target.value.length) 
        ? enableBtnTweet(true)
        : enableBtnTweet(false);
}

function enableBtnTweet(value){
    if(value){
        if(btnPostTweet.classList.contains('btnDisabled')){
            btnPostTweet.classList.remove('btnDisabled');
            btnPostTweet.classList.add('btnEnabled');
            sendTweet = value;
        }
    } else{
        if(btnPostTweet.classList.contains('btnEnabled')){
            btnPostTweet.classList.add('btnDisabled');
            btnPostTweet.classList.remove('btnEnabled');
            sendTweet = value;
        }
    }
}

function agregarTweet(e){
    e.preventDefault();

    if(!sendTweet) return;

    // Textarea donde el usuario escribe
    const tweet = tweetArea.value;
    const twwtObj = {
        id: Date.now(),
        tweet, // -> tweet: tweet
    };

    // Añadir al arreglo de Tewwts
    tweets = [...tweets, twwtObj];

    // Una vez agregado creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
    enableBtnTweet(false);
}

// Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            //Crear el HTML
            const postTweet = document.createElement('div');
            postTweet.innerHTML = `
                <div class="postTweet__user">
                <img class="tweet__user__profilepicture" src="./assets/icon/userProfilePicture.jpg" alt="Alejandro.js´ profile picture">
                </div>
                <div class="postTweet__content">
                    <div class="postTweet__content__header">
                        <div class="user-information">
                            <span class="user">Alejandro.js</span>
                            <span class="username">@Alejandrituitts</span>
                            <span class="dot">·</span>
                            <time class="timePostTweet">21h</time>
                        </div>
                        <div class="tweetOptionsContainer">
                            <svg class="btnMoreOptions" viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
                            <div class="tweetOptions no-display">
                                <ul class="tweetOptions__list">
                                    <li class="tweetOptions__list__item tweetOptions__list__item-delete">
                                        <svg class="tweetOptions__list__item__icon tweetOptions__list__item-delete__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg>
                                        <span>Delete</span>
                                    </li>
                                    <li class="tweetOptions__list__item">
                                        <svg class="tweetOptions__list__item__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-115tad6 r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M20.472 14.738c-.388-1.808-2.24-3.517-3.908-4.246l-.474-4.307 1.344-2.016c.258-.387.28-.88.062-1.286-.218-.406-.64-.66-1.102-.66H7.54c-.46 0-.884.254-1.1.66-.22.407-.197.9.06 1.284l1.35 2.025-.42 4.3c-1.667.732-3.515 2.44-3.896 4.222-.066.267-.043.672.222 1.01.14.178.46.474 1.06.474h3.858l2.638 6.1c.12.273.39.45.688.45s.57-.177.688-.45l2.638-6.1h3.86c.6 0 .92-.297 1.058-.474.265-.34.288-.745.228-.988zM12 20.11l-1.692-3.912h3.384L12 20.11zm-6.896-5.413c.456-1.166 1.904-2.506 3.265-2.96l.46-.153.566-5.777-1.39-2.082h7.922l-1.39 2.08.637 5.78.456.153c1.355.45 2.796 1.78 3.264 2.96H5.104z"></path></g></svg>
                                        <span>Pin to your profile</span>
                                    </li>
                                    <li class="tweetOptions__list__item">
                                        <svg class="tweetOptions__list__item__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-115tad6 r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zM18.575 22H4.25C3.01 22 2 20.99 2 19.75V5.5c0-1.24 1.01-2.25 2.25-2.25h8.947c.414 0 .75.336.75.75s-.336.75-.75.75H4.25c-.413 0-.75.336-.75.75v14.25c0 .414.337.75.75.75h14.325c.413 0 .75-.336.75-.75v-8.872c0-.414.336-.75.75-.75s.75.336.75.75v8.872c0 1.24-1.01 2.25-2.25 2.25z"></path><path d="M16.078 9.583H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.336.75.75s-.336.75-.75.75zm0 3.867H6.673c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.335.75.75s-.336.75-.75.75zm-4.703 3.866H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.702c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
                                        <span>Add/remove @Alejandrituitts from Lists</span>
                                    </li>
                                    <li class="tweetOptions__list__item">
                                        <svg class="tweetOptions__list__item__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-115tad6 r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                                        <span>Change who can reply</span>
                                    </li>
                                    <li class="tweetOptions__list__item">
                                        <svg class="tweetOptions__list__item__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-115tad6 r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M23.804 11.5l-6.496-7.25c-.278-.31-.752-.334-1.06-.06-.308.277-.334.752-.058 1.06L22.238 12l-6.047 6.75c-.275.308-.25.782.06 1.06.142.127.32.19.5.19.204 0 .41-.084.558-.25l6.496-7.25c.252-.28.258-.713 0-1zm-23.606 0l6.496-7.25c.278-.31.752-.334 1.06-.06.308.277.334.752.058 1.06L1.764 12l6.047 6.75c.277.308.25.782-.057 1.06-.143.127-.322.19-.5.19-.206 0-.41-.084-.56-.25L.197 12.5c-.252-.28-.257-.713 0-1zm9.872 12c-.045 0-.09-.004-.135-.012-.407-.073-.68-.463-.605-.87l3.863-21.5c.074-.407.466-.674.87-.606.408.073.68.463.606.87l-3.864 21.5c-.065.363-.38.618-.737.618z"></path></g></svg>
                                        <span>Embed Tweet</span>
                                    </li>
                                    <li class="tweetOptions__list__item">
                                        <svg class="tweetOptions__list__item__icon" viewBox="0 0 24 24" aria-hidden="true" class="r-115tad6 r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 22c-.414 0-.75-.336-.75-.75V2.75c0-.414.336-.75.75-.75s.75.336.75.75v18.5c0 .414-.336.75-.75.75zm5.14 0c-.415 0-.75-.336-.75-.75V7.89c0-.415.335-.75.75-.75s.75.335.75.75v13.36c0 .414-.337.75-.75.75zM6.86 22c-.413 0-.75-.336-.75-.75V10.973c0-.414.337-.75.75-.75s.75.336.75.75V21.25c0 .414-.335.75-.75.75z"></path></g></svg>
                                        <span>View Tweet analytics</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="postTweet__content__main">
                        <span>${tweet.tweet}</span>
                    </div>
                    <div class="postTweet__content__footer">
                        <span class="postTweet__content__footer__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                            <span class="postTweet__content__footer__icon__number">1</span>
                        </span>
                        <span class="postTweet__content__footer__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                            <span class="postTweet__content__footer__icon__number">1</span>
                        </span>
                        <span class="postTweet__content__footer__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                            <span class="postTweet__content__footer__icon__number">1</span>
                        </span>
                        <span class="postTweet__content__footer__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M18.466 14.928c-1.118 0-2.106.525-2.765 1.328l-6.587-3.358c.066-.27.11-.55.11-.842 0-.287-.042-.562-.106-.83l6.575-3.32c.658.81 1.65 1.34 2.774 1.34 1.978 0 3.586-1.606 3.586-3.58s-1.608-3.58-3.586-3.58-3.586 1.606-3.586 3.58c0 .314.054.614.13.904L8.463 9.876c-.656-.846-1.672-1.4-2.824-1.4-1.98 0-3.588 1.606-3.588 3.58s1.61 3.58 3.587 3.58c1.146 0 2.158-.55 2.815-1.39l6.56 3.343c-.08.294-.135.598-.135.918 0 1.974 1.608 3.58 3.586 3.58s3.586-1.606 3.586-3.58-1.61-3.58-3.586-3.58zm0-11.34c1.15 0 2.086.932 2.086 2.078s-.936 2.08-2.086 2.08-2.086-.934-2.086-2.08.935-2.08 2.086-2.08zM5.64 14.134c-1.15 0-2.088-.933-2.088-2.08s.937-2.08 2.087-2.08 2.085.935 2.085 2.08-.936 2.08-2.086 2.08zm12.826 6.452c-1.15 0-2.086-.933-2.086-2.08s.936-2.08 2.086-2.08 2.086.935 2.086 2.08-.936 2.08-2.086 2.08z"></path></g></svg>
                            <span class="postTweet__content__footer__icon__number">1</span>
                        </span>
                        <span class="postTweet__content__footer__icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 22c-.414 0-.75-.336-.75-.75V2.75c0-.414.336-.75.75-.75s.75.336.75.75v18.5c0 .414-.336.75-.75.75zm5.14 0c-.415 0-.75-.336-.75-.75V7.89c0-.415.335-.75.75-.75s.75.335.75.75v13.36c0 .414-.337.75-.75.75zM6.86 22c-.413 0-.75-.336-.75-.75V10.973c0-.414.337-.75.75-.75s.75.336.75.75V21.25c0 .414-.335.75-.75.75z"></path></g></svg>
                            <span class="postTweet__content__footer__icon__number">1</span>
                        </span>
                    </div>
                </div>
            `;
            postTweet.classList.add('postTweet');
            postTweet.setAttribute('data-id', `${tweet.id}`)

            // Insertarlo en el html
            listaTweets.appendChild(postTweet);
        });
    }

    sincronizarStorage();

    setTweetOptionMenu();
}

// Agrega los Tweets actuales a LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function setTweetOptionMenu(){
    let tweetsOptions = document.querySelectorAll('.tweetOptionsContainer');
    tweetsOptions.forEach( tweetOption=> {
        let id = parseInt(tweetOption.parentElement.parentElement.parentElement.getAttribute('data-id'));
        let btnMoreOptions = tweetOption.children[0];
        let optionMenu = tweetOption.children[1];
        btnMoreOptions.addEventListener('click', () => openOptionMenu(optionMenu, id) );
    });
}

function openOptionMenu(optionMenu, id){
    tweetSelected = optionMenu;
    let btnDeleteTweet = tweetSelected.children[0].children[0];

    btnDeleteTweet.addEventListener('click', () => eliminarTweet(id) );

    tweetSelected.classList.remove('no-display');
    btnCloseTweetOptions.classList.remove('no-display');
}

function closeTweetOptionsBackground(){
    btnCloseTweetOptions.classList.add('no-display');
    tweetSelected.classList.add('no-display');
}

function eliminarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}