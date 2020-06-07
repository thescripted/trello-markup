import React from 'react';
import CardList from './CardList';

const CardListContainer = () => {
  return (
    <div className="cardlist-canvas">
      <div className="list-container main-container-scroll">
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
      </div>
    </div>
  );
};

export default CardListContainer;
