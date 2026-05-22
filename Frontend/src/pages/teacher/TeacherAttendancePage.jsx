// import {
//     useEffect,
//     useState
// } from "react";

// import axios from "axios";

// function TeacherAttendancePage() {

//     const [
//         classes,
//         setClasses
//     ] = useState([]);

//     const [
//         selectedClass,
//         setSelectedClass
//     ] = useState("");

//     const [
//         students,
//         setStudents
//     ] = useState([]);

//     const [
//         attendance,
//         setAttendance
//     ] = useState({});

//     const [
//         loading,
//         setLoading
//     ] = useState(false);

//     const [
//         submitting,
//         setSubmitting
//     ] = useState(false);

//     const [
//         alreadyMarked,
//         setAlreadyMarked
//     ] = useState(false);



//     const token =
//     localStorage.getItem(
//         "token"
//     );



//     const today =
//     new Date()
//     .toISOString()
//     .split("T")[0];







//     // FETCH CLASSES
//     const fetchClasses =
//     async () => {

//         try {

//             setLoading(true);

//             const res =
//             await axios.get(

//                 "http://localhost:5000/api/classes/my",

//                 {
//                     headers: {

//                         Authorization:
//                         `Bearer ${token}`
//                     }
//                 }
//             );

//             setClasses(
//                 res.data || []
//             );

//         } catch (err) {

//             console.log(err);

//         } finally {

//             setLoading(false);
//         }
//     };







//     useEffect(() => {

//         fetchClasses();

//     }, []);







//     // LOAD CLASS STUDENTS
//     const handleClassChange =
//     async (classId) => {

//         setSelectedClass(
//             classId
//         );

//         setAlreadyMarked(false);

//         const foundClass =
//         classes.find(

//             (c) =>
//             c._id === classId
//         );



//         if (!foundClass) {

//             setStudents([]);

//             return;
//         }



//         const classStudents =
//         foundClass.students || [];

//         setStudents(
//             classStudents
//         );



//         // DEFAULT PRESENT
//         const initialAttendance = {};

//         classStudents.forEach(
//             (student) => {

//                 initialAttendance[
//                     student._id
//                 ] = "present";
//             }
//         );

//         setAttendance(
//             initialAttendance
//         );



//         // CHECK TODAY ATTENDANCE
//         try {

//             const res =
//             await axios.get(

//                 "http://localhost:5000/api/attendance/all",

//                 {
//                     headers: {

//                         Authorization:
//                         `Bearer ${token}`
//                     }
//                 }
//             );



//             const todayRecords =
//             res.data.filter(

//                 (record) =>

//                     record.className ===
//                     foundClass.className &&

//                     new Date(
//                         record.date
//                     )
//                     .toISOString()
//                     .split("T")[0]

//                     === today
//             );



//             if (
//                 todayRecords.length > 0
//             ) {

//                 setAlreadyMarked(true);

//                 const existing = {};

//                 todayRecords.forEach(
//                     (record) => {

//                         existing[
//                             record.studentId._id
//                         ] =
//                         record.status;
//                     }
//                 );

//                 setAttendance(existing);
//             }

//         } catch (err) {

//             console.log(err);
//         }
//     };







//     // CHANGE STATUS
//     const changeStatus =
//     (
//         studentId,
//         status
//     ) => {

//         setAttendance({

//             ...attendance,

//             [studentId]:
//             status
//         });
//     };







//     // SUBMIT ATTENDANCE
//     const submitAttendance =
//     async () => {

//         try {

//             setSubmitting(true);

//             const foundClass =
//             classes.find(

//                 (c) =>
//                 c._id === selectedClass
//             );



//             if (!foundClass) {

//                 return;
//             }



//             for (
//                 const student
//                 of students
//             ) {

//                 await axios.post(

//                     "http://localhost:5000/api/attendance",

//                     {

//                         studentId:
//                         student._id,

//                         className:
//                         foundClass.className,

//                         date:
//                         today,

//                         status:
//                         attendance[
//                             student._id
//                         ] || "present"
//                     },

//                     {
//                         headers: {

//                             Authorization:
//                             `Bearer ${token}`
//                         }
//                     }
//                 );
//             }



//             alert(
//                 "Attendance submitted successfully"
//             );

//             setAlreadyMarked(true);

//         } catch (err) {

//             console.log(err);

//             alert(

//                 err?.response?.data?.message ||

//                 "Failed to submit attendance"
//             );

//         } finally {

//             setSubmitting(false);
//         }
//     };







//     return (

//         <div
//             className="
//                 min-h-screen
//                 bg-[#020817]
//                 text-white
//                 p-6
//             "
//         >

//             <div className="max-w-7xl mx-auto">

//                 {/* HEADER */}
//                 <div className="mb-10">

//                     <h1
//                         className="
//                             text-4xl
//                             font-bold
//                             mb-2
//                         "
//                     >
//                         Attendance
//                     </h1>

//                     <p className="text-gray-400">
//                         Mark daily class attendance
//                     </p>

//                 </div>







//                 {/* TOP BAR */}
//                 <div
//                     className="
//                         bg-white/5
//                         border
//                         border-white/10
//                         rounded-3xl
//                         p-6
//                         mb-8
//                     "
//                 >

