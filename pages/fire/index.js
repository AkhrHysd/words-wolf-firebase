import {useState, useEffect} from 'react'
import {db} from '../../components/fire'
import { collection, getDocs, setDoc } from "firebase/firestore";

export default function Home() {
    const mydata = []
    const [data, setData] = useState(mydata);
    const [message, setMessage] = useState('//wait...')
    const md = collection(db, 'words');

    useEffect(()=> {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "words"));
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                mydata.push(
                    <tr key={doc.id}>
                        <td>{data.a}</td>
                        <td>{data.b}</td>
                        <td>{data.category}</td>
                    </tr>
                )
            })
            setData(mydata)
            setMessage('firebase data.')
        }
        fetchData()
    }, [])

    return(
        <div>
            <h4>{message}</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>お題A</th>
                        <th>お題B</th>
                        <th>カテゴリ</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        </div>
    )
}