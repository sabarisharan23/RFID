import { useNavigate } from "react-router-dom";
import ActionButton from "../../Components/Buttons";

export default function TrackAssets() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-10">
      <h1 className="font-semibold text-2xl">Requests</h1>
      <ActionButton
        type="edit"
        label="Scanner/ ManualEntry"
        onClick={() => navigate("/asset-scan")}
      />
    </div>
  );
}
