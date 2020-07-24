import React, { useState, useRef, useEffect } from "react"
import CardList from "./CardList"
import AddList from "./AddList"
import { useQuery, useMutation } from "urql"

// TODO: CREATE LOCAL STATE FOR ONCHANGE IN ADDLIST, AND HANDLE RE-RENDER IN THIS CONTAINER

const GET_ALL_DATA = `
  query {
    getListsAndCardsData {
      title
      list_id
      card {
        content
        createdat
        card_id
      }
    }
  }
`

const ADD_NEW_LIST = `
mutation ($title: String!) {
  addList (title: $title) {
    list_id
    title
  }
}
`

const DELETE_LIST = `
mutation($list_id: Int!) {
  deleteList(id: $list_id)
}`

const UPDATE_LIST = `
mutation($list_id: Int!, $title: String!) {
  updateList(id: $list_id, title: $title) {
    list_id
    title
  }
}
`

const CardListContainer = () => {
  const [results, reexecuteQuery] = useQuery({
    query: GET_ALL_DATA,
    requestPolicy: "cache-and-network"
  })
  const [createListResults, createList] = useMutation(ADD_NEW_LIST)
  const [deleteListResults, deleteList] = useMutation(DELETE_LIST)
  const [updateListResults, updateList] = useMutation(UPDATE_LIST)

  const deleteListByID = list_id => {
    deleteList({ list_id: parseInt(list_id) }).then(result => {
      if (result.error) {
        console.log("Oh, no!", result.error)
      }
    })
    reexecuteQuery({
      requestPolicy: "cache-and-network"
    })
  }

  const updateListByID = (list_id, title) => {
    updateList({ list_id: parseInt(list_id), title: title }).then(result => {
      if (result.error) {
        console.log("Oh, no!", result.error)
      }
    })
    reexecuteQuery({
      requestPolicy: "cache-and-network"
    })
  }

  const [hideListCreator, setHideListCreator] = useState(true)
  const [listMessage, setListMessage] = useState("")
  const textFocus = useRef(null)

  const handleListHiding = () => {
    setHideListCreator(!hideListCreator)
  }

  const handleListUpdater = e => {
    setListMessage(e.target.value)
  }

  const handleListSubmitter = e => {
    // Generates a List Object to render onto the canvas
    createList({
      title: listMessage
    }).then(result => {
      if (result.error) {
        console.log("Oh, no!", result.error)
      }
    })
    setListMessage("")
    handleListHiding()
  }

  const { data, fetching, error } = results

  return (
    <div className='cardlist-canvas'>
      <div className='cardlist-header'>
        <div className='menu-left-header'>
          <div className='title-container f18 lh20'>
            Reactive Schedule Builder
          </div>
          <button className='star-icon-button'>Star</button>
        </div>
        <button className='menu-right-header'>Show Menu</button>
      </div>
      <div className='list-container main-container-scroll'>
        {data &&
          data.getListsAndCardsData.map(listItem => (
            <CardList
              title={listItem.title}
              key={listItem.list_id}
              id={listItem.list_id}
              cardData={listItem.card}
              updateListByID={updateListByID}
              deleteListByID={deleteListByID}
            />
          ))}
        {hideListCreator ? (
          <AddList
            handleListHiding={handleListHiding}
            toggleListHide={hideListCreator}
          />
        ) : (
          <div className={hideListCreator ? "hide" : "list-wrapper"}>
            <div className='card-list'>
              <div className='cardlist-creation-container cc-input-container'>
                <div className='cardlist-creation-text'>
                  <textarea
                    ref={textFocus}
                    className='cardlist-creation-textarea card-list-textarea'
                    onChange={e => handleListUpdater(e)}
                    placeholder='Enter list title...'
                  ></textarea>
                </div>
                <div className='cardlist-creation-controls card-list-control'>
                  <input
                    className='primary'
                    type='submit'
                    value='Add List'
                    onClick={e => handleListSubmitter(e)}
                  />
                  {/* eslint-disable-next-line */}
                  <a
                    className='icon-close'
                    href='#'
                    onClick={handleListHiding}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardListContainer
