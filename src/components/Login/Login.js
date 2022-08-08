import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import logo from "../../assets/img/Group 8.svg";
import { Button, Body, Form } from "../../styles/loginStyle";

function Login() {
  const {setDados} = React.useContext(AuthContext); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handForm(e) {
    if (!loading) {
      setLoading(true);
      e.preventDefault();
      const body = {
        email,
        password,
      };

      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`,
        body
      );

      promise.then((res) => {
        setDados(res.data);
        navigate(`../hoje`);
        setEmail("");
        setPassword("");
        setLoading(false);
      });

      promise.catch((err) => {
        const message = err.response.statusText;
        alert(message);
        setEmail("");
        setPassword("");
        setLoading(false);
      });
    }
  }

  return (
    <Body>
      <img src={logo} alt="Logo" />
      <Form onSubmit={handForm}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        ></input>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="senha"
          value={password}
          required
        ></input>
        <Button>
          {!loading ? (
            "Entrar"
          ) : (
            <ThreeDots color="#FFFFFF" height={20} width={70} />
          )}
        </Button>
      </Form>
      <h5 onClick={() => navigate(`../registration`)}>
        Não tem uma conta? Cadastre-se!
      </h5>
    </Body>
  );
}

export default Login;
