// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// création des balises HTML
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

    // Rattachement de nos éléments au DOM

    sectionFiches.appendChild(articleElement);

    articleElement.appendChild(imageElement);
    articleElement.appendChild(nomElement);
    articleElement.appendChild(prixElement);
    articleElement.appendChild(categorieElement);
    articleElement.appendChild(disponibiliteElement);
    articleElement.appendChild(descriptionElement);
});