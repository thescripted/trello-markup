// All Available GQL Requests.

export const GET_ALL_DATA = `
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

export const ADD_NEW_LIST = `
mutation ($title: String!) {
  addList (title: $title) {
    list_id
    title
  }
}
`

export const DELETE_LIST = `
mutation($list_id: Int!) {
  deleteList(id: $list_id)
}`

export const UPDATE_LIST = `
mutation($list_id: Int!, $title: String!) {
  updateList(id: $list_id, title: $title) {
    list_id
    title
  }
}
`

export const ADD_CARD_TO_LIST = `
mutation($list_id: Int!, $content: String!) {
  addCardToList(list_id: $list_id,  content: $content) {
    content
    card_id
  }
}`

export const DELETE_CARD_FROM_LIST = `
mutation($card_id: Int!, $list_id: Int!) {
  deleteCardFromList(card_id: $card_id, list_id: $list_id)
}
`
