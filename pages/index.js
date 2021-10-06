import {useState, useEffect} from 'react'
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useRouter } from 'next/router'
import {db} from '../components/fire'

export default function Home() {
  const [message, setMessage] = useState('Words Wolf')
  const [roomNumber, setRoomNumber] = useState('')
  const [status, setStatus] = useState('')
  const [userName, setUserName] = useState('')
  const existRooms = query(collection(db, "words"), where("a","==", true))

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
    setRoomNumber(roomNumber)
    setStatus(0)
  })

  const onChangeRoomNumber = ((e)=> {
    setRoomNumber(e.target.value)
  })

  const enterRoom = (() => {
    router.push('/fire?id='+roomNumber)
  })
  if(roomNumber) {
    return (
      <div>
        <h1>{message}</h1>
        <div>
          {roomNumber}
        </div>
        <div>
          {status}
        </div>
      </div>
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
