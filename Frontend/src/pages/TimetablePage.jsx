import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function TimetablePage() {

    const [pdfUrl,
        setPdfUrl] = useState("");

    const [loading,
        setLoading] = useState(true);

    const [uploading,
        setUploading] = useState(false);

    const [pdf,
        setPdf] = useState(null);

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const role =
        user?.role;





    // FETCH TIMETABLE PDF
    const fetchTimetable =
        async () => {

            try {

                setLoading(true);

                const res =
                    await axios.get(

                        // "http://localhost:5000/api/timetable",
                        `${import.meta.env.VITE_API_URL}/api/timetable`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );



                console.log(
                    "TIMETABLE RESPONSE:",
                    res.data
                );



                if (

                    res.data &&

                    res.data.pdfFile

                ) {

                    setPdfUrl(

                        // `http://localhost:5000${res.data.pdfFile}`
                        `${import.meta.env.VITE_API_URL}${res.data.pdfFile}`
                    );

                } else {

                    setPdfUrl("");
                }

            } catch (err) {

                console.log(err);

                setPdfUrl("");

            } finally {

                setLoading(false);
            }
        };





    useEffect(() => {

        fetchTimetable();

    }, []);





    // ADMIN PDF UPLOAD
    const uploadPdf =
        async () => {

            if (!pdf) {

                return alert(
                    "Please select a PDF"
                );
            }

            try {

                setUploading(true);

                const formData =
                    new FormData();

                formData.append(
                    "pdf",
                    pdf
                );



                const res =
                    await axios.post(

                        // "http://localhost:5000/api/timetable/upload-pdf",
                        `${import.meta.env.VITE_API_URL}/api/timetable/upload-pdf`,

                        formData,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "multipart/form-data"
                            }
                        }
                    );



                console.log(
                    "UPLOAD RESPONSE:",
                    res.data
                );



                alert(
                    "Timetable uploaded successfully"
                );

                setPdf(null);

                fetchTimetable();

            } catch (err) {

                console.log(err);

                alert(

                    err?.response?.data?.message ||

                    "Upload failed"
                );

            } finally {

                setUploading(false);
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
            <div className="mb-8">

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-2
                    "
                >
                    Timetable
                </h1>

                <p className="text-gray-400">
                    School timetable portal
                </p>

            </div>





            {/* ADMIN UPLOAD */}
            {role === "admin" && (

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
                            mb-5
                        "
                    >
                        Upload Timetable PDF
                    </h2>





                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            gap-4
                        "
                    >

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {

                                const selectedFile =
                                    e.target.files[0];

                                console.log(
                                    "SELECTED FILE:",
                                    selectedFile
                                );

                                if (selectedFile) {

                                    setPdf(selectedFile);

                                } else {

                                    setPdf(null);
                                }
                            }}
                            className="
        flex-1
        bg-[#1e293b]
        border
        border-white/10
        rounded-xl
        p-4
    "
                        />





                        <button

                            onClick={uploadPdf}

                            disabled={uploading}

                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                px-8
                                py-3
                                rounded-xl
                                font-semibold
                                transition
                                disabled:opacity-50
                            "
                        >
                            {
                                uploading

                                    ? "Uploading..."

                                    : "Upload PDF"
                            }
                        </button>

                    </div>

                </div>
            )}






            {/* PDF VIEW */}
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    overflow-hidden
                "
            >

                {loading ? (

                    <div
                        className="
                            p-16
                            text-center
                            text-gray-400
                        "
                    >
                        Loading timetable...
                    </div>

                ) : pdfUrl ? (

                    <div
                        className="
                            w-full
                            h-[85vh]
                            bg-white
                        "
                    >

                        <iframe

                            src={pdfUrl}

                            title="Timetable PDF"

                            className="
                                w-full
                                h-full
                            "
                        />

                    </div>

                ) : (

                    <div
                        className="
                            p-16
                            text-center
                        "
                    >

                        <h2
                            className="
                                text-3xl
                                font-bold
                                mb-3
                            "
                        >
                            Timetable not updated
                        </h2>

                        <p className="text-gray-400">
                            Please wait for admin to upload timetable PDF
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}

export default TimetablePage;