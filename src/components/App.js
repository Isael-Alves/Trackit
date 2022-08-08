import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Login/Registration";
import Today from "./Today/Today";
import Habits from "./Habits/Habits";
import Historico from "./Historico/Historico";
import GlobalStyle from "../styles/globalStyles";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="hoje" element={<Today />} />
          <Route path="habitos" element={<Habits />} />
          <Route path="historico" element={<Historico />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
