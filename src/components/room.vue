<template>
    <div>
        room
    </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from 'vue'
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
} from "firebase/firestore";

export default defineComponent({
    props: {
        roomid: {
            type: String,
            required: true,
        }
    },
    setup({roomid}) {
        const state = reactive({
            member: [],
        })

        onMounted( async () => {
            member = await fetchUsers()
        })

        const fetchUsers = ( async () => {
            const q = query(collection(db, "users"), where("roomid", "==", roomid))
            const querySnapshot = await getDocs(q)
            const user = []
            querySnapshot.forEach((doc) => {
                user.push(doc.data())
            })
            return user
        })
        
    },
})
</script>
