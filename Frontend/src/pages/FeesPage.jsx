import { useEffect, useState } from "react";
import axios from "axios";

function FeesPage() {

    const [fees, setFees] = useState([]);

    const [stats, setStats] = useState({

        totalFees: 0,

        paidFees: 0,

        pendingFees: 0
    });

    const [form, setForm] = useState({

        studentId: "",

        amount: "",

        dueDate: ""
    });

    const [editingFee, setEditingFee] = useState(null);

    const [installmentAmounts, setInstallmentAmounts] = useState({});

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(false);





    const token =
        localStorage.getItem("token");





    // SAFE USER PARSE
    let user = null;

    try {

        user = JSON.parse(
            localStorage.getItem("user")
        );

    } catch (err) {

        console.log("Invalid user data");
    }





    const role =
        user?.role || "";





    // FETCH FEES
    const fetchFees = async () => {

        try {

            let url = "";

            if (role === "admin") {

                url =
                    "http://localhost:5000/api/fees";

            } else {

                url =
                    "http://localhost:5000/api/fees/my";
            }

            const res = await axios.get(

                url,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log("FEES RESPONSE =>", res.data);





            // ADMIN
            if (role === "admin") {

                if (Array.isArray(res.data)) {

                    setFees(res.data);

                } else {

                    setFees([]);
                }

            }

            // STUDENT
            else {

                setFees(
                    Array.isArray(res.data?.fees)
                        ? res.data.fees
                        : []
                );

                setStats(

                    res.data?.stats || {

                        totalFees: 0,

                        paidFees: 0,

                        pendingFees: 0
                    }
                );
            }

        } catch (err) {

            console.log(err);

            setFees([]);
        }
    };





    useEffect(() => {

        if (token) {

            fetchFees();
        }

    }, []);





    // FILTER FEES
    const filteredFees = fees.filter((fee) => {

        if (role !== "admin") {

            return true;
        }

        return fee?.studentId?.name
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            );
    });





    // INPUT CHANGE
    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value
        });
    };





    // CREATE / UPDATE FEE
    const createFee = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            if (editingFee) {

                await axios.put(

                    `http://localhost:5000/api/fees/${editingFee}`,

                    {
                        amount:
                            Number(form.amount),

                        dueDate:
                            form.dueDate
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert("Fee updated successfully");

                setEditingFee(null);

            } else {

                await axios.post(

                    "http://localhost:5000/api/fees",

                    {
                        studentId:
                            form.studentId,

                        amount:
                            Number(form.amount),

                        dueDate:
                            form.dueDate
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                alert("Fee assigned successfully");
            }





            setForm({

                studentId: "",

                amount: "",

                dueDate: ""
            });

            fetchFees();

        } catch (err) {

            console.log(err);

            alert(

                err?.response?.data?.message ||

                "Operation failed"
            );

        } finally {

            setLoading(false);
        }
    };





    // EDIT FEE
    const editFee = (fee) => {

        setEditingFee(fee._id);

        setForm({

            studentId:
                fee.studentId?.name || "",

            amount:
                fee.amount?.toString() || "",

            dueDate:
                fee.dueDate
                    ? new Date(fee.dueDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"
        });
    };





    // DELETE FEE
    const deleteFee = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this fee?"
            );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `http://localhost:5000/api/fees/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Fee deleted successfully"
            );

            fetchFees();

        } catch (err) {

            console.log(err);

            alert(
                "Delete failed"
            );
        }
    };





    // PAY INSTALLMENT
    const payInstallment = async (id) => {

        try {

            const amount =
                installmentAmounts[id];

            if (!amount) {

                return alert(
                    "Enter installment amount"
                );
            }

            await axios.put(

                `http://localhost:5000/api/fees/installment/${id}`,

                {
                    amount:
                        Number(amount)
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Installment paid successfully"
            );

            setInstallmentAmounts({

                ...installmentAmounts,

                [id]: ""
            });

            fetchFees();

        } catch (err) {

            console.log(err);

            alert(

                err?.response?.data?.message ||

                "Payment failed"
            );
        }
    };





    return (

        <div
            className="
                min-h-screen
                bg-[#0f172a]
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
                    Fees Management
                </h1>

                <p className="text-gray-400">

                    {
                        role === "admin"

                            ? "Assign and manage student fees"

                            : "View your fee details"
                    }

                </p>

            </div>





            {/* STUDENT STATS */}
            {role !== "admin" && (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-4
                        mb-8
                    "
                >

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                        <h2 className="text-gray-400 mb-2">
                            Total Fees
                        </h2>

                        <p className="text-3xl font-bold">
                            ₹{stats.totalFees}
                        </p>

                    </div>





                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                        <h2 className="text-gray-400 mb-2">
                            Paid
                        </h2>

                        <p className="text-3xl font-bold text-green-400">
                            ₹{stats.paidFees}
                        </p>

                    </div>





                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                        <h2 className="text-gray-400 mb-2">
                            Pending
                        </h2>

                        <p className="text-3xl font-bold text-red-400">
                            ₹{stats.pendingFees}
                        </p>

                    </div>

                </div>
            )}






            {/* ADMIN FORM */}
            {role === "admin" && (

                <>
                    <form

                        onSubmit={createFee}

                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-4
                            gap-4
                            mb-6
                        "
                    >

                        <input
                            type="text"
                            name="studentId"
                            placeholder="Student Name"
                            value={form.studentId}
                            onChange={handleChange}
                            disabled={editingFee}
                            className="
                                bg-white/5
                                border
                                border-white/10
                                p-4
                                rounded-xl
                            "
                            required
                        />





                        <input
                            type="number"
                            name="amount"
                            placeholder="Fee Amount"
                            value={form.amount}
                            onChange={handleChange}
                            className="
                                bg-white/5
                                border
                                border-white/10
                                p-4
                                rounded-xl
                            "
                            required
                        />





                        <input
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="
                                bg-white/5
                                border
                                border-white/10
                                p-4
                                rounded-xl
                            "
                            required
                        />





                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                bg-blue-500
                                hover:bg-blue-600
                                disabled:opacity-50
                                rounded-xl
                                p-4
                                font-semibold
                            "
                        >
                            {
                                loading

                                    ? "Saving..."

                                    : editingFee

                                        ? "Update Fee"

                                        : "Assign Fee"
                            }
                        </button>

                    </form>





                    {/* SEARCH */}
                    <div className="mb-8">

                        <input

                            type="text"

                            placeholder="Search student..."

                            value={searchTerm}

                            onChange={(e) =>
                                setSearchTerm(
                                    e.target.value
                                )
                            }

                            className="
                                w-full
                                md:w-[400px]
                                bg-white/5
                                border
                                border-white/10
                                rounded-2xl
                                p-4
                                outline-none
                                focus:border-blue-500
                            "
                        />

                    </div>
                </>
            )}






            {/* FEES LIST */}
            <div className="space-y-4">

                {filteredFees.length === 0 ? (

                    <div
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            p-6
                            text-center
                            text-gray-400
                        "
                    >
                        No fees found
                    </div>

                ) : (

                    filteredFees.map((fee) => (

                        <div

                            key={fee._id}

                            className="
                                bg-white/5
                                border
                                border-white/10
                                rounded-2xl
                                p-5
                                flex
                                flex-col
                                gap-5
                            "
                        >

                            <div>

                                {role === "admin" && (

                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                            mb-3
                                        "
                                    >
                                        {
                                            fee?.studentId?.name ||
                                            "Student"
                                        }
                                    </h2>
                                )}





                                <div className="space-y-2">

                                    <p>
                                        Total Fee:
                                        {" "}
                                        ₹{fee?.amount || 0}
                                    </p>

                                    <p>
                                        Paid:
                                        {" "}

                                        <span className="text-green-400">

                                            ₹{fee?.paidAmount || 0}

                                        </span>
                                    </p>

                                    <p>
                                        Remaining:
                                        {" "}

                                        <span className="text-red-400">

                                            ₹{
                                                fee?.remainingAmount ??
                                                fee?.amount ??
                                                0
                                            }

                                        </span>

                                    </p>

                                    <p>
                                        Due Date:
                                        {" "}

                                        {
                                            fee?.dueDate
                                                ? new Date(
                                                    fee.dueDate
                                                ).toLocaleDateString()
                                                : "N/A"
                                        }
                                    </p>

                                    <p>
                                        Status:
                                        {" "}

                                        <span
                                            className={

                                                fee?.status === "paid"

                                                    ? "text-green-400"

                                                    : fee?.status === "partial"

                                                        ? "text-yellow-400"

                                                        : "text-red-400"
                                            }
                                        >
                                            {fee?.status || "pending"}
                                        </span>
                                    </p>

                                    {fee?.receiptNo && (

                                        <p className="text-green-400">

                                            Receipt:
                                            {" "}
                                            {fee.receiptNo}

                                        </p>
                                    )}

                                </div>

                            </div>





                            {/* ADMIN CONTROLS */}
                            {role === "admin" && (

                                <div className="flex flex-col md:flex-row gap-4 flex-wrap">

                                    <button

                                        type="button"

                                        onClick={() =>
                                            editFee(fee)
                                        }

                                        className="
                                            bg-yellow-500
                                            hover:bg-yellow-600
                                            px-5
                                            py-3
                                            rounded-xl
                                            font-semibold
                                        "
                                    >
                                        Edit Fee
                                    </button>

                                    <button

                                        type="button"

                                        onClick={() =>
                                            deleteFee(fee._id)
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
                                        Delete Fee
                                    </button>



                                    {fee?.status !== "paid" && (

                                        <>

                                            <input

                                                type="number"

                                                placeholder="Installment Amount"

                                                value={
                                                    installmentAmounts[fee._id] || ""
                                                }

                                                onChange={(e) =>
                                                    setInstallmentAmounts({

                                                        ...installmentAmounts,

                                                        [fee._id]:
                                                            e.target.value
                                                    })
                                                }

                                                className="
                                                    bg-white/5
                                                    border
                                                    border-white/10
                                                    rounded-xl
                                                    p-3
                                                    w-[220px]
                                                "
                                            />

                                            <button

                                                type="button"

                                                onClick={() =>
                                                    payInstallment(fee._id)
                                                }

                                                className="
                                                    bg-green-500
                                                    hover:bg-green-600
                                                    px-5
                                                    py-3
                                                    rounded-xl
                                                    font-semibold
                                                "
                                            >
                                                Pay Installment
                                            </button>
                                        </>
                                    )}

                                </div>
                            )}

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default FeesPage;