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
    updateDoc,
    onSnapshot, 
    docChanges
} from "firebase/firestore";

export default function Room(props) {
    const [members, setMembers] = useState([])
    const [nickname, setNickname] = useState('')
    const [nicknameTemp, setNicknameTemp] = useState('')
    const [roomStatus, setRoomStatus] = useState(0)

    useEffect(() => {
        let us
        const unsubRooms = onSnapshot(doc(db, "rooms", props.id), async (doc) => {
            await updateMembers()
        })
        return () => unsubRooms()
    }, [])

    useEffect(() => {
        const q = query(collection(db, "users"), where("roomid", "==", props.id))
        let us
        const unsubUser = onSnapshot(q, async (doc) => {
            await updateMembers()
        })
        return () => unsubUser()
    }, [])

    // 現在のルーム内のメンバーを検索して配列で返す
    // @param array 
    // 
    const fetchUsers = ( async () => {
        const q = query(collection(db, "users"), where("roomid", "==", props.id))
        const querySnapshot = await getDocs(q)
        const user = []
        querySnapshot.forEach((doc) => {
            user.push(doc.data())
        })
        return user
    })

    // メンバーを更新するメソッド
    const updateMembers = useCallback(async ()=> {
        const usersNew = await fetchUsers()
        setMembers(usersNew)
    },[])

    // メンバーを追加するメソッド
    const addMember = ( async (name) => {
        const ob = {
          name: name,
          roomid: props.id,
          status: 0,
          hanged: 0,
        }
        await addDoc(collection(db, "users"), ob)
        await updateMembers()
    })

    const onChangeNickname = ((e) => {
        setNicknameTemp(e.target.value)
    })

    const submitNickname = (async() => {
        setNickname(nicknameTemp)
        await addMember(nicknameTemp)
        setRoomStatus(1)
    })



    const editMember = ( (type, param) => {
        console.log("click")
    })

    const matchStatus = ((status) => {
        switch(status) {
            case 0:
                return "準備中"
            case 1:
                return "準備完了!"
        }
    })

    // メンバーリストコンポーネント
    const MemberList = ({members}) => {
        const list = members.map((member, i) => {
            
            return (
                <li key={`member-${i}-${member.name}`}>
                    <button >
                        { member.name } 
                    </button>
                    <span>{matchStatus(member.status)}</span>
                </li>
            )
        })
        return <ul>{list}</ul>
    }

    switch(roomStatus) {
        case 0:
        return (
            <div>
                <h1>room: {props.number}</h1>
                <label>参加する</label>
                <input type="text" onChange={onChangeNickname} />
                <button onClick={submitNickname}>ニックネーム登録</button>
                <button onClick={updateMembers}>メンバー更新</button>
            </div>
        )
        case 1:
        return (
          <div>
            <input type="text" onChange={onChangeNickname} />
            <button onClick={submitNickname}>ニックネーム登録</button>
            <button onClick={updateMembers}>メンバー更新</button>
            <h1>room: {props.number}</h1>
            <MemberList members={members} />
          </div>
        )
    }
}