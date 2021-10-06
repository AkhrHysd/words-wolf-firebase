import {useState, useEffect} from 'react'
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import {db} from '../../components/fire'

export default function Add() {
    const [message, setMessage] = useState('add data')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [category, setCategory] = useState('')
    const router = useRouter()

    const onChangeA = ((e)=> {
        setA(e.target.value)
    })

    const onChangeB = ((e)=> {
        setB(e.target.value)
    })

    const onChangeCategory = ((e)=> {
        setCategory(e.target.value)
    })

    const doAction = ( async (e)=>{
        const ob = {
            a:a,
            b:b,
            category:category,
        }

        const docRef = await addDoc(collection(db, "words"),ob)
        console.log('write', docRef.id)
        router.push('/fire')
    })
    
    return (
        <div>
            <h5>{message}</h5>
            <div>
                <label>お題A:</label>
                <input type="text" onChange={onChangeA} />
            </div>
            <div>
                <label>お題B:</label>
                <input type="text" onChange={onChangeB} />
            </div>
            <div>
                <label>カテゴリー:</label>
                <input type="text" onChange={onChangeCategory} />
            </div>
            <button onClick={doAction}>追加する</button>
        </div>
    )
}