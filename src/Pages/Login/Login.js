import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log(data);
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "Tất cả các trường không được bỏ trống" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //   console.log(result.user);
      await updateDoc(doc(db, "user", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      alert("Đăng nhập thành công !");
      navigate("/");
    } catch (err) {
      // setData({ ...data, error: err.message, loading: false });
      alert("email hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className="Layout__Register">
      <div className="Layout__Register-Left">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="Layout__Register-Left-text">
          <button>Đăng nhập bằng facebook</button>
        </div>
        <br />
        <div className="Layout__Register-Left-text1">
          <button>Đăng nhập bằng google</button>
        </div>
      </div>
      <div className="Layout__Register-Right">
        <h1>Đăng nhập tài khoản</h1>
        <form className="Layout__Register-Right-form" onSubmit={handleSubmit}>
          <div className="Layout__Register-Right-form-container">
            <div>Email: </div>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div>Password: </div>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {error ? <p style={{ color: "#ff00008f" }}>{error}</p> : null}
          <div className="Layout__Register-Right-form-container" style={{textAlign:'center'}}>
            <button className="Layout__Register-button" disabled={loading}>
              {loading ? "loading in..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
