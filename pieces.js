import { ajouterListeAvis, ajouterAvisUtilisateur, afficherAvis, afficherGraphiqueAvis } from "./avis.js";

// Récupération des données dans le localStorage
let pieces = window.localStorage.getItem("pieces");

if (pieces === null){
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch("http://localhost:8081/pieces/");
    pieces = await reponse.json();

    const valeursPieces = JSON.stringify(pieces);

    // stockage des information dans le localStorage
    window.localStorage.setItem("pieces", valeursPieces);
}else {
    pieces = JSON.parse(pieces);
}

ajouterAvisUtilisateur();

// création des balises HTML
function genererPiece(pieces) {
    pieces.forEach((piece) => {

        const sectionFiches = document.querySelector(".fiches");
        const articleElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = piece.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = piece.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${piece.prix} € (${piece.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = piece.categorie ?? "Aucune catégorie";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = piece.description ?? "Pas de description pour le moment.";

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = piece.disponibilite ? "En stock" : "Rupture de stock";

        const buttonAvis = document.createElement("button");
        buttonAvis.dataset.id = piece.id;
        buttonAvis.textContent = "Afficher les avis";

        // Rattachement de nos éléments au DOM

        sectionFiches.appendChild(articleElement);

        articleElement.appendChild(imageElement);
        articleElement.appendChild(nomElement);
        articleElement.appendChild(prixElement);
        articleElement.appendChild(categorieElement);
        articleElement.appendChild(disponibiliteElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(buttonAvis);
    });

    ajouterListeAvis();
}

genererPiece(pieces);

pieces.forEach((items) => {
    const id = items.id;
    const avisJSON = window.localStorage.getItem(`avis-pieces-${id}`);
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const articleElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(articleElement, avis)
    }
});

// Gestion des boutton
const btnTrier = document.querySelector(".btn-trier");
btnTrier.addEventListener('click', () => {

    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort( function(a,b) {
        return a.prix - b.prix;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(piecesOrdonnees);
})

const btnFiltrer = document.querySelector(".btn-filtrer");
btnFiltrer.addEventListener('click', () => {
    const piecesFiltrees = pieces.filter( function (piece) {
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(piecesFiltrees)
})

const btnDecroissant = document.querySelector(".btn-decroissant");
btnDecroissant.addEventListener('click', () => {

    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort( function(a,b) {
        return b.prix - a.prix;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(piecesOrdonnees)
})

const btnNoDesc = document.querySelector(".btn-nodesc");
btnNoDesc.addEventListener('click', () => {
    const piecesNoDesc = pieces.filter(function (piece) {
        return !piece.description;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(piecesNoDesc)
});

const InputPixMax = document.querySelector("#prix-max");
InputPixMax.addEventListener('input', () => {
    const piecesPixMax = pieces.filter(piece => piece.prix <= InputPixMax.value); 
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(piecesPixMax)
});

const btnAnnuler = document.querySelector(".btn-annuler");
btnAnnuler.addEventListener('click', () => {
    document.querySelector(".fiches").innerHTML = "";
    genererPiece(pieces);
});

const btnMisaJour = document.querySelector(".btn-maj");
btnMisaJour.addEventListener('click', () => {
    window.localStorage.removeItem("pieces");
});

await afficherGraphiqueAvis();