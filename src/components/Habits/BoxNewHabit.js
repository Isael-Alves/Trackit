import styled from "styled-components";
import { useState } from "react";

export default function BoxNewHabit({ setAddHabit }) {
  const daysWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [selectedDay, setSelectedDay] = useState(false);

  return (
    <BoxHabit>
      <input placeholder="nome do hábito" />
      <ul>
        {daysWeek.map((day, i) => (
          <li
            key={i}
            style={
              selectedDay
                ? {
                    backgroundColor: "#CFCFCF",
                    color: "#FFFFFF"
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    color: "#dbdbdb"
                  }
            }
            onClick={() => setSelectedDay(!selectedDay)}
          >
            {day}
          </li>
        ))}
      </ul>
      <div>
        <h5 onClick={() => setAddHabit(false)}>Cancelar</h5>
        <button>Salvar</button>
      </div>
    </BoxHabit>
  );
}

const BoxHabit = styled.section`
  margin: 0 auto;
  width: 340px;
  height: 180px;
  padding: 19px;

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

      font-weight: 400;
      font-size: 16px;
      line-height: 20px;

      border: none;
      color: #ffffff;
      background: #52b6ff;
      border-radius: 5px;
    }
  }
`;
