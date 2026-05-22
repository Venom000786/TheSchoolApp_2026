import { useEffect, useState } from "react";
import axios from "axios";

function Assignments() {

  const [assignments, setAssignments] =
    useState([]);

  const [studentClass, setStudentClass] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  // =========================
  // FETCH STUDENT CLASS
  // =========================
  const fetchStudentClass = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/classes/student/my",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Student Class API:",
        res.data
      );

      if (res.data?.className) {

        setStudentClass(
          res.data.className
        );

        return res.data.className;
      }

      return "";

    } catch (err) {

      console.log(err);

      return "";
    }
  };

  // =========================
  // FETCH ASSIGNMENTS
  // =========================
  const fetchAssignments = async (
    currentClass
  ) => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/assignments",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(
        "Assignments API:",
        res.data
      );

      let assignmentData = [];

      if (Array.isArray(res.data)) {

        assignmentData = res.data;

      } else if (
        Array.isArray(
          res.data.assignments
        )
      ) {

        assignmentData =
          res.data.assignments;
      }

      // FILTER CLASS WISE
      const filteredAssignments =
        assignmentData.filter(
          (assignment) => {

            return (
              assignment.className
                ?.trim()
                ?.toLowerCase() ===
              currentClass
                ?.trim()
                ?.toLowerCase()
            );
          }
        );

      console.log(
        "Filtered Assignments:",
        filteredAssignments
      );

      setAssignments(
        filteredAssignments
      );

    } catch (err) {

      console.log(err);

      setAssignments([]);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      const currentClass =
        await fetchStudentClass();

      await fetchAssignments(
        currentClass
      );

      setLoading(false);
    };

    loadData();

  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-[#020817]
          text-white
          flex
          items-center
          justify-center
          text-3xl
        "
      >
        Loading...
      </div>
    );
  }

  return (

    <div
      className="
        min-h-screen
        bg-[#020817]
        text-white
        p-6
      "
    >

      {/* HEADER */}
      <div className="mb-10">

        <h1
          className="
            text-4xl
            font-bold
            mb-2
          "
        >
          Assignments
        </h1>

        <p className="text-gray-400">
          Class:
          {" "}
          {studentClass || "No Class"}
        </p>

      </div>

      {/* ASSIGNMENTS */}
      <div className="space-y-6">

        {assignments.length === 0 ? (

          <div
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-10
              text-center
              text-gray-400
            "
          >
            No assignments found
          </div>

        ) : (

          assignments.map((assignment) => (

            <div
              key={assignment._id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >
                {assignment.title}
              </h2>

              <p className="text-gray-300 mb-4">
                {assignment.description}
              </p>

              <div className="flex gap-3 flex-wrap">

                <span
                  className="
                    bg-blue-500/20
                    text-blue-300
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                  "
                >
                  {assignment.subject}
                </span>

                <span
                  className="
                    bg-green-500/20
                    text-green-300
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                  "
                >
                  {assignment.className}
                </span>

                <span
                  className="
                    bg-red-500/20
                    text-red-300
                    px-3
                    py-1
                    rounded-lg
                    text-sm
                  "
                >
                  Due:
                  {" "}
                  {
                    new Date(
                      assignment.dueDate
                    ).toLocaleDateString()
                  }
                </span>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Assignments;