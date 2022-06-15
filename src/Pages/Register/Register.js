import React, { Fragment, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

function Register() {
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate);
  const navigate = useNavigate();
  //thêm image vào Storage
  const [img, setImg] = useState(null);
  console.log(img);
  //thực hiện render lại khi upload hình ảnh lên
  const changeFile = async (e) => {
    // console.log(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImg(e.target.result);
    };
  };

  //thêm user vào database
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    diaChi: "",
    sdt: "",
    ngaysinh: Date,
    error: null,
    loading: false,
  });
  const { name, email, password, diaChi, sdt, ngaysinh, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   console.log(data);
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password || !diaChi || !sdt) {
      setData({ ...data, error: "Tất cả các trường không được bỏ trống" });
    }

    //thêm dữ liệu vào database
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        diaChi,
        sdt,
        ngaysinh
      );
      //   console.log(result.user);

      await setDoc(doc(db, "user", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        diaChi,
        sdt,
        ngaysinh: startDate,
        createAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        diaChi: "",
        sdt: "",
        ngaysinh: startDate,
        error: null,
        loading: false,
      });
      alert("Đăng ký tài khoản thành công !");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
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
        <h1>Đăng ký tài khoản</h1>
        <form className="Layout__Register-Right-form" onSubmit={handleSubmit}>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              Họ và tên:{" "}
            </div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              Email:{" "}
            </div>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              mật khẩu:{" "}
            </div>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              Địa chỉ:{" "}
            </div>
            <input
              name="diaChi"
              type="diaChi"
              value={diaChi}
              onChange={handleChange}
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              Ngày sinh:{" "}
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              
            />
          </div>
          <div className="Layout__Register-Right-form-container">
            <div className="Layout__Register-Right-form-container-text">
              Số điện thoại:{" "}
            </div>
            <input
              name="sdt"
              type="number"
              value={sdt}
              onChange={handleChange}
            />
          </div>
          <Fragment className="Layout__Register-Right-form-container">
            <label
              htmlFor="img"
              className="Layout__Register-Right-form-container-label"
            >
              <i className="fa fa-camera"></i>
            </label>
            <input
              name="hinhAnh"
              id="img"
              value=""
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={changeFile}
            />
            <img className="Layout__Register-Right-form-container-img" src={img} style={{ widows: "130px !important" }} alt="..." />
          </Fragment>
          {error ? <p style={{ color: "#ff00008f" }}>{error}</p> : null}
          <div
            className="Layout__Register-Right-form-container"
            style={{ textAlign: "center" }}
          >
            <button className="Layout__Register-button" disabled={loading}>
              {loading ? "loading in..." : "Đăng ký"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
