import Navbar from "../Navbar";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { AuthContext } from "../../providers/auth";
import axios from "axios";
import BoxNewHabit from "./BoxNewHabit";
import Footer from "../Footer/Footer";

export default function Habits() {
  const { dados, setScreen } = React.useContext(AuthContext);
  const { token } = dados;
  setScreen("habitos");
  const [addHabit, setAddHabit] = useState(false);
  const [myHabits, setMyHabits] = useState([]);
  const daysWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
      config
    );

    promise.then((res) => {
      setMyHabits(res.data);
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });
  }, []);

  function escolherCor(habit, i) {
    if (habit.days.some((d) => d === i)) {
      return {
        backgroundColor: "#CFCFCF",
        color: "#FFFFFF",
      };
    }
    return {
      backgroundColor: "#FFFFFF",
      color: "#dbdbdb",
    };
  }

  function deleteHabit(id) {
    const confirmar = window.confirm("Você tem certeza que deseja apagar?");
    if (confirmar) {
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );

      promise.then(() => {
        setAddHabit(false);
      });

      promise.catch((err) => {
        const message = err.response.statusText;
        alert(message);
      });
    }
  }

  function renderHabits() {
    if (myHabits.length > 0) {
      return (
        <ul>
          {myHabits.map((habit) => {
            return (
              <Habit id={habit.id} key={habit.id}>
                <div>
                  <h2>{habit.name}</h2>
                  <ul>
                    {daysWeek.map((day, i) => (
                      <li key={i} style={escolherCor(habit, i)}>
                        {day}
                      </li>
                    ))}
                  </ul>
                </div>
                <BsTrash onClick={() => deleteHabit(habit.id)} />
              </Habit>
            );
          })}
        </ul>
      );
    }
    return (
      <Message>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </Message>
    );
  }

  return (
    <>
      <Navbar />
      <Title>
        <h1>Meus hábitos</h1>
        <div>
          <MdAdd onClick={() => setAddHabit(true)} />
        </div>
      </Title>
      {!addHabit ? (
        ""
      ) : (
        <BoxNewHabit setAddHabit={setAddHabit} myHabits={myHabits} token={token} />
      )}
      {renderHabits()}
      <Footer />
    </>
  );
}

const Title = styled.header`
  margin-top: 75px;
  padding: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;

    color: #126ba5;
  }
  div {
    width: 40px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #52b6ff;
    border-radius: 5px;

    svg {
      width: 20px;
      height: 20px;

      color: #ffffff;
    }
  }
`;

const Habit = styled.li`
  margin: 0 auto;
  width: 340px;
  height: 91px;
  margin-bottom: 10px;
  padding: 15px;

  display: flex;
  justify-content: space-between;

  background-color: #ffffff;
  border-radius: 5px;

  h2 {
    margin-bottom: 8px;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    color: #666666;
  }

  ul {
    display: flex;

    li {
      width: 30px;
      height: 30px;
      margin-right: 4px;

      font-weight: 400;
      font-size: 20px;
      line-height: 25px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #d5d5d5;
      border-radius: 5px;
    }
  }
`;

const Message = styled.h1`
  padding: 17px;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  color: #666666;
`;
