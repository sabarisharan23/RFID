import { useNavigate } from "react-router-dom";
import ActionButton from "../../Components/Buttons";

export default function Requests() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-10">
      <h1 className="font-semibold text-2xl">Requests</h1>
      <ActionButton
        type="edit"
        label="Add/Edit"
        onClick={() => navigate("/add-edit")}
      />
    </div>
  );
}
