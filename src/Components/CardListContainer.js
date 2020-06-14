import React, { useState, useRef } from 'react';
import CardList from './CardList';
import AddList from './AddList';

const TEST_LIST = [];

const CardListContainer = ({ Database }) => {
  const [hideListCreator, setHideListCreator] = useState(true);
  const [listMessage, setListMessage] = useState("");
  const textFocus = useRef(null)

  const handleListHiding = () => {
    setHideListCreator(!hideListCreator);
  }

  const handleListUpdater = (e) => {
    setListMessage(e.target.value);
  }

  const handleListSubmitter = e => { // Generates a List Object to render onto the canvas
    TEST_LIST.push(listMessage);
    setListMessage("");
    handleListHiding();
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
        {Database.map(cardData => (
          <CardList cardData={cardData} />
        ))}
        {hideListCreator ? (<AddList handleListHiding={handleListHiding} toggleListHide={hideListCreator} />) :
          (
            <div className={hideListCreator ? "hide" : "list-wrapper"}>
              <div className="card-list">
                <div className="cardlist-creation-container cc-input-container">
                  <div className="cardlist-creation-text">
                    <textarea
                      ref={textFocus}
                      className="cardlist-creation-textarea card-list-textarea"
                      onClick={e => handleListUpdater(e)}
                      placeholder="Enter list title..."></textarea>
                  </div>
                  <div className="cardlist-creation-controls card-list-control">
                    <input className="primary" type="submit" value="Add List" onClick={e => handleListSubmitter(e)} />
                    { /* eslint-disable-next-line */}
                    <a className="icon-close" href="#" onClick={handleListHiding} />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CardListContainer;
