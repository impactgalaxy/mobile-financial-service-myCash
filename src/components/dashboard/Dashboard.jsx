import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const { user_name, user_number } = location.state;
  return (
    <div>
      <div className="flex items-center gap-5 justify-center">
        <div>
          <div className="size-20 rounded-full border-2 bg-blue-gray-300"></div>
        </div>
        <div>
          <h1>{user_name}</h1>
          <div className="border p-2 w-20">Balance</div>
        </div>
        <div>
          <button className="btn btn-square">Logout</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
