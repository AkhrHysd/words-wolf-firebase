import { useState,useEffect,useCallback } from "react"

import {db} from '../components/fire'

import { 
    doc,
    collection,
    addDoc,
    getDocs,
    getDoc,
    query,
    where, 
    deleteDoc,
    onSnapshot, 
    docChanges
} from "firebase/firestore";

export default function Room(props) {
    const [members, setMembers] = useState('')

    return (
        <div>
          <h1>{props.message}</h1>
          <div>
              <h2>{props.number}</h2>
            {props.id}
          </div>
        </div>
    )
}