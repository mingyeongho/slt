import "./Manager.scss";
import { Fragment, useEffect, useState } from "react";
import MyContent from "../MyContent/MyContent";
import axios from "axios";
import qs from "qs";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Header from "../Header/Header";

const Manager = ({ location, history }) => {
  // query
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { status, page } = query;

  // state
  const [manager, setManager] = useState({});
  const [list, setList] = useState([]);
  const [paging, setPaging] = useState({});

  // useEffect
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/manager/main?status=${
            status === undefined ? "hold" : status
          }&page=${page === undefined ? 1 : page}`,
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
        console.log(res);
        const { list, manager, paging } = res.data;
        setList(list);
        setManager(manager);
        setPaging(paging);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, [status, page]);

  // activeStyle
  const activeStyle = {
    background: "var(--main-color)",
    color: "var(--white-color)",
  };

  // event

  return (
    <div className="manager_wrapper">
      <Header first="다른 통역사 접수보기" second="신청하러 가기"></Header>
      <main>
        <article className="lists">
          <div className="lists_nav">
            <NavLink
              to="?status=hold&page=1"
              activeStyle={activeStyle}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
                const query = qs.parse(location.search, {
                  ignoreQueryPrefix: true,
                });
                return query.status === "hold" ? true : false;
              }}
            >
              Hold
            </NavLink>
            <NavLink
              to="?status=ready&page=1"
              activeStyle={activeStyle}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
                const query = qs.parse(location.search, {
                  ignoreQueryPrefix: true,
                });
                return query.status === "ready" ? true : false;
              }}
            >
              Ready
            </NavLink>
            <NavLink
              to="?status=end&page=1"
              activeStyle={activeStyle}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }
                const query = qs.parse(location.search, {
                  ignoreQueryPrefix: true,
                });
                return query.status === "end" ? true : false;
              }}
            >
              End
            </NavLink>
          </div>
          <div className="lists_table">
            <div className="table_head">
              <span>분류</span>
              <span>제목</span>
              <span>예약날짜</span>
              <span>예약자</span>
              <span>접수</span>
            </div>
            <div className="table_body">
              {list &&
                list.map((cur) => {
                  return (
                    <Fragment key={cur.receptionId}>
                      <span>{cur.classification}</span>
                      <Link
                        className="link"
                        to={`/user/regist/${cur.id}/${cur.receptionId}`}
                      >
                        {cur.subject}
                      </Link>
                      <span>{cur.receptionDate.substring(2, 10)}</span>
                      <span>{cur.userNickName}</span>
                      <button
                        disabled={status === "end" && true}
                        className={status === "end" ? "end" : undefined}
                        onClick={async () => {
                          let change_status;
                          switch (status) {
                            case "hold":
                              change_status = "ready";
                              break;
                            case "ready":
                              change_status = "end";
                              break;
                            default:
                          }
                          try {
                            await axios.post(
                              `http://localhost:5000/manager/receipt/${cur.receptionId}?status=${change_status}`,
                              {},
                              {
                                headers: {
                                  Authorization: sessionStorage
                                    .getItem("authorization")
                                    ?.substring(
                                      1,
                                      sessionStorage.getItem("authorization")
                                        .length - 1
                                    ),
                                },
                              }
                            );
                            alert("접수되었습니다.");
                          } catch (e) {
                            console.error(e);
                          }
                          history.go(0);
                        }}
                      >
                        접수
                      </button>
                    </Fragment>
                  );
                })}
            </div>
          </div>
          {paging && <Pagination status={status} paging={paging}></Pagination>}
        </article>
        <article className="my_con">
          <MyContent
            user={manager}
            signupModify="매니저 등록 / 수정"
          ></MyContent>
        </article>
      </main>
    </div>
  );
};

export default Manager;
