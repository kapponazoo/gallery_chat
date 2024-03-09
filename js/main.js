//firebase.jsからexportされているオブジェクトを
//main.jsでfirebaseConfigで扱うよという記述
import firebaseConfig from "./firebase.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, set, update, remove, onChildAdded, onChildRemoved ,onChildChanged } 
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dbRef = ref(db,"chat");

// 送信(#sendがクリックされたら
//(1)オブジェクト「msg」に格納する。

    $("#send").on("click",function(){
        const msg = {
        CreatorId : $("#CreatorId").val(),
        uname : $("#uname").val(),
        text : $("#text").val()
    }
//(2)newPostRefにユニークキーを設定してmsgとくっつける
    const newPostRef = push(dbRef); //ユニークキーを生成
    set(newPostRef,msg);
});



//チャットの結果



onChildAdded(dbRef,function(data){
    const msg = data.val();
    
    const key = data.key; //ユニークキーを取得。削除・更新に必須！
    let h = `<span id={key}>
    <p id="${key}_update"><span class="name"> ${msg.uname}：</span><span>${msg.text}</span>

  </p>
  `
    $("#creator01 .card-description").prepend(h);
    let creator01_star = "";
    creator01_star = '<img src="./images/star.png">';   
let s = creator01_star;

    $("#creator01_rate").prepend(s);

});

