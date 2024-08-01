import Login from "./pages/Login";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Attendance from "./pages/Attendance";
import Email from "./pages/Email";
import Password from "./pages/Password";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Main" element={<Main />} />
          <Route path="Main2" element={<Main2 />} />
          <Route path="Attendance" element={<Attendance />} />
          <Route path="Email" element={<Email />} />
          <Route path="Password" element={<Password />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
