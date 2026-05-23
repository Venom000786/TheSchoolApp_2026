import { useState }
from "react";

import axios from "axios";


function FileUpload({

    onUpload

}) {

    const [loading,
    setLoading] = useState(false);



    const uploadFile =
    async (e) => {

        const file =
        e.target.files[0];

        if (!file) return;



        const formData =
        new FormData();

        formData.append(
            "file",
            file
        );



        try {

            setLoading(true);

            const token =
            localStorage.getItem(
                "token"
            );



            const res =
            await axios.post(

                // "http://localhost:5000/api/upload",
                `${import.meta.env.VITE_API_URL}/api/upload`,

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



            onUpload(
                res.data.fileUrl
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };



    return (

        <div>

            <input
                type="file"
                onChange={uploadFile}
            />

            {loading && (

                <p className="mt-2">
                    Uploading...
                </p>

            )}

        </div>
    );
}

export default FileUpload;