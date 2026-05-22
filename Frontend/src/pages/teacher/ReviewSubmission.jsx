import { useEffect, useState } from "react";

import axios from "axios";

function ReviewSubmissions() {

  const [submissions, setSubmissions] = useState([]);

  const token = localStorage.getItem("token");

    useEffect(() => {

    const fetchSubmissions = async () => {

      const res = await axios.get(
        "http://localhost:5000/api/teacher/submissions",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSubmissions(res.data);
    };

    fetchSubmissions();

  }, []);
    const reviewSubmission = async (
    id,
    marks,
    feedback
  ) => {

    await axios.put(

      `http://localhost:5000/api/teacher/review/${id}`,

      {
        marks,
        feedback
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Reviewed");
  };
    return (
    <div className="p-6 text-white">

      <h1 className="text-3xl mb-6">
        Student Submissions
      </h1>

      <div className="space-y-4">

        {submissions.map((sub) => (

          <div
            key={sub._id}
            className="glass p-4 rounded-xl"
          >

            <h2 className="text-xl font-bold">
              {sub.assignmentId?.title}
            </h2>

            <p>
              Student: {sub.studentId?.name}
            </p>

            <a
              href={sub.fileUrl}
              target="_blank"
              className="text-blue-400"
            >
              Open Submission
            </a>

            <div className="mt-4">

              <input
                type="number"
                placeholder="Marks"

                onChange={(e) =>
                  sub.marks = e.target.value
                }

                className="bg-white/10 p-2 mr-2"
              />

              <input
                placeholder="Feedback"

                onChange={(e) =>
                  sub.feedback = e.target.value
                }

                className="bg-white/10 p-2"
              />

            </div>

            <button
              onClick={() =>
                reviewSubmission(
                  sub._id,
                  sub.marks,
                  sub.feedback
                )
              }

              className="mt-4 bg-green-500 px-4 py-2 rounded"
            >
              Submit Review
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ReviewSubmissions;