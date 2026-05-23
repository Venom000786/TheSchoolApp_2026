import { useEffect, useState } from "react";
import axios from "axios";

function Fees() {

  const [fees, setFees] = useState([]);

  const token = localStorage.getItem("token");

    useEffect(() => {

    const fetchFees = async () => {

      const res = await axios.get(
        // "http://localhost:5000/api/fees/my",
        `${import.meta.env.VITE_API_URL}/api/fees/my`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFees(res.data);
    };

    fetchFees();

  }, []);

    const payFee = async (id) => {

    await axios.put(

      // `http://localhost:5000/api/fees/pay/${id}`,
      `${import.meta.env.VITE_API_URL}/api/fees/pay/${id}`,

      {},

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Fee Paid");
  };

    return (

    <div className="p-6 text-white">

      <h1 className="text-3xl mb-6">
        Fees
      </h1>

      <div className="space-y-4">

        {fees.map((fee) => (

          <div
            key={fee._id}
            className="glass p-4 rounded-xl"
          >

            <h2 className="text-2xl">
              ₹ {fee.amount}
            </h2>

            <p>
              Status:
              {" "}
              {fee.status}
            </p>

            <p>
              Due Date:
              {" "}
              {new Date(
                fee.dueDate
              ).toLocaleDateString()}
            </p>


            {fee.status === "pending" && (

              <button
                onClick={() =>
                  payFee(fee._id)
                }

                className="mt-4 bg-green-500 px-4 py-2 rounded"
              >
                Pay Now
              </button>

            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Fees;