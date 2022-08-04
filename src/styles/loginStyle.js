import styled from "styled-components";

const Body = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 68px;
    width: 180px;
    height: 180px;
  }

  h5 {
    margin-top: 25px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-decoration-line: underline;

    color: #52b6ff;
  }
`;

const Form = styled.form`
  margin-top: 33px;

  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    padding: 11px;

    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;

    ::placeholder {
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;

      color: #dbdbdb;
    }
  }
`;

const Button = styled.button`
  width: 303px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 21px;
  line-height: 26px;

  background: #52b6ff;
  color: #ffffff;
  border-radius: 5px;
`;

export { Body, Form, Button };
