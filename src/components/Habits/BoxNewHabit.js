import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { useState } from "react";

export default function BoxNewHabit({ myHabits, setMyHabits, setAddHabit, token }) {
  const [name, setName] = useState("");
  const daysWeek = [
    { name: "D", selected: false },
    { name: "S", selected: false },
    { name: "T", selected: false },
    { name: "Q", selected: false },
    { name: "Q", selected: false },
    { name: "S", selected: false },
    { name: "S", selected: false },
  ];
  const [selectedDay, setSelectedDay] = useState(daysWeek);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  function constForm() {
    const days = [];
    setLoading(true);

    selectedDay.map((day, i) => {
      if (day.selected === true) {
        days.push(i);
      }
      return days;
    });

    const body = {
      name,
      days,
    };

    if (name.length < 1 && days.length < 1) {
      alert("Digite o nome do hábito e escolha o(s) dia(s).");
      setLoading(false);
    }
    if (name.length < 1 && days.length > 0) {
      alert("Digite o nome do hábito.");
      setLoading(false);
    }
    if (name.length > 0 && days.length < 1) {
      alert("escolha o(s) dia(s).");
      setLoading(false);
    }
    if (name.length > 0 && days.length > 0) {
      submitForm(body);
      setLoading(false);
    }
  }

  function submitForm(body) {
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
      body,
      config
    );

    promise.then((res) => {
      setLoading(false);
      setAddHabit(false);
      // setMyHabits([...myHabits, res.data]);
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
      setLoading(false);
    });
  }

  function selected(id) {
    const newArray = selectedDay.map((dia, i) => {
      if (i === id) {
        return {
          ...dia,
          selected: !dia.selected,
        };
      }
      return {
        ...dia,
      };
    });
    setSelectedDay([...newArray]);
  }

  return (
    <BoxHabit>
      <input
        type="text"
        placeholder="nome do hábito"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        required
      />
      <ul>
        {selectedDay.map((day, i) => (
          <li
            id={i}
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
            onClick={() => {
              if (!loading) {
                selected(i);
              }
              return "";
            }}
          >
            {day.name}
          </li>
        ))}
      </ul>
      <div>
        <h5 onClick={() => setAddHabit(false)}>Cancelar</h5>
        <button onClick={() => constForm()}>
          {!loading ? (
            "Salvar"
          ) : (
            <ThreeDots color="#FFFFFF" height={20} width={70} />
          )}
        </button>
      </div>
    </BoxHabit>
  );
}

const BoxHabit = styled.section`
  margin: 0 auto;
  width: 340px;
  height: 180px;
  padding: 19px;
  margin-bottom: 10px;

  background: #ffffff;
  border-radius: 5px;

  input {
    width: 303px;
    height: 45px;
    padding: 9px 11px;
    margin-bottom: 8px;

    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    color: #dbdbdb;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }

  ul {
    display: flex;
    margin-bottom: 30px;

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

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    h5 {
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      margin-right: 23px;

      color: #52b6ff;
    }

    button {
      width: 84px;
      height: 35px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 400;
      font-size: 16px;
      line-height: 20px;

      border: none;
      color: #ffffff;
      background-color: #52b6ff;
      border-radius: 5px;
    }
  }
`;
