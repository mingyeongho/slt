import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./Modify.scss";

const Modify = ({ history, match }) => {
  const { id } = match.params;
  // state
  const [user, setUser] = useState({
    userNickName: "",
    password: "",
    cellPhone: "",
    eMail: "",
  });
  const { userNickName, password, cellPhone, eMail } = user;

  // useEffect (Mount)
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/modifyMember/${id}`
        );
        setUser({
          ...user,
          userNickName: res.data.userNickName,
          username: res.data.username,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, [id, user]);

  // post: user/modifyInfo/{id}
  const onSubmit = (e) => {
    e.preventDefault();
    const send = async () => {
      try {
        axios.post(
          `http://localhost:5000/modifyInfo/${id}`,
          { user },
          {
            headers: {
              Authorization: sessionStorage
                .getItem("authorization")
                ?.substring(
                  1,
                  sessionStorage.getItem("authorization").length - 1
                ),
            },
          }
        );
        history.push("/user/main");
      } catch (e) {
        console.error(e);
      }
    };
    send();
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modify_wrapper">
      <div className="logo">
        <img
          src={logo}
          alt="logo"
          onClick={() => window.location.replace("/user/main")}
        ></img>
      </div>
      <form className="modify" onSubmit={onSubmit}>
        <div className="modify_detail">
          <div className="name_wrapper">
            <i className="fas fa-signature icon"></i>
            <input
              className="input"
              name="userNickName"
              value={userNickName}
              onChange={onChange}
              autoComplete="off"
              placeholder="이름"
            ></input>
          </div>
          <div className="id_wrapper">
            <i className="fas fa-portrait icon"></i>
            <input
              className="input"
              name="username"
              disabled
              placeholder="아이디"
            ></input>
          </div>
          <div className="pw_wrapper">
            <i className="fas fa-key icon"></i>
            <input
              type="password"
              className="input"
              name="password"
              value={password}
              onChange={onChange}
              autoComplete="off"
              placeholder="비밀번호"
            ></input>
            <i className="fas fa-eye icon_eye"></i>
          </div>
          <div className="phone_wrapper">
            <i className="fas fa-phone icon"></i>
            <input
              className="input"
              name="cellPhone"
              value={cellPhone}
              onChange={onChange}
              autoComplete="off"
              placeholder="전화번호 예)01012345678"
            ></input>
          </div>
          <div className="email_wrapper">
            <i className="fas fa-at icon"></i>
            <input
              className="input"
              name="eMail"
              value={eMail}
              onChange={onChange}
              autoComplete="off"
              placeholder="이메일 예) 123123@abc.com"
            ></input>
          </div>
          <div className="birth_wrapper">
            <i className="fas fa-birthday-cake icon"></i>
            <input
              className="input"
              name="birth"
              autoComplete="off"
              placeholder="생일 예) 0000-00-00"
              disabled
            ></input>
          </div>
          <div className="gender_wrapper">
            <i className="fas fa-venus-mars icon"></i>
            <select name="gender" className="input" disabled>
              <option value="default">-선택-</option>
              <option value="true">남성</option>
              <option value="false">여성</option>
            </select>
          </div>
        </div>
        <button className="modifyBtn">수정</button>
      </form>
    </div>
  );
};

export default Modify;
