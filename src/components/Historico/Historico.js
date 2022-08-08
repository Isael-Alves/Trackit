import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from '../../providers/auth';
import React from "react";

export default function Historico() {
  const { setScreen } = React.useContext(AuthContext);
  setScreen("historico");

  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}
