import React from "react";
import "./styles.css";
import Frigo from "./Components/Frigo";
import { Container } from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
      <Container>
        <h2 className="App">Bonjour Cédric, bienvenue dans ton frigo !</h2>
        <Frigo />
      </Container>
    );
  }
}

export default App;
