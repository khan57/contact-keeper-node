import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Haseeb khan",
        email: "haseeb@gmail.com",
        phone: "111-111-111",
        type: "personal",
      },
      {
        id: 2,
        name: "Faizan khan",
        email: "faizan@gmail.com",
        phone: "222-222-222 ",
        type: "personal",
      },
      {
        id: 3,
        name: "Adnan khan",
        email: "adnan@gmail.com",
        phone: "333-333-333",
        type: "professional",
      },
    ],
    current: null,
    filtered:null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //   Add contact

  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // delete contact

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };


  // set clear contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // clear current contact

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT});
  };
  // update contact

  const updateContact= (contact)=>{

    dispatch({type:UPDATE_CONTACT,payload:contact})
  }

  // filter contacts
  const filterContacts = (text)=>{
        dispatch({type:FILTER_CONTACTS,payload:text})
  }

  // clear filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER});
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current:state.current,
        filtered:state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;