<template>
  <div>
      <h1>{{message}}</h1>
      <template  v-if="!state.roomId">
        <button @click="createRoom">ルームを作成する</button>
        <div>
          <label>入室する</label>
          <input type="number" :value="state.roomNumberTemp" />
          <button @click="enterRoom">入室する</button>
        </div>
      </template>
      <template v-else>
        <Room :roomid="state.roomId" />
      </template>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, watchEffect, onMounted } from 'vue'
import { doc, collection, addDoc, setDoc, getDocs, getDoc, query, where, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from './components/fire.js'
import Room from "./components/room.vue"

export default defineComponent({
  components: {
    Room,
  },
  setup() {
    
    const message = "word wolf";

    const state = reactive({
      roomId: null,
      roomNumber: "",
      roomNumberTemp: "",
      status: 0,

    })

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
      const docRef = await setDoc(doc(db, "rooms", String(roomNumber)), ob)
      state.roomId = String(roomNumber)
      state.roomNumber = roomNumber
      state.status = 0
      console.log(state.roomId)
    })


  const enterRoom = ( () => {
    state.roomId = String(state.roomNumberTemp);
  })

    // const enterRoom = ( () => {
    //   setRoomNumber(roomNumberTemp)
    //   setRoomId(String(roomNumberTemp))
    // })

    return {
      message,
      state,
      createRoom,
    }
  }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
