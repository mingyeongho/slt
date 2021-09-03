import "./CcWrapper.scss";

const CcWrapper = ({ regi, setRegi, cc }) => {
  // event
  const onChange = (e) => {
    setRegi({
      ...regi,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="cc_wrapper" ref={cc}>
      <div className="classi_subject_wrapper">
        <div className="classi_wrapper">
          <select name="classification" onChange={onChange}>
            <option value="default">-선택-</option>
            <option value="medical">의료</option>
            <option value="edu">교육</option>
          </select>
        </div>
        <div className="subject_wrapper">
          <input
            type="text"
            name="subject"
            className="subject_input"
            autoComplete="off"
            placeholder="제목"
            onChange={onChange}
          ></input>
        </div>
        <div className="content_wrapper">
          <textarea
            rows={10}
            name="content"
            onChange={onChange}
            placeholder="내용"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CcWrapper;
