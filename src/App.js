import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Navbar from "./Component/Navbar/Navbar";
import PrivateRoute from "./Component/PrivateRouter/PrivateRouter";
import AuthProvider from "./Context/Context";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
