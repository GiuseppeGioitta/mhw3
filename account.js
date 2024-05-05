/* Main Var */
const MainSection = document.querySelector("#ImageContainer");
const AccountForm = document.forms["AccountForm"];
const MailBox = document.querySelector("#mail");

/* API MailBoxLayer */

const MailBoxLayerEP = "http://apilayer.net/api/check?";
const accessKey = "ea086c52f3ae8d56207e10d022f1e171";
let jsonMail, flag;

function compare(){ // se tutte e tre le condizioni dell'elemento json sono verificate imposta il flag ad 1 altrimenti 0
    if(jsonMail && jsonMail.format_valid === true && jsonMail.smtp_check === true && jsonMail.mx_found === true){
        flag = 1;
        return;
    }

    flag = 0;
}

function onJsonMail(json){
    jsonMail = json;
}

function onResponseMail(response){
    return response.json();
}

function loadMailBox(){
    const urlMail = MailBoxLayerEP + "access_key=" + accessKey + "&email=" + MailBox.value;

    fetch(urlMail).then(onResponseMail).then(onJsonMail);

    setTimeout(() => {
        console.log(jsonMail); // stampiamo sulla console oggetto jsonMail per verifica
        compare(); // invochiamo la funzione console
    }, 600); // ritardo di 600 millisecondi
}

function reloadListener(event){
    AccountForm.addEventListener('submit', analizeData);
    AccountForm.removeEventListener('submit', reloadListener);
}

function analizeData(event){
    event.preventDefault();
    loadMailBox();

    setTimeout(() => {
        console.log(flag);
        if(flag === 0){
            MailBox.classList.add("Wrong")
        } else {
            MailBox.classList.remove("Wrong");
            AccountForm.removeEventListener('submit', analizeData);
            AccountForm.addEventListener('submit', reloadListener);
        }
    }, 650);
}

AccountForm.addEventListener('submit', analizeData);