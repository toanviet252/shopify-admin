import { Spinner } from "reactstrap";

const Spin = ({ color, size }) => {
  return (
    <div
      style={{
        width: "100%",
        minWidth: "5rem",
        height: "100%",
        minHeight: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner color={color} size={size ?? undefined} />
    </div>
  );
};
export default Spin;
