import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#F9F9F9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ClipLoader color="#ff8500" size={60} speedMultiplier={1.2} />
    </div>
  );
}
