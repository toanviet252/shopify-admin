import "./spinner.css";
const Spinner = ({ type }) => {
  const scale = {
    sm: [15, 5],
    md: [50, 10],
    lg: [100, 15],
  };
  return (
    <div
      className="loader"
      style={{
        "--size-loader": `${scale[type][0]}px`,
        "--size-orbe": `${scale[type][1]}px`,
      }}
    >
      <div className="orbe" style={{ "--index": "0" }}></div>
      <div className="orbe" style={{ "--index": "1" }}></div>
      <div className="orbe" style={{ "--index": "2" }}></div>
      <div className="orbe" style={{ "--index": "3" }}></div>
      <div className="orbe" style={{ "--index": "4" }}></div>
    </div>
  );
};
export default Spinner;
