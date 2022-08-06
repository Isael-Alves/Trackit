import Navbar from "../Navbar";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import BoxNewHabit from "./BoxNewHabit";

export default function Habits() {
  const [addHabit, setAddHabit] = useState(false);
  const [myHabits, setMyHabits] = useState([]);
  const daysWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  useEffect(() => {
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc0NiwiaWF0IjoxNjU5NTg3Mzg3fQ.DK3brEQ_wc1OPtL601VuUZa9UZ_6gwtVqvGtw_1kthY",
      },
    };

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

  function renderHabits() {
    if (myHabits.length > 0) {
      console.log(myHabits);
      return (
        <ul>
          {myHabits.map((habit) => {
            return (
              <Habit id={habit.id} key={habit.id}>
                <div>
                  <h2>{habit.name}</h2>
                  <ul>
                    {daysWeek.map((day, i) => (
                      <li
                        key={i}
                        style={
                          day.selected
                            ? {
                                backgroundColor: "#CFCFCF",
                                color: "#FFFFFF",
                              }
                            : {
                                backgroundColor: "#FFFFFF",
                                color: "#dbdbdb",
                              }
                        }
                      >
                        {day}
                      </li>
                    ))}
                  </ul>
                </div>
                <BsTrash />
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
      {!addHabit ? "" : <BoxNewHabit setAddHabit={setAddHabit} />}
      {renderHabits()}
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
