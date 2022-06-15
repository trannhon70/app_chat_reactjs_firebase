import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { auth, db } from "../../Firebase/Firebase";

function Navbar() {
  const { user } = useContext(AuthContext);
  const handleSignout = async () => {
    await updateDoc(doc(db, "user", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
  };
  return (
    <div className="layout__Navbar">
      <div className="layout__Navbar-Left">
        <Link className=" btn btn-white btn-animate" to="/">
          Messenger
        </Link>
      </div>

      {user ? (
        <div className="layout__Navbar-Right">
          <div className="layout__Navbar-Right-link">
            <Link className=" btn btn-white btn-animate" to="/profile">
              Hồ sơ
            </Link>
          </div>
          <div className="layout__Navbar-Right-link1">
            <Link
              to="/login"
              className=" btn btn-white btn-animate"
              onClick={handleSignout}
            >
              Đăng xuất
            </Link>
          </div>
        </div>
      ) : (
        <div className="layout__Navbar-Right">
          <div className="layout__Navbar-Right-link">
            <Link className=" btn btn-white btn-animate" to="/register">
              Đăng ký
            </Link>
          </div>
          <div className="layout__Navbar-Right-link1">
            <Link className=" btn btn-white btn-animate" to="/login">
              Đăng nhập
            </Link>
          </div>
        </div>
      )}

      <div style={{ clear: "both" }}></div>
    </div>
  );
}

export default Navbar;
