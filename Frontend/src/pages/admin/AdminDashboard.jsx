import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Common/Sidebar";
import StatCard from "../../components/Dashboard/StatCard";

function AdminDashboard() {

  const [stats, setStats] = useState({

    students: 0,
    teachers: 0,
    assignments: 0,
    submissions: 0,

    presentStudents: 0,
    absentStudents: 0
  });



  const [loading, setLoading] = useState(true);





  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
        localStorage.getItem("token");



        const res =
        await axios.get(

          "http://localhost:5000/api/admin/dashboard-stats",

          {
            headers: {
              Authorization:
              `Bearer ${token}`
            }
          }
        );



        setStats({

          students:
          res.data.students || 0,

          teachers:
          res.data.teachers || 0,

          assignments:
          res.data.assignments || 0,

          submissions:
          res.data.submissions || 0,

          presentStudents:
          res.data.presentStudents || 0,

          absentStudents:
          res.data.absentStudents || 0
        });

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };



    fetchStats();

  }, []);





  if (loading) {

    return (

      <div
        className="
          bg-gray-900
          min-h-screen
          text-white
          p-6
        "
      >
        Loading Dashboard...
      </div>
    );
  }





  return (

    <div
      className="
        flex
        bg-linear-to-t from-gray-500 to-blue-950
        min-h-screen
        text-white
      "
    >

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          Admin Dashboard
        </h1>





        {/* TOP STATS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          <StatCard
            title="Students"
            value={stats.students}
          />

          <StatCard
            title="Teachers"
            value={stats.teachers}
          />

          <StatCard
            title="Assignments"
            value={stats.assignments}
          />

          <StatCard
            title="Submissions"
            value={stats.submissions}
          />

        </div>






        {/* ATTENDANCE */}
        <div
          className="
            glass
            mt-8
            p-6
            rounded-2xl
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-6
            "
          >
            Attendance Analytics
          </h2>





          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-10
            "
          >

            {/* PRESENT */}
            <div>

              <p className="text-lg">
                Present Students
              </p>

              <h3
                className="
                  text-5xl
                  text-green-400
                  font-bold
                  mt-2
                "
              >
                {stats.presentStudents}
              </h3>

            </div>





            {/* ABSENT */}
            <div>

              <p className="text-lg">
                Absent Students
              </p>

              <h3
                className="
                  text-5xl
                  text-red-400
                  font-bold
                  mt-2
                "
              >
                {stats.absentStudents}
              </h3>

            </div>

          </div>

        </div>







        {/* SMART ALERTS */}
        <div
          className="
            glass
            mt-8
            p-6
            rounded-2xl
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-4
            "
          >
            Smart Alerts
          </h2>





          {stats.absentStudents > 10 ? (

            <div
              className="
                bg-red-500/20
                border
                border-red-500/20
                p-4
                rounded-xl
                text-red-300
              "
            >
              ⚠️ High number of absent students today.
            </div>

          ) : (

            <div
              className="
                bg-green-500/20
                border
                border-green-500/20
                p-4
                rounded-xl
                text-green-300
              "
            >
              ✅ Attendance looks healthy today.
            </div>

          )}

        </div>



      </div>

      

    </div>
  );
}

export default AdminDashboard;