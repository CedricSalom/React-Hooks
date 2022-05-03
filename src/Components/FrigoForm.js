import React from "react";
import Produit from "../Produit";
import { TextField, Button } from "@material-ui/core";

class FrigoForm extends React.Component {
  state = { nom: "", qte: "1" };

  handlerChangeNom = (event) => {
    this.setState({ nom: event.target.value });
  };

  handlerChangeQte = (event) => {
    this.setState({ qte: event.target.value });
  };

  handlerSubmit = (event) => {
    if (this.state.nom !== "") {
      this.props.handlerRecupProd(new Produit(this.state.nom, this.state.qte));
    }
  };

  render() {
    return (
      <form
        style={{ display: "flex" }}
        noValidate
        autoComplete="off"
        onSubmit={this.handlerSubmit}
      >
        <div>
          <TextField
            id="nom"
            label="nom"
            value={this.state.nom}
            onChange={this.handlerChangeNom}
            required
          />
        </div>
        <div>
          <TextField
            id="qte"
            label="qte"
            type="number"
            value={this.state.qte}
            onChange={this.handlerChangeQte}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined" size="small">
            Valider
          </Button>
        </div>
      </form>
    );
  }
}

export default FrigoForm;
