// Helper File for State Management & Generation.
// This file fundamentally uses and manipulates the state described in CardListContainers.js
// Ideally, if this program gets larger, a state management library would be useful, like Redux or MobX.
import {
  GET_ALL_DATA,
  ADD_NEW_LIST,
  DELETE_LIST,
  UPDATE_LIST
} from "../Support/gql"

import { useQuery, useMutation } from "urql"

let cardState = null
let setState = null

export function useGQLQuery() {
  // "Constructor" function. Invoked by CardListContainer. Initializes the state & API in the rest of this file. Will Set up to Handle Errors too.

  const { data, fetching, error } = results
  //   if (cardState) {
  //       throw new Error ("Card State has already been defined.")
  //   }
  cardState = data ? data.getListsAndCardsData : null
  console.log(cardState)
  return [results, reexecuteQuery]
}
