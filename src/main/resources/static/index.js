function validerBillett() {
    // Henter verdier fra input-feltene
    const film = $("#film").val();
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();

    // Tømmer evt feilmeldingene før validering
    document.getElementById("feilFilm").innerHTML = "";
    document.getElementById("feilAntall").innerHTML = "";
    document.getElementById("feilFornavn").innerHTML = "";
    document.getElementById("feilEtternavn").innerHTML = "";
    document.getElementById("feilTelefonnr").innerHTML = "";
    document.getElementById("feilEpost").innerHTML = "";

    // Boolean for å sjekke om valideringen av inputverdiene var vellykket
    let valideringOk = true;

    // Inputvalidering for film, må ha valgt en film
    if (film === null || film === "") {
        document.getElementById("feilFilm").innerHTML = "Du må velge en film";
        valideringOk = false;
    }
    // Inputvalidering til "antall". Må skrive et tall som er positivt
    if (isNaN(antall) || antall <= 0) {
        document.getElementById("feilAntall").innerHTML = "Må være et tall større enn 0";
        valideringOk = false;
    }
    // Inputvalidering til "Fornavn" og "etternavn". Må skrive noe i feltet og kan ikke skrive tall
    if (fornavn.length === 0 || !isNaN(fornavn)) {
        document.getElementById("feilFornavn").innerHTML = "Må skrive inn et fornavn";
        valideringOk = false;
    }
    if (etternavn.length === 0 || !isNaN(etternavn)) {
        document.getElementById("feilEtternavn").innerHTML = "Må skrive inn et etternavn";
        valideringOk = false;
    }
    // Inputvalidering til "telefonnr". Det må være et nummer og ha 8 siffer
    if (isNaN(telefonnr) || telefonnr.length !== 8) {
        document.getElementById("feilTelefonnr").innerHTML = "Telefonnummeret må ha 8 siffer";
        valideringOk = false;
    }
    // Inputvalidering til "epost". Brukt en regex setning for å teste e-post, som vil si at den starter med noen tegn,
    // også kommer det en @ og så kommer det noen tegn også kommer det en . også kommer det noen tegn igjen.
    if (!/\S+@\S+\.\S+/.test(epost)) {
        document.getElementById("feilEpost").innerHTML = "Ikke gyldig e-postadresse";
        valideringOk = false;
    }
    // Hvis inputvalideringen er vellykket går man videre.
    return valideringOk;
}

function registrerBillett() {
    // Sjekker om valideringen var vellykket
    if (validerBillett()) {
        // Hvis valideringen var vellykket, lages et objekt med verdiene fra inputfeltene
        const billett = {
            film: $("#film").val(),
            antall: $("#antall").val(),
            fornavn: $("#fornavn").val(),
            etternavn: $("#etternavn").val(),
            telefonnr: $("#telefonnr").val(),
            epost: $("#epost").val()
        };

        // Sender billettopplysningene til serveren. POST brukes for å lagre data på server
        $.post("/lagreBillett", billett, function () {
            hentBilletter();
        });

        // tømmer input-feltene når billett er registrert
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        // Hvis valideringen mislyktes, logges en melding til konsollen
        console.log("Validering mislyktes, billetten er ikke registrert");
    }
}

// Henter ut de lagrede objektene fra Arrayet.
// Denne koden og den under henger sammen, men er delt for å ha GET-kallet
// så enkelt som mulig.
// Denne øverste er GET-kallet fra server.
function hentBilletter() {
    $.ajax({
        url: "/hentBilletter",
        method: "GET",
        success: function (alleBilletter) {
            skrivUtBilletter(alleBilletter);
        }
    })
}

// Denne koden skriver ut arrayet med en for-løkke og bestemmer hvordan
// utskriften skal se ut
function skrivUtBilletter(alleBilletter) {
    let ut = "<table><tr>" +
        "<th> Film </th> <th> Antall </th> <th> Fornavn </th> " +
        "<th> Etternavn </th> <th> Telefonnr </th> " +
        "<th> E-post </th></tr>";
    for (let billett of alleBilletter) {
        ut += "<tr>";
        ut += "<td>" + billett.film + "</td><td>" + billett.antall
            + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>"
            + billett.telefonnr + "</td><td>" + billett.epost + "</td></tr>";
    }
    ut += "</table>";
    $("#billettene").html(ut);
}

//Sletter alle billettene på serveren
function slettAlleBilletter() {
    $.ajax({
        url: "/slettAlleBilletter",
        type: "DELETE",
        success: function () {
            hentBilletter();
        }
    })
}

