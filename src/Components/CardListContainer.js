import React from 'react';
import CardList from './CardList';

const CardListContainer = () => {
  return (
    <div className="cardlist-canvas">
      <div className="cardlist-header">
        <div className="menu-left-header">
          <div className="title-container f18 lh20">
            Reactive Schedule Builder
          </div>
          <button className="star-icon-button">Star</button>
        </div>
        <button className="menu-right-header">Show Menu</button>
      </div>
      <div className="list-container main-container-scroll">
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <div className="list-wrapper add-another-list">
          <a href="/" className="list-composer">
            <span className="icon-add"></span>
            <span className="add-another-list-text">Add another list</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardListContainer;
