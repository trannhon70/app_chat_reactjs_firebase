import React, { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import DeleteAvata from "../../Component/DeleteAvata/DeleteAvata";
import xanh from "../../Assets/image/xanh.png";
import moment from "moment";

function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  //   console.log(img);
  useEffect(() => {
    getDoc(doc(db, "user", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );

        try {
          //xóa avatar củ khi tải avatar mới lên
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          //tải img lên trong user
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "user", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");

          // console.log(snap.ref.fullPath);
          //console.log(url);
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  //xóa avatar
  const deleteImage = async () => {
    try {
      const confirm = window.confirm("bạn có muốn xóa avatar");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, "user", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        //sau khi xóa hình ảnh thành công thì sẽ tự động reload lại
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return user ? (
    <div className="Layout__Profile">
      <div className="card">
        <div className="container">
          <img src={user.avatar} alt="Person" className="card__image" />
          <div className="middle">
            <div className="text">
              <label
                htmlFor="photo"
                style={{ cursor: "pointer", paddingRight: "15px" }}
              >
                <i className="fa fa-camera"></i>
              </label>
              {user.avatar ? <DeleteAvata deleteImage={deleteImage} /> : null}
              <input
                type="file"
                accept="image/*"
                id="photo"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        <p className="card__name">
          <img src={xanh} alt="..." /> {user.name}
        </p>
        <div className="grid-container">
          <div style={{ textAlign: "end" }} className="grid-child-posts">
            Email :
          </div>
          <div className="grid-child-followers">{user.email}</div>
        </div>

        <div className="grid-container">
          <div style={{ textAlign: "end" }} className="grid-child-posts">
            Địa chỉ :
          </div>
          <div className="grid-child-followers">{user.diaChi}</div>
        </div>
        <div className="grid-container">
          <div style={{ textAlign: "end" }} className="grid-child-posts">
            Số điện thoại :
          </div>
          <div className="grid-child-followers">{user.sdt}</div>
        </div>
        <div className="grid-container">
          <div style={{ textAlign: "end" }} className="grid-child-posts">
            Ngày sinh :
          </div>
          <div className="grid-child-followers">
            {moment(user.ngaysinh.toDate()).subtract(10, "days").calendar()}
          </div>
        </div>
        <div className="grid-container">
          <div style={{ textAlign: "end" }} className="grid-child-posts">
            Ngày cập nhật :
          </div>
          <div className="grid-child-followers">
            {moment(user.createAt.toDate()).subtract(10, "days").calendar()}
          </div>
        </div>

        <ul className="social-icons">
          <li>
            <a href="/">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fab fa-codepen"></i>
            </a>
          </li>
        </ul>
        <button className="btn draw-border">Follow</button>
        <button className="btn draw-border">Message</button>
      </div>
    </div>
  ) : null;
}

export default Profile;
