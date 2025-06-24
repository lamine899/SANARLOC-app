// I barre de recherche
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const container = document.getElementById("containerLogement");

// II liste des logements

function afficherLogement(data)
{
    container.innerHTML = "";
    if(data.length == 0)
    {
        container.innerHTML = "<p>Aucun logement trouvé !</p>";
        container.style.color = "white";
        container.style.textAlign = "center";
    }
    else{
        data.forEach(logement => {
            const card = document.createElement('div');
            card.className = "logement-card";
        
            card.innerHTML = `
            <h3>${logement.titre}</h3>
            <p><strong>Université:</strong> ${logement.universite}</p>
            <p><strong>Localisation:</strong> ${logement.localisation}</p>
            <p><strong>Type:</strong> ${logement.type}</p>
            <p><strong>Prix:</strong> ${logement.prix} FCFA</p>
            <p><strong>Distance:</strong> ${logement.distance} km</p>
            <button class="voir-plus-btn" data-id="${logement.id}">Voir plus</button>
            `;
        
            container.appendChild(card); // on ajoute la carte dans la page
        });
        
        // III Gestion des boutons voir-plus

        const voirPlusBtns = document.querySelectorAll('.voir-plus-btn');
        voirPlusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const logement = logements.find(l => l.id == id);

                // Créer le contenu du modal
                const modalBody = document.getElementById('modal-body');
                modalBody.innerHTML = `
                <p style= "text-align: initial; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; text-decoration: underline;">Informations supplémentaires sur ce logement</p>
                <h2>${logement.titre}</h2>
                <div style = "display: flex; gap: 2rem"; width: 100%;>
                  <img src="assets/${logement.image1}" alt="${logement.titre}" style="width:50%; height:200px; object-fit:cover; border-radius:8px;">
                  <img src="assets/${logement.image2}" alt="${logement.titre}" style="width:50%; height:200px; object-fit:cover; border-radius:8px;">
                  <img src="assets/${logement.image3}" alt="${logement.titre}" style="width:50%; height:200px; object-fit:cover; border-radius:8px;">
                  
                </div>
                <div class="description-motivation">
                  <p style="margin-top: 10px; font-style: italic; color: #444;">${getDescriptionMotivante(logement.type)}</p>
                </div>
                <div style= "display: flex; gap: 15px; margin-bottom: 10px;">
                  <p><strong style = "color: #005fa3;">Localisation:</strong> ${logement.localisation}</p>
                  <p><strong style = "color: #005fa3;">Type:</strong> ${logement.type}</p>
                  <p><strong style = "color: #005fa3;">Prix:</strong> ${logement.prix} FCFA</p>
                  <p><strong style = "color: #005fa3;">Distance du campus de ${logement.universite}:</strong> ${logement.distance} km</p>
                </div>
                <button class="reserver-btn" data-id="${logement.id}">Passer ma reservation</button>
                `;

                // Afficher le modal
               document.getElementById('modal').style.display = 'block';
            });
        });

    }
}
// IV Gestion des descriptions motivantes
// Fonction pour obtenir une description motivante en fonction du type de logement

function getDescriptionMotivante(type) {
  switch(type.toLowerCase()) {
    case "studio":
      return "Un studio est parfait pour les étudiants qui souhaitent avoir leur intimité, un espace personnel pour étudier, cuisiner et se détendre sans partager avec d'autres.";
    case "chambre":
      return "Une chambre est idéale pour les petits budgets. <br> Elle permet d’avoir un coin tranquille pour dormir et travailler, souvent avec un accès partagé à la cuisine et la salle d’eau.";
    case "appartement":
      return "Un appartement offre plus d’espace, parfait pour partager entre amis ou pour un étudiant qui veut un vrai confort. <br> C’est un choix pratique pour les séjours longs.";
    default:
      return "Ce logement offre un bon compromis entre confort, prix et proximité du campus.";
  }
}


// V Fermer le modal
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// VI recherche et filtrage des logements
function rechercherLogement(terme) {
    const resultats = logements.filter(logement =>
      logement.titre.toLowerCase().includes(terme.toLowerCase()) ||
      logement.localisation.toLowerCase().includes(terme.toLowerCase()) ||
      logement.universite.toLowerCase().includes(terme.toLowerCase())
    );
  
    afficherLogement(resultats);
}
//VII Gestion de la recherche
searchBtn.addEventListener('click', (e) => {
  const termeRecherche = searchInput.value.trim(); // enlève les espaces inutiles
  if(termeRecherche === ""){
    e.preventDefault();
    return;
  }
  rechercherLogement(termeRecherche);

  searchInput.value = "";
  // Scroll vers la section des logements
  document.getElementById("containerLogement").scrollIntoView({
    behavior: "smooth"
  });
});
  
// VIII Gestion des filtres

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-type');

    if (type === 'all') {
      afficherLogement(logements);
    } else {
      const resultats = logements.filter(logement =>
        logement.type.toLowerCase() === type.toLowerCase()
      );
      afficherLogement(resultats);
    }

    // Scroll jusqu'à la liste
    document.getElementById("logementsSection").scrollIntoView({ behavior: "smooth" });
  });
});


// Gestion du formulaire de contact
document.getElementById("contactForm").addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Merci pour votre message ! Nous vous répondrons bientôt.");
  this.reset();
});


// Affichage initial
afficherLogement(logements);