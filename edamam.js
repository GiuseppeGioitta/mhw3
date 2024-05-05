/* --- EDAMAM API --- */
const edamamLayer = "https://api.edamam.com/api/nutrition-data?";
const accessKey = "ffaaf8c1f93b8a78165bdfb1bfff0423";
const accessid = "737c9897";
let jsonValori, flag;

function onJsonVal(json){
    console.log('JSON ricevuto')
    jsonValori = json;
    console.log(json);
    // Svuotiamo la libreria
    const library = document.querySelector('#Valori');
    library.innerHTML = '';
    // Creiamo il div dove inserire i valori
    const contenuto = document.createElement('div');
    contenuto.classList.add('contenuto_lista')

    const caloriesElement = document.createElement('p');
    caloriesElement.textContent = "Calorie: " +jsonValori.calories;

    const totalCO2EmissionsElement = document.createElement('p');
    totalCO2EmissionsElement.textContent = "Emissione totale di CO2: " +jsonValori.totalCO2Emissions;

    const co2EmissionsClassElement = document.createElement('p');
    co2EmissionsClassElement.textContent = "Classe di emissioni di CO2: " + jsonValori.co2EmissionsClass;

    const totalWeightElement = document.createElement('p');
    totalWeightElement.textContent = "Peso Totale: " + jsonValori.totalWeight;

    contenuto.appendChild(caloriesElement);
    contenuto.appendChild(totalCO2EmissionsElement);
    contenuto.appendChild(co2EmissionsClassElement);
    contenuto.appendChild(totalWeightElement);
    //totalWeight

    Valori.appendChild(contenuto);
}

function onResponseValori (response){
    console.log('Risposta ricevuta')
    return response.json();
}

function loadData(event){
    event.preventDefault();
    // Leggere il valore dal campo di testo
    const ValoriBox = document.querySelector("#alimento");
    const alimento_input = encodeURIComponent(ValoriBox.value);
    console.log('Eseguo la ricerca: ' + alimento_input);
    //Preparo la richiesta
    url_load = edamamLayer + 'app_id=' + accessid + '&app_key=' + accessKey + '&ingr=' + alimento_input;
    console.log('URL: ' + url_load);
    //Eseguiamo la fetch
    fetch(url_load).then(onResponseValori).then(onJsonVal);
}

// Aggiungiamo event listener al form
const Form_Nutrizionale = document.forms["Form_Nutrizionale"];
Form_Nutrizionale.addEventListener('submit', loadData);
