import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../providers/auth";
import { useState } from "react";

export default function Footer() {
  const { screen } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const percentage = 55;
  return (
    <BoxFooter>
      <h2
        onClick={() => {
          if (screen === "habitos") {
            return "";
          }
          navigate(`../habitos`);
        }}
      >
        Hábitos
      </h2>

      <div
        onClick={() => {
          if (screen === "hoje") {
            return "";
          }
          navigate(`../hoje`);
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`hoje`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            textColor: "#FFFFFF",
            pathColor: "#FFFFFF",
            trailColor: "transparent",
            backgroundColor: "#52B6FF",
          })}
        />
      </div>

      <h2
        onClick={() => {
          if (screen === "historico") {
            return "";
          }
          navigate(`../historico`);
        }}
      >
        Histórico
      </h2>
    </BoxFooter>
  );
}

const BoxFooter = styled.footer`
  position: fixed;
  width: 100%;
  height: 70px;
  padding: 0 32px;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ffffff;

  h2 {
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;

    color: #52b6ff;
  }
  div {
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    border-radius: 50%;
  }
`;
