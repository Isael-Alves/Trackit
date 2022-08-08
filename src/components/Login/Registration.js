import logo from "../../assets/img/Group 8.svg";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Body, Form } from "../../styles/loginStyle";

function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const clearForm = {
    email: "",
    password: "",
    name: "",
    image: "",
  };
  const [form, setForm] = useState(clearForm);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function sendForm(e) {
    if (!loading) {
      e.preventDefault();
      setLoading(true);
      const body = {
        ...form,
      };

      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`,
        body
      );

      promise.then((res) => {
        alert("Usuário criado com sucesso!");
        navigate(`../`);
        setForm(clearForm);
        setLoading(false);
      });

      promise.catch((err) => {
        const message = err.response.statusText;
        alert(message);
        setForm(clearForm);
        setLoading(false);
      });
    }
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
          type="image"
          alt=""
          name="image"
          placeholder="foto"
          onChange={handleForm}
          value={form.image}
          required
        ></input>
        <Button>
          {!loading ? (
            "Cadastrar"
          ) : (
            <ThreeDots color="#FFFFFF" height={20} width={70} />
          )}
        </Button>
      </Form>
      <h5 onClick={() => navigate(`../`)}>Não tem uma conta? Cadastre-se!</h5>
    </Body>
  );
}

export default Registration;
