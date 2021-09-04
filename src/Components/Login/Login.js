import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../App";
import Header from "../Header/Header";
import "./Login.scss";

const Login = ({ history }) => {
  // state
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;

  // ref
  const pw_text = useRef(null);

  // event
  const onEyeClick = () => {
    if (pw_text.current.type === "password") {
      pw_text.current.type = "text";
    } else {
      pw_text.current.type = "password";
    }
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    console.log(`${[e.currentTarget.name]}: ${e.currentTarget.value}`);
  };

  const login_action = (authorization, logged) => {
    return {
      type: "LOGIN",
      payload: {
        authorization: authorization,
        logged: logged,
      },
    };
  };

  // regex

  const send = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      // error
      console.log(res);
      // redux 사용
      store.dispatch(login_action(res.headers.authorization, true));
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    // axios
    send();
    history.push("/");
  };

  return (
    <div className="login_wrapper">
      <Header></Header>
      <form className="login" onSubmit={onSubmit}>
        <div className="id_pw_wrapper">
          <div className="id_wrapper">
            <i className="far fa-user icon"></i>
            <input
              name="username"
              placeholder="아이디"
              className="input"
              autoComplete="off"
              defaultValue={username}
              onChange={onChange}
            ></input>
          </div>
          <div className="pw_wrapper">
            <i className="fas fa-unlock-alt icon"></i>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className="input"
              autoComplete="off"
              defaultValue={password}
              onChange={onChange}
              ref={pw_text}
            ></input>
            <i className="fas fa-eye icon_eye" onClick={onEyeClick}></i>
          </div>
        </div>
        <button type="submit" className="loginBtn">
          로그인
        </button>
      </form>
      <div className="find_join_wrapper">
        <Link to="/find_pw" className="link">
          비밀번호 찾기
        </Link>
        <Link to="/find_id" className="link">
          아이디 찾기
        </Link>
        <Link to="/join" className="link">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
