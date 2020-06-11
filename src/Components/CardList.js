import React, { useState, useRef, useEffect } from 'react';
import Card from "./Card";
import { AddCard } from './AddCard';

const cardInformation = [
  {
    text: "Here is some text"
  },
  {
    text: "Here is some more text"
  },
  {
    text: "Here is some text lexx"
  },
  {
    text: "Here is some text soemthing"
  },
  {
    text: "Here is some text something else"
  },
  {
    text: "Here is some text new thing"
  },
  {
    text: "Here is some text ladidah"
  },

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
    handleHiding()
    return;
  }

  const generateNewCard = () => { // add a new card in-memory to the cardInformation array
    cardInformation.push({ text: message })
    console.log(cardInformation)
  }

  const handleTitle = (e) => {
    if (e.keyCode === 13) {
      console.log(document.getElementsByClassName("header-list-name"))
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
          <AddCard handleHiding={handleHiding} toggleHide={toggleHide} />
          <div className={toggleHide ? "hide" : "cc-input-container"}>
            <div className="card-list-input">
              <textarea ref={textFocus}
                className="card-list-textarea"
                dir="auto"
                value={message}
                onChange={e => handleMessageUpdater(e)}
                placeholder="Enter a title for this card…"></textarea>
            </div>
            <div className="card-list-control">
              <input className="primary" type="submit" value="Add Card" onClick={e => handleMessageSubmitter(e)} />
              { /* eslint-disable-next-line */}
              <a className="icon-close" href="#" onClick={handleHiding} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CardList
