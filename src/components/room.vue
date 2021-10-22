<template>
  <div>
    <h1>room: {{ roomid }}</h1>
    <label>参加する</label>
    <input type="text" v-model="state.tempName" />
    <button @click="submitName">ニックネーム登録</button>
    <ul v-if="state.member">
        <li v-for="person in state.member" :key="person.id">
            {{person}}
        </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, onBeforeUnmount } from "vue";
import { db } from "../components/fire";
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
    },
  },
  setup({ roomid }) {
    const state = reactive({
      member: [],
      tempName: "",
    });




    onMounted( () => {
      const userQuery = query(collection(db, "users"), where("roomid", "==", roomid))
        
      const unsub = onSnapshot(userQuery, (doc) => {
            doc.forEach((dd) => {
                console.log(dd)
            })
        })
    });


    const submitName = async () => {
        const ob = {
          name: state.tempName,
          roomid: roomid,
          status: 0,
          hanged: 0,
        }
        await addDoc(collection(db, "users"), ob)
    }

    const fetchUsers = async () => {
      const q = query(collection(db, "users"), where("roomid", "==", roomid));
      const querySnapshot = await getDocs(q);
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.data());
      });
      return user;
    };


    return {
        submitName,
        state,
    }
  },
});
</script>
