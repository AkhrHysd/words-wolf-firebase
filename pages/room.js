import {useState, useEffect} from 'react'
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from 'next/router'
import {db} from '../components/fire'

export default function Room(props) {
  const [message, setMessage] = useState('Words Wolf')
  const [userName, setUserName] = useState('')
  const [login, setLogin] = useState(0)
  const router = useRouter()


  const joinGame = ( async () => {
      console.log(router.query.id)
    const ob = {
      nickName: userName,
      roomNumber: Number(router.query.id),
    }
    const docRef = await addDoc(collection(db, "users"), ob)
    setLogin(1)
    console.log(login);
  })

  const deleteRoom = ( async () => {
    const docDel = await deleteDoc(doc(db, "rooms", router.query.id))
    
    router.push('/')
  })

  const onChangeUserName = ((e)=> {
    setUserName(e.target.value)
  })


  return (
    <div>
      <h1>{message}</h1>
      <div>
        <label>ニックネーム</label>
        <input type="text" onChange={onChangeUserName} />
        <button onClick={joinGame}>ゲームに参加する</button>
      </div>
      <button onClick={deleteRoom}>ゲーム終了</button>
    </div>
  )
}
