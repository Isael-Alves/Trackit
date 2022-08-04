import logo from "../../assets/img/Group 8.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Body, Form } from "../../styles/loginStyle";

function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    photo: "",
  });

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function sendForm(e) {
    e.preventDefault();
    const body = {
      ...form,
    };
    console.log(body);
    navigate(`../`);
    setForm({
      email: "",
      password: "",
      name: "",
      photo: "",
    });
  }

  return (
    <Body>
      <img src={logo} alt="Logo" />
      <Form onSubmit={sendForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleForm}
          value={form.email}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="senha"
          onChange={handleForm}
          value={form.password}
          required
        ></input>
        <input
          type="text"
          name="name"
          placeholder="nome"
          onChange={handleForm}
          value={form.name}
          required
        ></input>
        <input
          type="text"
          name="photo"
          placeholder="foto"
          onChange={handleForm}
          value={form.photo}
          required
        ></input>
        <Button>Cadastrar</Button>
      </Form>
      <h5 onClick={() => navigate(`../`)}>Não tem uma conta? Cadastre-se!</h5>
    </Body>
  );
}

export default Registration;
