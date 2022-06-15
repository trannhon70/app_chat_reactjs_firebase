import { Fragment, useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../Firebase/Firebase";
import Users from "./../../Component/Users/Users";
import MessengerForm from "./../../Component/MessengerForm/MessengerForm";
import Message from "../../Component/Message/Message";

function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [imgRef, setImgRef] = useState("");
  const [msgs, setMsgs] = useState([])
  //thực hiện render hình ảnh lại khi upload hình ảnh
  const changeFile = (e) => {
    setImg(e.target.files[0]);
    const file = e.target.files[0];
    // console.log('file',file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.log('e', e.target.result);
      setImgRef(e.target.result);
    };
  };
  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, "user");
    // console.log('usersRef', usersRef);
    //create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // console.log('1',q);
    //executer query
    const unsub = onSnapshot(q, (querySnapshot) => {
      const user = [];
      querySnapshot.forEach((doc) => {
        user.push(doc.data());
      });
      setUsers(user);
    });
    return () => unsub();
  }, []);
  const selectUser = async (user) => {
    setChat(user);
    
    //load dữ liệu tin nhắn từ file base 
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgsRef = collection(db, 'message', id , 'chat');
    const q = query(msgsRef, orderBy('createAt','asc'));
    onSnapshot(q,querySnapshot =>{
      let msgs = [];
      querySnapshot.forEach(doc =>{
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    });

    const docSnap = await getDoc(doc(db,'lastMsg',id));
    if(docSnap.data() && docSnap.data()?.from !== user1){
      await updateDoc(doc(db,'lastMsg',id),{unread:false});
    }
  };
  // console.log('msgs',msgs);
  //   useEffect(()=> {
  //     console.log('img change', img);
  //   }, [img])
  //   useEffect(() => {
  //     console.log("chat vừa thay đổi", chat);
  //   }, [chat]);
  


  //thực hiện lưu dữ liệu khi use nt với nhau 
  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log(e);
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    //upload image
    let Url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      Url = dlUrl;
    }
    await addDoc(collection(db, "message", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createAt: Timestamp.fromDate(new Date()),
      media: Url || "",
    });
    await setDoc(doc(db, 'lastMsg',id), {
      text,
      from: user1,
      to: user2,
      createAt: Timestamp.fromDate(new Date()),
      media: Url || "",
      unread: true,
    })
    setText("");
    setImgRef("");
    
  };
  return (
    <div className="Layout__Home">
      <div className="Layout__Home-left" id="user">
        {users.map((user) => (
          <Users key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat} />
        ))}
      </div>
      <div className="Layout__Home-right">
        {chat ? (
          <Fragment>
            <div id="messenger"  className="Layout__Home-right-messenger">
              <h4>{chat.name}</h4>
              
              {msgs.length ? msgs.map((msg,i) =><Message key={i} msg={msg} user1={user1} />) : null}
              
            </div>
           
            <MessengerForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
              img={img}
              changeFile={changeFile}
              imgRef={imgRef}
            />
          </Fragment>
        ) : (
          <div className="Layout__Home-right-noMessenger">
            chọn một người dùng để trò chuyện
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
