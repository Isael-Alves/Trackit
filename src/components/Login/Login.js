import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Group 8.svg";
import { Button, Body, Form } from "../../styles/loginStyle";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handForm(e) {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    console.log(body);

    setEmail("");
    setPassword("");
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
        <Button>Entrar</Button>
      </Form>
      <h5 onClick={() => navigate(`../registration`)}>
        Não tem uma conta? Cadastre-se!
      </h5>
    </Body>
  );
}

export default Login;
