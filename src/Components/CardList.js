import React, { useState, useRef, useEffect } from "react"
import Card from "./Card"
import { AddCard } from "./AddCard"

const CardList = ({ title, id, cardData, deleteListByID }) => {
  const [toggleHide, setToggleHide] = useState(true)
  const [message, setMessage] = useState("")
  const textFocus = useRef(null)

  const handleHiding = () => {
    setToggleHide(!toggleHide)
  }

  useEffect(() => {
    if (textFocus && textFocus.current) {
      textFocus.current.focus()
    }
  }, [toggleHide])

  const handleMessageUpdater = e => {
    setMessage(e.target.value)
  }

  const handleMessageSubmitter = e => {
    // triggers a new generated card and clears message/hiding
    if (message.trim() !== "") {
      generateNewCard()
      setMessage("")
    }
    if (e.keyCode !== 13) {
      handleHiding()
    } else {
      setMessage("")
      textFocus.current.focus()
    }
    return
  }

  const generateNewCard = () => {
    // add a new card in-memory to the cardData array
    cardData.content.push(message)
  }

  const handleTitle = e => {
    if (e.keyCode === 13) {
      document.activeElement.blur() // Removes focus from title
    }
  }

  const handleContent = e => {
    if (e.keyCode === 13) {
      document.activeElement.blur()
      handleMessageSubmitter(e)
    }
  }

  return (
    <div className='list-wrapper'>
      <div className='card-list'>
        <div className='header-list'>
          <textarea
            defaultValue={title}
            className='header-list-name f16'
            rows='1'
            spellCheck='false'
            onKeyDown={handleTitle}
          />
          <button className='cancel-button' onClick={() => deleteListByID(id)}>
            x
          </button>
        </div>
        <div className='list-card list-scroll'>
          {cardData.map(cards => (
            <Card key={cards.card_id} text={cards.content} /> //TODO: Generate Unique Key
          ))}
          <div className={toggleHide ? "hide" : "cc-input-container"}>
            <div className='card-list-input'>
              <textarea
                ref={textFocus}
                className='card-list-textarea'
                dir='auto'
                value={message}
                onChange={e => handleMessageUpdater(e)}
                onKeyDown={handleContent}
                placeholder='Enter a title for this card…'
              ></textarea>
            </div>
            <div className='card-list-control'>
              <input
                autoFocus
                className='primary'
                type='submit'
                value='Add Card'
                onClick={e => handleMessageSubmitter(e)}
              />
              {/* eslint-disable-next-line */}
              <a className='icon-close' href='#' onClick={handleHiding} />
            </div>
          </div>
        </div>
        <AddCard handleHiding={handleHiding} toggleHide={toggleHide} />
      </div>
    </div>
  )
}

export default CardList
