import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { store } from "../../App";
import "./Login.scss";

interface User {
  id: string;
  pw: string;
}

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  // state
  const [user, setUser] = useState<User>({
    id: "",
    pw: "",
  });
  const { id, pw } = user;

  // ref
  const pw_text = useRef<HTMLInputElement>(null);

  // event
  const onEyeClick = () => {
    if (pw_text.current!.type === "password") {
      pw_text.current!.type = "text";
    } else {
      pw_text.current!.type = "password";
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    console.log(`${[e.currentTarget.name]}: ${e.currentTarget.value}`);
  };

  /*
  const send = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        user,
      });
      // redux 사용
    } catch (e) {
      console.error(e);
    }
  };
  */

  // example
  const human = {
    username: "민경호",
    password: "qweqwe",
    email: "1736s@naver.com",
    userNickName: "민경호",
    cellphone: "01051301736",
    birth: "990210",
    gender: "true",
  };

  const login_action = (user: Record<string, string>, logged: Boolean) => {
    return {
      type: "LOGIN",
      payload: {
        user: user,
        logged: logged,
      },
    };
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(user);
    // axios
    // send()

    // example
    store.dispatch(login_action(human, true));
    history.push("/");
  };

  return (
    <div className="login_wrapper">
      <header>SLT</header>
      <form className="login" onSubmit={onSubmit}>
        <div className="id_pw_wrapper">
          <div className="id_wrapper">
            <i className="far fa-user icon"></i>
            <input
              name="id"
              placeholder="아이디"
              className="input"
              autoComplete="off"
              defaultValue={id}
              onChange={onChange}
            ></input>
          </div>
          <div className="pw_wrapper">
            <i className="fas fa-unlock-alt icon"></i>
            <input
              type="password"
              name="pw"
              placeholder="비밀번호"
              className="input"
              autoComplete="off"
              defaultValue={pw}
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
