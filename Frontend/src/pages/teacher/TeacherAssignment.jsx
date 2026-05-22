import { useEffect, useState } from "react";
import axios from "axios";

function TeacherAssignment() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  // =========================
  // FETCH TEACHER CLASSES
  // =========================
  const fetchClasses = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/classes/my",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // if api returns empty
      if (
        !res.data ||
        res.data.length === 0
      ) {

        // fallback from logged in user
        if (user?.classTeacherOf) {

          setClasses([
            {
              _id: "default-class",
              className:
                user.classTeacherOf
            }
          ]);

        } else {

          setClasses([]);
        }

      } else {

        setClasses(res.data);
      }

    } catch (err) {

      console.log(err);

      // fallback from logged in user
      if (user?.classTeacherOf) {

        setClasses([
          {
            _id: "default-class",
            className:
              user.classTeacherOf
          }
        ]);
      }
    }
  };

  // =========================
  // FETCH ASSIGNMENTS
  // =========================
  const fetchAssignments = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/assignments",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Assignments API:", res.data);

      // SUPPORT BOTH FORMATS
      if (Array.isArray(res.data)) {

        setAssignments(res.data);

      } else if (Array.isArray(res.data.assignments)) {

        setAssignments(res.data.assignments);

      } else {

        setAssignments([]);
      }

    } catch (err) {

      console.log(err);

      setAssignments([]);
    }
  };

  useEffect(() => {

    fetchClasses();
    fetchAssignments();

  }, []);

  // =========================
  // CREATE ASSIGNMENT
  // =========================
  const createAssignment = async () => {

    if (
      !title ||
      !description ||
      !subject ||
      !className ||
      !dueDate
    ) {

      return alert(
        "Please fill all fields"
      );
    }

    try {

      setLoading(true);

      await axios.post(

        "http://localhost:5000/api/assignments",

        {
          title,
          description,
          subject,
          className,
          dueDate
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // reset form
      setTitle("");
      setDescription("");
      setSubject("");
      setClassName("");
      setDueDate("");

      await fetchAssignments();

      alert(
        "Assignment Created Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(

        err?.response?.data?.message ||

        "Failed to create assignment"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // DELETE ASSIGNMENT
  // =========================
  const deleteAssignment = async (
    id
  ) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/assignments/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchAssignments();

      alert(
        "Assignment deleted"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete assignment"
      );
    }
  };

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
          Teacher Assignments
        </h1>

        <p className="text-gray-400">
          Create assignments for students
        </p>

      </div>

      {/* CREATE FORM */}
      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-6
          mb-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Create Assignment
        </h2>

        <div className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              bg-[#1e293b]
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="5"
            className="
              w-full
              bg-[#1e293b]
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
          />

          {/* SUBJECT */}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="
              w-full
              bg-[#1e293b]
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
          />

          {/* CLASS SELECT */}
          <select
            value={className}
            onChange={(e) =>
              setClassName(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#1e293b]
              border
              border-white/10
              rounded-xl
              p-4
            "
          >

            <option value="">
              Select Class
            </option>

            {classes.map((c) => (

              <option
                key={c._id}
                value={c.className}
              >
                {c.className}
              </option>
            ))}

          </select>

          {/* DATE */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="
              w-full
              bg-[#1e293b]
              border
              border-white/10
              rounded-xl
              p-4
              outline-none
            "
          />

          {/* BUTTON */}
          <button
            onClick={createAssignment}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              px-8
              py-4
              rounded-xl
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {
              loading

                ? "Creating..."

                : "Create Assignment"
            }
          </button>

        </div>

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
            No assignments created yet
          </div>

        ) : (

          Array.isArray(assignments) &&
          assignments.map((a) => (

            <div
              key={a._id}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-start
                  md:justify-between
                  gap-4
                "
              >

                {/* LEFT */}
                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      mb-2
                    "
                  >
                    {a.title}
                  </h2>

                  <p className="text-gray-300 mb-4">
                    {a.description}
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
                      {a.subject}
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
                      {a.className}
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
                          a.dueDate
                        ).toLocaleDateString()
                      }
                    </span>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-4">

                  <div className="text-gray-400 text-sm">

                    {
                      new Date(
                        a.createdAt
                      ).toLocaleDateString()
                    }

                  </div>

                  <button
                    onClick={() =>
                      deleteAssignment(
                        a._id
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      px-5
                      py-3
                      rounded-xl
                      font-semibold
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default TeacherAssignment;