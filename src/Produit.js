export default class Produit {
  constructor(nom, qte, id = -1) {
    this.nom = nom;
    this.qte = qte;
    this.id = id;
  }
}
