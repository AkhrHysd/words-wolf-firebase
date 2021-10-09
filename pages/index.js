import {useState, useEffect} from 'react'
import { doc, collection, addDoc, getDocs, getDoc, query, where, deleteDoc, onSnapshot, docChanges } from "firebase/firestore";
import {db} from '../components/fire'
import Room from '../components/room'

export default function Home() {
  const [message, setMessage] = useState('Words Wolf')
  const [roomNumberTemp, setRoomNumberTemp] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [roomId, setRoomId] = useState('')
  const [status, setStatus] = useState('')
  const [userName, setUserName] = useState('')
  const existRooms = query(collection(db, "words"), where("a","==", true))
  let roomData = []

  // 部屋番号の生成
  const randRoom = () => {
    const CODE_TABLE = "0123456789"
    let r = ""
    let n = 4
    for (let i = 0, k = CODE_TABLE.length; i < n; i++){
        r += CODE_TABLE.charAt(Math.floor(k * Math.random()));
	  }
	  return Number(r);
  }

  // 稼働中の部屋のチェック並びに部屋番確定
  const defineRoomNumber = async () => {
    const num = randRoom()
    const q = query(collection(db, "rooms"), where("number","==", num))
    const querySnapshot = await getDocs(q)
    const rooms = []
    querySnapshot.forEach((doc) => {
      rooms.push(doc.data().number)
    })
    if (rooms.length) {
      defineRoomNumber()
    }else {
      return num
    }
  }

  //部屋作成→登録
  const createRoom = ( async () => {
    const roomNumber = await defineRoomNumber()
    const ob = {
      number: roomNumber,
      status: 0,
    }
    const docRef = await addDoc(collection(db, "rooms"), ob)
    roomData = await getDoc(docRef)
    setRoomId(roomData.id)
    setRoomNumber(roomNumber)
    setStatus(0)
  })

  // 部屋削除
  const deleteRoom = ( async () => {
    
  })

  const members = ( async () => {

  })


  const onChangeRoomNumber = ((e)=> {
    setRoomNumberTemp(e.target.value)
  })

  const enterRoom = (() => {
    console.log(roomNumberTemp)
    setRoomNumber(roomNumberTemp)
  })
  if(roomNumber) {
    return (
      <Room id={roomId} message={message} number={roomNumber}/>
    )
  }
  return (
    <div>
      <h1>{message}</h1>
      <div>
        <button onClick={createRoom}>ルームを作成する</button>
      </div>
      <div>
        <label>入室する</label>
        <input type="number" onChange={onChangeRoomNumber} />
        <button onClick={enterRoom}>入室する</button>
      </div>
      <div>
        <button onClick={defineRoomNumber}>test</button>
      </div>
    </div>
  )
}
