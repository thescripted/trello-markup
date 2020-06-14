import React from 'react';
import CardListContainer from "./Components/CardListContainer";
import Header from "./Components/Header";
import { Database } from "./Components/localDatabase";

const App = () => {
  return (
    <div className="App">
      <Header />
      <CardListContainer Database={Database} />
    </div>
  );
}

export default App;
