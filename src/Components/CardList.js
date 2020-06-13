import React, { useState, useRef, useEffect } from 'react';
import Card from "./Card";
import { AddCard } from './AddCard';

const cardInformation = [
]

const CardList = () => {
  const [toggleHide, setToggleHide] = useState(true);
  const [message, setMessage] = useState("");
  const textFocus = useRef(null)

  const handleHiding = () => {
    setToggleHide(!toggleHide);
  }

  useEffect(() => {
    if (textFocus && textFocus.current) {
      textFocus.current.focus()
    }
  }, [toggleHide])

  const handleMessageUpdater = (e) => {
    setMessage(e.target.value);
  }

  const handleMessageSubmitter = (e) => { // triggers a new generated card and clears message/hiding
    if (message.trim() !== "") {
      generateNewCard()
      setMessage("");
    }
    if (e.keyCode !== 13) {
      handleHiding()
    } else {
      setMessage("")
      textFocus.current.focus()
    }
    return;
  }

  const generateNewCard = () => { // add a new card in-memory to the cardInformation array
    cardInformation.push({ text: message })
    console.log(cardInformation)
  }

  const handleTitle = (e) => {
    if (e.keyCode === 13) {
      document.activeElement.blur() // Removes focus from title
    }
  }

  const handleContent = (e) => {
    if (e.keyCode === 13) {
      document.activeElement.blur();
      handleMessageSubmitter(e);
    }
  }

  return (
    <div className="list-wrapper">
      <div className="card-list">
        <div className="header-list">
          <textarea className="header-list-name f16" spellCheck="false" onKeyDown={handleTitle}>
            To-Do
          </textarea>
        </div>
        <div className="list-card list-scroll">
          {cardInformation.map(cardInfo => {
            return <Card text={cardInfo.text} />;
          })}
          <div className={toggleHide ? "hide" : "cc-input-container"}>
            <div className="card-list-input">
              <textarea ref={textFocus}
                className="card-list-textarea"
                dir="auto"
                value={message}
                onChange={e => handleMessageUpdater(e)}
                onKeyDown={handleContent}
                placeholder="Enter a title for this card…"></textarea>
            </div>
            <div className="card-list-control">
              <input autoFocus className="primary" type="submit" value="Add Card" onClick={e => handleMessageSubmitter(e)} />
              { /* eslint-disable-next-line */}
              <a className="icon-close" href="#" onClick={handleHiding} />
            </div>
          </div>
        </div>
        <AddCard handleHiding={handleHiding} toggleHide={toggleHide} />
      </div>
    </div >
  );
};

export default CardList
