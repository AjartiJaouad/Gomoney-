const btnSimulate = document.getElementById("btnSimulate");
const result = document.getElementById("result");

btnSimulate.addEventListener("click", function (e) {
  e.preventDefault();

  const nom = document.getElementById("nomComplet").value.trim();
  const typePret = document.getElementById("loanType").value;
  const montant = parseFloat(document.getElementById("amount").value);
  const duree = parseFloat(document.getElementById("years").value);
  const salaire = parseFloat(document.getElementById("salary").value);
  const nbMois = duree * 12;

  if (!nom || !montant || !duree || !salaire) {
    afficherErreur("Veuillez remplir tous les champs.");
    return;
  }

  if (montant <= 0 || duree <= 0 || salaire <= 0) {
    afficherErreur("Les valeurs saisies doivent être positives.");
    return;
  }

  let taux = {
    "Maison": 2,
    "Appartement": 3,
    "Terrain": 4,
    "Petite entreprise": 5,
    "Prêt personnel": 6,
  }[typePret];



  //  Calcul mensualite
  const tauxMensuel = (taux / 100) / 12;
  const mensualite = (montant * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMois));

  // Calcul total etintrete
  const totalRembourse = mensualite * nbMois;
  const totalInterets = totalRembourse - montant;

  // Vrification capacite(40% salaire)
  const seuilMax = salaire * 0.40;

  if (mensualite > seuilMax) {
    afficherErreur("La mensualité dépasse 40% de votre salaire. Le prêt n'est pas accessible avec ce revenu.");
    return;
  }

  //  Affichage du resulat
  result.style.color = "#ebeeecff";
  result.innerHTML = `
    <h3>Rsultat de la simulation</h3>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Type de pret :</strong> ${typePret}</p>
    <p><strong>Montant demande :</strong> ${montant.toFixed(2)} DH</p>
    <p><strong>Taux applique :</strong> ${taux}%</p>
    <p><strong>Mensualité :</strong> ${mensualite.toFixed(2)} DH / mois</p>
    <p><strong>Total des interets :</strong> ${totalInterets.toFixed(2)} DH</p>
    <p><strong>Montant total à rembourser :</strong> ${totalRembourse.toFixed(2)} DH</p>
    <p><strong>Durée :</strong> ${duree} ans </p>
  `;
  // Exemple : totalInterets et totalRembourse déjà calculés
  const pourcentageInteret = (totalInterets / totalRembourse) * 100;

  // Récupère la barre et change sa largeur
  const bar = document.getElementById("interet-bar");
  bar.style.width = pourcentageInteret + "%";


});


function afficherErreur(message) {
  result.style.color = "#ebeeec";
  result.innerHTML = `<strong>${message}</strong>`;
}
