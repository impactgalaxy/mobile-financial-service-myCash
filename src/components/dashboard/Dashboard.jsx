import { useLocation } from "react-router-dom";
import userPhoto from "/userPhoto.jpeg";
import dolor from "/dolar.jpeg";
import sign from "/sign.jpeg";
import add from "/add.jpeg";
import ring from "/ring.jpeg";
import axios from "axios";
import Admin from "./admin/Admin";
const services = [
  {
    icon: dolor,
    title: "Send Money",
  },
  {
    icon: sign,
    title: "Cash Out",
  },
  {
    icon: add,
    title: "Pay Bill",
  },
  {
    icon: ring,
    title: "Others",
  },
];
export default function Dashboard() {
  const location = useLocation();
  if (!location.state) {
    return (
      <div className="pt-10 text-center md:text-4xl">
        We are sorry to provide services
      </div>
    );
  }
  const { user_name, status, admin } = location.state;

  if (admin && admin) {
    return <Admin />;
  }

  return (
    <div>
      <div className="flex items-center gap-10 justify-center">
        <div>
          <img src={userPhoto} className="size-20 rounded-full border-" />
        </div>
        <div>
          <h1>{user_name}</h1>
          <div className="border p-2 w-20">Balance</div>
        </div>
        <div>
          <button className="btn btn-outline">Logout</button>
        </div>
      </div>
      {status === "Pending" ? (
        <div className="space-y-4 mt-5">
          <h1 className="text-xl text-center">You are on the Pending state</h1>
          <p className="text-xl text-center">
            Please wait for admin confirmation
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {services.map((service) => (
            <div
              key={service.title}
              className="hover:bg-blue-gray-50 p-2 cursor-pointer rounded-2xl">
              <img src={service.icon} alt="" className="size-10 m-auto block" />
              <p>{service.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
