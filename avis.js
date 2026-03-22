export function ajouterListeAvis() {
    const piecesElements = document.querySelectorAll('.fiches article button');

    piecesElements.forEach((element) => {
        element.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
            const articleElement = event.target.parentElement;
            afficherAvis(articleElement, avis);
        })
    })
}

export function afficherAvis(articleElement, avis){
    const avisElement = document.createElement('p');
    avis.forEach((unAvis) => {
        avisElement.innerHTML += `<b>${unAvis.utilisateur}:</b> ${unAvis.commentaire}<br> ${unAvis.nbEtoiles} ${unAvis.nbEtoiles > 1 ? "étoiles" : "étoile"} <br>`;
    });

    articleElement.appendChild(avisElement);
}

export function ajouterAvisUtilisateur() {
    const formulaireAvis = document.querySelector('.formulaire-avis');
    formulaireAvis.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const avis = {
            pieceId: parseInt(e.target.querySelector("[name=piece-id]").value),
            utilisateur: e.target.querySelector("[name=utilisateur]").value,
            commentaire: e.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(e.target.querySelector("[name=nb-etoiles]").value)
        };

        const chargeUtile = JSON.stringify(avis);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });

    })
}

export async function afficherGraphiqueAvis() {
    const reponse = await fetch("http://localhost:8081/avis");
    const avis = await reponse.json();
    const nb_commentaire = [0, 0, 0, 0, 0];

    avis.forEach((commentaire) => {
        nb_commentaire[commentaire.nbEtoiles - 1]++;
    });

    const labels = ["5", "4", "3", "2", "1", ]
    const data = {
        labels: labels,
        datasets: [{
            label: "Etoiles attribuées",
            data: nb_commentaire.reverse(),
            backgroundColor: "rgba(255, 230, 0, 1)",
        }],
    };
    
    const config = {
        type: "bar",
        data: data,
        options: {
            indexAxis: "y",
        },
    };

    const graphiqueAvis = new Chart(
        document.querySelector("#myChart"),
        config,
    );
}