//                     <div
//                         className="
//                             flex
//                             flex-col
//                             lg:flex-row
//                             gap-5
//                             lg:items-center
//                             lg:justify-between
//                         "
//                     >

//                         <div>

//                             <p className="text-gray-400 mb-2">
//                                 Attendance Date
//                             </p>

//                             <h2
//                                 className="
//                                     text-2xl
//                                     font-bold
//                                 "
//                             >
//                                 {today}
//                             </h2>

//                         </div>







//                         <div
//                             className="
//                                 w-full
//                                 lg:w-[350px]
//                             "
//                         >

//                             <select

//                                 value={selectedClass}

//                                 onChange={(e) =>
//                                     handleClassChange(
//                                         e.target.value
//                                     )
//                                 }

//                                 className="
//                                     w-full
//                                     bg-[#1e293b]
//                                     border
//                                     border-white/10
//                                     rounded-2xl
//                                     p-4
//                                     outline-none
//                                 "
//                             >

//                                 <option value="">
//                                     Select Class
//                                 </option>

//                                 {classes.map((c) => (

//                                     <option
//                                         key={c._id}
//                                         value={c._id}
//                                     >
//                                         {c.className}
//                                     </option>
//                                 ))}

//                             </select>

//                         </div>

//                     </div>

//                 </div>







//                 {/* LOADING */}
//                 {loading && (

//                     <div className="text-gray-400">
//                         Loading classes...
//                     </div>
//                 )}







//                 {/* ALREADY MARKED */}
//                 {alreadyMarked && (

//                     <div
//                         className="
//                             bg-yellow-500/20
//                             border
//                             border-yellow-500/20
//                             text-yellow-300
//                             rounded-2xl
//                             p-4
//                             mb-6
//                         "
//                     >
//                         Attendance already marked for today.
//                     </div>
//                 )}







//                 {/* STUDENTS */}
//                 <div className="space-y-4">

//                     {students.length === 0 ? (

//                         <div
//                             className="
//                                 bg-white/5
//                                 border
//                                 border-white/10
//                                 rounded-3xl
//                                 p-10
//                                 text-center
//                                 text-gray-400
//                             "
//                         >
//                             Select a class to view students
//                         </div>

//                     ) : (

//                         students.map((student) => (

//                             <div

//                                 key={student._id}

//                                 className="
//                                     bg-white/5
//                                     border
//                                     border-white/10
//                                     rounded-3xl
//                                     p-5
//                                     flex
//                                     flex-col
//                                     md:flex-row
//                                     md:items-center
//                                     md:justify-between
//                                     gap-5
//                                 "
//                             >

//                                 {/* INFO */}
//                                 <div>

//                                     <h2
//                                         className="
//                                             text-xl
//                                             font-semibold
//                                         "
//                                     >
//                                         {student.name}
//                                     </h2>

//                                     <p className="text-gray-400">
//                                         {student.email}
//                                     </p>

//                                 </div>







//                                 {/* ACTIONS */}
//                                 <div className="flex gap-3">

//                                     <button

//                                         disabled={
//                                             alreadyMarked
//                                         }

//                                         onClick={() =>
//                                             changeStatus(
//                                                 student._id,
//                                                 "present"
//                                             )
//                                         }

//                                         className={`
//                                             px-6
//                                             py-3
//                                             rounded-2xl
//                                             font-semibold
//                                             transition

//                                             ${
//                                                 attendance[
//                                                     student._id
//                                                 ] === "present"

//                                                 ? "bg-green-500"

//                                                 : "bg-white/10"
//                                             }

//                                             ${
//                                                 alreadyMarked
//                                                 ? "opacity-60 cursor-not-allowed"
//                                                 : ""
//                                             }
//                                         `}
//                                     >
//                                         Present
//                                     </button>







//                                     <button

//                                         disabled={
//                                             alreadyMarked
//                                         }

//                                         onClick={() =>
//                                             changeStatus(
//                                                 student._id,
//                                                 "absent"
//                                             )
//                                         }

//                                         className={`
//                                             px-6
//                                             py-3
//                                             rounded-2xl
//                                             font-semibold
//                                             transition

//                                             ${
//                                                 attendance[
//                                                     student._id
//                                                 ] === "absent"

//                                                 ? "bg-red-500"

//                                                 : "bg-white/10"
//                                             }

//                                             ${
//                                                 alreadyMarked
//                                                 ? "opacity-60 cursor-not-allowed"
//                                                 : ""
//                                             }
//                                         `}
//                                     >
//                                         Absent
//                                     </button>

//                                 </div>

//                             </div>
//                         ))
//                     )}

//                 </div>







//                 {/* SUBMIT BUTTON */}
//                 {
//                     students.length > 0 &&

//                     !alreadyMarked && (

//                     <button

//                         onClick={
//                             submitAttendance
//                         }

//                         disabled={
//                             submitting
//                         }

//                         className="
//                             mt-8
//                             bg-blue-600
//                             hover:bg-blue-700
//                             px-10
//                             py-4
//                             rounded-2xl
//                             font-bold
//                             transition
//                             disabled:opacity-50
//                         "
//                     >
//                         {
//                             submitting

//                             ? "Submitting..."

//                             : "Submit Attendance"
//                         }
//                     </button>
//                 )}

//             </div>

//         </div>
//     );
// }

// export default TeacherAttendancePage;