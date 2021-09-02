import Interpreter from "./Interpreter/Interpreter";
import "./InterWrapper.scss";

const InterWrapper = ({ regi, setRegi, inter }) => {
  // event
  const onChange = (e) => {
    setRegi({
      ...regi,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="interpreters_wrapper" ref={inter}>
      <div className="interp">
        <input
          type="radio"
          id="kim"
          value="kim"
          name="interpreter"
          className="radioBtn"
          onChange={onChange}
        ></input>
        <label htmlFor="kim">
          <Interpreter></Interpreter>
        </label>
        <input
          type="radio"
          id="park"
          value="park"
          name="interpreter"
          className="radioBtn"
          onChange={onChange}
        ></input>
        <label htmlFor="park">
          <Interpreter></Interpreter>
        </label>
        <input
          type="radio"
          id="son"
          value="son"
          name="interpreter"
          className="radioBtn"
          onChange={onChange}
        ></input>
        <label htmlFor="son">
          <Interpreter></Interpreter>
        </label>
      </div>
    </div>
  );
};

export default InterWrapper;
