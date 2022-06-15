import React, { useEffect, useState } from "react";
import img from "../../Assets/image/avata.jpeg";
import mauDo from "../../Assets/image/do.png";
import mauXanh from "../../Assets/image/xanh.png";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import moment from "moment";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

function Users({ user, selectUser, user1, chat }) {
  //   console.log("user", user);
  //hiển thị thông báo tin nhắn mới trong user
  const user2 = user?.uid;
  const [data, setData] = useState("");
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  // console.log("data", data);
  //set tình trạng người dùng đang online hay ofline
  const islogin = user.isOnline;
  let tinhTrang;
  if (islogin === false) {
    tinhTrang = (
      <img
        className="Layout__Home-left-user-detail-img"
        src={mauDo}
        alt="..."
      />
    );
  } else {
    tinhTrang = (
      <img
        className="Layout__Home-left-user-detail-img"
        src={mauXanh}
        alt="..."
      />
    );
  }
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  //popup modal
  const PopupExample = () => (
    <Popup
      trigger={<i className="fa fa-align-justify"></i>}
      position="right center"
    >
      {(close) => (
        <div
          className="popup-container"
          style={{ color: "black", textAlign: "center" }}
        >
          <div
            className="popup-container-text"
            onClick={() => setOpen((o) => !o)}
          >
            <i class="fa fa-user-tie"></i>Thông tin cá nhân
          </div>
          <div className="popup-container-text">
            <i className="fa fa-trash-alt"></i>hủy
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    <div className="Layout__Home-left-user">
      <div
        className={`Layout__Home-left-user-detail ${
          chat.name === user.name && "selected_user"
        }`}
        onClick={() => selectUser(user)}
      >
        <img src={user.avatar || img} alt="..." />
        <h4>{user.name}</h4>

        {tinhTrang}
      </div>
      <div className="Layout__Home-left-user-icon">
        <PopupExample />
      </div>
      <div style={{ clear: "both" }}></div>
      <div className="Layout__Home-left-user-new">
        {data?.from !== user1 && data?.unread && <small>new</small>}
        <span className="Layout__Home-left-user-thongBao">
          <strong>{data.from === user1 ? "Me: " : null} </strong>
          {data.text}{" "}
        </span>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <div className="modal-text">
            <img src={user.avatar} alt="..." />
          </div>
          <div className="modal-text">Họ và tên : {user.name}</div>
          <div className="modal-text">
            Ngày sinh :{" "}
            {moment(user.ngaysinh.toDate()).subtract(10, "days").calendar()}
          </div>
          <div className="modal-text">Số điện thoại : {user.sdt}</div>
          <div className="modal-text">Mã code : {user.uid}</div>
        </div>
      </Popup>
    </div>
  );
}

export default Users;
