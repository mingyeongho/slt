import "./AllRegi.scss";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import qs from "qs";

const AllRegi = ({ location }) => {
  // query
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(query);

  const { status, page } = query;

  // state
  const [lists, setLists] = useState([]);

  // useEffect
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/manager/all_register?status=${status}&page=${page}`,
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
        setLists(res.data.list);
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Header></Header>
      <main>
        <section>
          <div className="list_nav">
            <span className="fb">분류</span>
            <span className="fb">제목</span>
            <span className="fb">날짜</span>
            <span className="fb">상태</span>
          </div>
          <div className="list">
            {lists &&
              lists.map((cur) => {
                return (
                  <Fragment key={cur.id}>
                    <span>{cur.classification}</span>
                    <Link
                      className="link"
                      to={`/user/regist/${cur.id}/${cur.receptionId}`}
                    >
                      {cur.subject}
                    </Link>
                    <span>{cur.receptionDate.substring(2, 10)}</span>
                    <span>{cur.status}</span>
                  </Fragment>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllRegi;
