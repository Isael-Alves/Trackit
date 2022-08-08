import styled from "styled-components";
import * as dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/auth";
import { useNavigate } from "react-router-dom";

export default function Today() {
  const { dados, setScreen } = React.useContext(AuthContext);
  setScreen("hoje");
  const { token } = dados;
  const [habitsToday, setHabitsToday] = useState([]);
  const [percent, setPercent] = useState(null);
  const navigate = useNavigate();
  const body = {};

  function checkLoggedUser() {
    if (token === undefined) {
      navigate("../");
      window.location.reload();
    }
  }
  checkLoggedUser();

  const URL =
    "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function renderHabits() {
    const promise = axios.get(`${URL}today`, config);

    promise.then((res) => {
      setHabitsToday(res.data);
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });
  }

  useEffect(() => {
    renderHabits();
  }, []);

  function uncheckHabit(id) {
    const promise = axios.post(`${URL}${id}/uncheck`, body, config);

    promise.then(() => {
      renderHabits();
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });
  }

  function checkHabit(id) {
    const promise = axios.post(`${URL}${id}/check`, body, config);

    promise.then(() => {
      renderHabits();
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });
  }

  function CriandoSubText() {
    let cont = 0;
    const qtdHabits = habitsToday.length;
    let porcento = (cont / qtdHabits) * 100;
    console.log(habitsToday);

    useEffect(() => {
      setPercent(porcento);
    },[porcento]);

    if (qtdHabits > 0 && porcento !== 0) {
      habitsToday.forEach((habit) => {
        if (habit.done) {
          cont = cont + 1;
        }
      });

      porcento = (cont / qtdHabits) * 100;

      return (
        <h2 style={{ color: "#8FC549" }}>{porcento}% dos hábitos concuidos</h2>
      );
    }

    return <h2> Nenhum hábito concluído ainda </h2>;
  }

  function StructuringHabits() {
    if (habitsToday.length > 0) {
      return habitsToday.map((habit) => {
        const { id, name, done, currentSequence, highestSequence } = habit;
        return (
          <li key={id} id={id}>
            <section>
              <h3>{name}</h3>
              <h4>
                Sequência atual:{" "}
                <span
                  style={
                    currentSequence === highestSequence
                      ? { color: "#8FC549" }
                      : { color: "#666666" }
                  }
                >
                  {currentSequence} dia(s)
                </span>
              </h4>
              <h4>Seu recorde: {highestSequence} dias</h4>
            </section>
            <div
              style={
                done
                  ? { backgroundColor: "#8FC549" }
                  : { backgroundColor: "#EBEBEB" }
              }
              onClick={() => {
                done ? uncheckHabit(id) : checkHabit(id);
              }}
            >
              <FaCheck />
            </div>
          </li>
        );
      });
    }
    return <h1>Nenhum hábito para hoje</h1>;
  }

  function todayDay() {
    const today = dayjs();
    const day = today.date();
    const month = today.month();
    return `Segunda, ${day}/${month}`;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Title>
          <h1>{todayDay()}</h1>
          <CriandoSubText />
        </Title>
        <Habits>{StructuringHabits()}</Habits>
      </Container>
      <Footer percent={(percent !== null) ? percent : ""} />
    </>
  );
}

const Container = styled.nav`
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  padding: 16px;
`;

const Title = styled.header`
  margin-top: 90px;
  margin-bottom: 20px;
  h1 {
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;

    color: #126ba5;
  }
  h2 {
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #bababa;
  }
`;

const Habits = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    width: 340px;
    height: 94px;
    padding: 15px;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #ffffff;
    border-radius: 5px;

    h3 {
      margin-bottom: 7px;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;

      color: #666666;
    }

    h4 {
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;

      color: #666666;
    }

    div {
      width: 69px;
      height: 69px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #e7e7e7;
      border-radius: 5px;

      svg {
        width: 35px;
        height: 28px;
        color: #ffffff;
      }
    }
  }
`;
