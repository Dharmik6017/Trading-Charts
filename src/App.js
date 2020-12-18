import "./app.css";
import React from "react";
import Graph from "./components/graph";

const style = {
  container: {
    height: window.innerHeight,
  },
};

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ height: "100vh" }}>
        <div className="Graph">
          <h1 className="header">ETHBTC Crypto Chart</h1>
          <Graph />
          <div>
            <h4 className="title">Ethereum to Bitcoin Chart</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
