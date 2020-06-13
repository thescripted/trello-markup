import React, { useState, useRef } from 'react';
import CardList from './CardList';
import AddList from './AddList';

const CardListContainer = () => {
  const [hideListCreator, setHideListCreator] = useState(true);
  const textFocus = useRef(null)

  const handleListHiding = () => {
    setHideListCreator(!hideListCreator);
  }

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
        <AddList handleListHiding={handleListHiding} toggleListHide={hideListCreator} />
        <div className={hideListCreator ? "hide" : "list-wrapper"}>
          <div className="card-list">
            <div className="cardlist-creation-container cc-input-container">
              <div className="cardlist-creation-text">
                <textarea ref={textFocus} className="cardlist-creation-textarea card-list-textarea" placeholder="Enter list title..."></textarea>
              </div>
              <div className="cardlist-creation-controls card-list-control">
                <input className="primary" type="submit" value="Add List" />
                { /* eslint-disable-next-line */}
                <a className="icon-close" href="#" onClick={handleListHiding} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardListContainer;
