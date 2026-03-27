const SERVER_URL = "https://message-board-server-7h9t.onrender.com";

// ===== Charger les messages au démarrage =====
function chargerMessages() {
  fetch(SERVER_URL + '/msg/getAll')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      update(data); // ta fonction update() du TP1
    });
}

// ===== Fonction update (mise à jour de la liste) =====
function update(tableau) {
  const liste = document.getElementById("liste-messages");
  liste.innerHTML = "";

  tableau.forEach(function(item) {
    const li = document.createElement("li");

    const date = new Date(item.date).toLocaleString("fr-FR");

    li.innerHTML = `
      <strong>${item.pseudo}</strong>
      <span> — ${date}</span>
      <p>${item.msg}</p>
    `;
    liste.appendChild(li);
  });
}

// ===== Bouton Envoyer =====
document.getElementById("btn-envoyer").addEventListener("click", function() {
  const pseudo = document.getElementById("pseudo").value.trim() || "Anonyme";
  const texte  = document.getElementById("nouveau-message").value.trim();

  if (texte === "") {
    alert("Le message ne peut pas être vide !");
    return;
  }

  // On encode le message pour l'URL
  const msgEncode = encodeURIComponent(texte);

  fetch(SERVER_URL + '/msg/post/' + msgEncode)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Vider les champs
      document.getElementById("nouveau-message").value = "";
      document.getElementById("pseudo").value = "";
      // Recharger les messages
      chargerMessages();
    });
});

// ===== Bouton Thème =====
document.getElementById("btn-theme").addEventListener("click", function() {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark")
    ? "☀️ Mode clair"
    : "🌙 Mode sombre";
});

// ===== Lancement =====
chargerMessages();
