// oppretter et tomt array for å lagre billettene
const billetter = [];

function registrerBillett() {
    // fjerner feilmeldingene når man retter opp i inputboksene og trykker "kjøp billett"
    document.getElementById("feilAntall").innerHTML = "";
    document.getElementById("feilFornavn").innerHTML = "";
    document.getElementById("feilEtternavn").innerHTML = "";
    document.getElementById("feilTelefonnr").innerHTML = "";
    document.getElementById("feilEpost").innerHTML = "";

    // Henter inn verdiene fra HTML input-feltene
    const film = document.getElementById("film").value;
    const antall = Number(document.getElementById("antall").value);
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;

    // Inputvalidering til "antall". Må skrive et tall som er positivt
    if (isNaN(antall) || antall <= 0) {
        document.getElementById("feilAntall").innerHTML = "Må være et tall større enn 0";
    }
    // Inputvalidering til "Fornavn" og "etternavn". Må skrive noe i feltet og kan ikke skrive tall
    if (fornavn.length === 0 || !isNaN(fornavn)) {
        document.getElementById("feilFornavn").innerHTML = "Må skrive inn et fornavn";
    }
    if (etternavn.length === 0 || !isNaN(etternavn)) {
        document.getElementById("feilEtternavn").innerHTML = "Må skrive inn et etternavn";
    }
    // Inputvalidering til "telefonnr". Det må være et nummer og ha 8 siffer
    if (isNaN(telefonnr) || telefonnr.length !== 8){
        document.getElementById("feilTelefonnr").innerHTML = "Telefonnummeret må ha 8 siffer";
    }
    // Inputvalidering til "epost". Brukt en regex setning for å teste e-post, som vil si at den starter med noen tegn,
    // også kommer det en @ og så kommer det noen tegn også kommer det en . også kommer det noen tegn igjen.
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("feilEpost").innerHTML = "Ikke gyldig e-postadresse";
    }
    // Hvis inputvalideringene har gått fint, vil man fortsette med else og å legge inn billetten i arrayet
    else {
        // Lager et objekt
        const enBillett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost
        };
        // Legger billettene(objektene) inn i arrayet "billetter"
        billetter.push(enBillett);

        // Viser listen med billetter som er lagt i arrayet
        visBilletter()

        // Nullstiller input-feltene etter at billetten er kjøpt
        document.getElementById("film").value = "";
        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("telefonnr").value = "";
        document.getElementById("epost").value = "";
    }
}
// Hvordan arrayet listes ut under "Alle billetter"
function visBilletter(){
    let ut = "<table><tr>" +
        "<th> Film </th> <th> Antall </th> <th> Fornavn </th> " +
        "<th> Etternavn </th> <th> Telefonnr </th> " +
        "<th> E-post </th></tr>";
    for (let b of billetter) {
        ut += "<tr>";
        ut += "<td>" + b.film + "</td><td>" + b.antall
            + "</td><td>" + b.fornavn + "</td><td>" + b.etternavn + "</td><td>"
            + b.telefonnr + "</td><td>" + b.epost +"</td></tr>";
    }
    document.getElementById("billetter").innerHTML = ut;
}

// Tømmer arrayet når man trykker på knappen "Slett alle billettene"
function slettBilletter(){
    billetter.length = 0;
    visBilletter();
}
