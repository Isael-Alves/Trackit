import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Historico() {
  const { dados, setScreen } = React.useContext(AuthContext);
  const { token } = dados;
  const [hist, setHist] = useState([]);
  const navigate = useNavigate();
  setScreen("historico");

  function checkLoggedUser() {
    if (token === undefined) {
      navigate("../");
    }
  }
  checkLoggedUser();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`,
      config
    );

    promise.then((res) => {
      setHist(res.data);
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });
  }, []);

  function rendHistori() {
    console.log(hist);
    if (hist.length > 0) {
      return (
        <ul>
          {hist.map((habit, i) => {
            const { day, habits } = habit;
            return (
              <li key={i}>
                <h2>{day}</h2>
                {habits.map((value) => {
                  const { id, name, weekDay } = value;
                  return (
                    <div key={id} id={id}>
                      <h3>{name}</h3>
                      <h3>{weekDay}</h3>
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      );
    }
    return <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>;
  }

  return (
    <>
      <Navbar />
      <Historic>
        <h1>Histórico</h1>
        {rendHistori()}
      </Historic>
      <Footer />
    </>
  );
}

const Historic = styled.nav`
  margin-top: 80px;
  width: 100%;
  height: 100%;
  padding: 15px;

  h1 {
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;

    color: #126ba5;
  }

  h2 {
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    color: #666666;
  }
  ul {
    li {
      margin-bottom: 30px;

      div {
        width: 340px;
        height: 40px;
        margin-bottom: 10px;
        padding: 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background: #ffffff;
        border-radius: 5px;

        h3 {
          font-weight: 400;
          font-size: 16px;
          line-height: 25px;

          color: #666666;
        }
      }
    }
  }
`;
