import React from "react";
import Produit from "../Produit";
import { ListItem, Card, Container, IconButton } from "@material-ui/core";
import FrigoForm from "./FrigoForm";
import DeleteIcon from "@material-ui/icons/Delete";
import ExposureNeg1 from "@material-ui/icons/ExposureNeg1";
import ExposurePlus1 from "@material-ui/icons/ExposurePlus1";

class Frigo extends React.Component {
  state = { frigo: [] };
  componentDidMount() {
    let url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/35/produits";

    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        let f = [];
        result.forEach((elem) => {
          f.push(new Produit(elem.nom, elem.qte, elem.id));
        });
        this.setState({ frigo: f });
      });
  }

  handlerAddProduit = (newProduit) => {
    let url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/35/produits";

    let prodToAdd = { nom: newProduit.nom, qte: newProduit.qte };

    let options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(prodToAdd)
    };

    fetch(url, options);
  };

  handlerDeleteProduit = (produit) => {
    let url =
      "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/35/produits/" +
      produit.id;

    fetch(url, { method: "DELETE" }).then(window.location.reload(false));
  };

  handlerModifierProduit = (newProduit, int) => {
    console.log(newProduit.id);
    let url = `https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/35/produits`;
    let newQte;

    if (int === 1) {
      //handler +1
      newQte = newProduit.qte + 1;
      console.log("qte +1");
    } else if (int === 2) {
      //handler -1
      newQte = newProduit.qte - 1;
      console.log("qte -1");
    }

    let prodToModify = { id: newProduit.id, nom: newProduit.nom, qte: newQte };
    console.log(prodToModify);
    let options = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(prodToModify)
    };

    fetch(url, options).then(window.location.reload());
  };

  handlerGetProdById = (produit) => {
    let url = `https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/35/produits/${produit.id}`;

    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  render() {
    return (
      <Container>
        <div>Elements du frigo :</div>
        <ul>
          {this.state.frigo.map((object, index) => (
            <ListItem key={index}>
              <Card style={{ width: "300px" }}>
                <Card onClick={() => this.handlerGetProdById(object)}>
                  {object.nom} ({object.qte})
                </Card>
                <Card>
                  <IconButton
                    onClick={() => this.handlerModifierProduit(object, 2)}
                  >
                    <ExposureNeg1></ExposureNeg1>
                  </IconButton>
                  <IconButton
                    onClick={() => this.handlerModifierProduit(object, 1)}
                  >
                    <ExposurePlus1></ExposurePlus1>
                  </IconButton>
                  <IconButton onClick={() => this.handlerDeleteProduit(object)}>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </Card>
              </Card>
            </ListItem>
          ))}
        </ul>
        <FrigoForm handlerRecupProd={this.handlerAddProduit} />
      </Container>
    );
  }
}

export default Frigo;
