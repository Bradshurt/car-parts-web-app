export function ajouterListeAvis() {
    const piecesElement = document.querySelectorAll('.fiches article button');

    piecesElement.forEach(( pieceElement) => {
        pieceElement.addEventListener('click', async (event) => {
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
            const avis = await reponse.json();
            const piecesElement = event.target.parentElement;

            const avisElement = document.createElement('p');
            avis.forEach((unAvis) => {
                avisElement.innerHTML += `<b>${unAvis.utilisateur}:</b> ${unAvis.commentaire}<br>`;
            });

            pieceElement.appendChild(avisElement);
        })
    })
}