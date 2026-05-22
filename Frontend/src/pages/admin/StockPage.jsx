import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function StockPage() {

    const [stocks, setStocks] = useState([]);

    const [form, setForm] = useState({

        itemName: "",

        quantity: "",

        category: "",

        price: "",

        issuedTo: "",

        issuedBy: ""
    });

    const [editingId, setEditingId] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [categoryFilter,
        setCategoryFilter] =
        useState("all");

    const token =
        localStorage.getItem("token");



    // FETCH STOCKS
    const fetchStocks = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/stocks",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setStocks(res.data);

        } catch (err) {

            console.log(err);
        }
    };



    useEffect(() => {

        fetchStocks();

    }, []);





    // INPUT CHANGE
    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value
        });
    };





    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                // UPDATE
                await axios.put(

                    `http://localhost:5000/api/stocks/${editingId}`,

                    form,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            } else {

                // ADD
                await axios.post(

                    "http://localhost:5000/api/stocks",

                    form,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );
            }

            // RESET
            setForm({

                itemName: "",

                quantity: "",

                category: "",

                price: "",

                issuedTo: "",

                issuedBy: ""
            });

            setEditingId(null);

            fetchStocks();

        } catch (err) {

            console.log(err);
        }
    };






    // DELETE
    const deleteStock = async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/stocks/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchStocks();

        } catch (err) {

            console.log(err);
        }
    };






    // RETURN STOCK
    const returnStock = async (id) => {

        try {

            await axios.put(

                `http://localhost:5000/api/stocks/return/${id}`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            fetchStocks();

        } catch (err) {

            console.log(err);
        }
    };






    // EDIT
    const editStock = (stock) => {

        setEditingId(stock._id);

        setForm({

            itemName:
                stock.itemName || "",

            quantity:
                stock.quantity || "",

            category:
                stock.category || "",

            price:
                stock.price || "",

            issuedTo:
                stock.issuedTo || "",

            issuedBy:
                stock.issuedBy || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };






    // UNIQUE CATEGORIES
    const categories = useMemo(() => {

        const allCategories =
            stocks.map((s) => s.category);

        return [
            "all",
            ...new Set(allCategories)
        ];

    }, [stocks]);






    // FILTERED STOCKS
    const filteredStocks = useMemo(() => {

        return stocks.filter((stock) => {

            const matchesSearch =

                stock.itemName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                stock.category
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesCategory =

                categoryFilter === "all"

                    ? true

                    : stock.category ===
                      categoryFilter;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    }, [
        stocks,
        search,
        categoryFilter
    ]);






    return (

        <div
            className="
                p-6
                min-h-screen
                bg-[#0f172a]
                text-white
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
                    Stock Management
                </h1>

                <p className="text-gray-400">
                    Manage school inventory
                </p>

            </div>






            {/* SEARCH + FILTER */}
            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                    mb-8
                "
            >

                <input
                    type="text"
                    placeholder="Search item or category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        flex-1
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />



                <select
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(
                            e.target.value
                        )
                    }
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                >

                    {categories.map((cat) => (

                        <option
                            key={cat}
                            value={cat}
                            className="bg-[#0f172a]"
                        >
                            {cat}
                        </option>
                    ))}

                </select>

            </div>






            {/* FORM */}
            <form

                onSubmit={handleSubmit}

                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    mb-10
                "
            >

                <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={form.itemName}
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
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={form.quantity}
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
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />



                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />



                <input
                    type="text"
                    name="issuedTo"
                    placeholder="Issued To (Teacher)"
                    value={form.issuedTo}
                    onChange={handleChange}
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />



                <input
                    type="text"
                    name="issuedBy"
                    placeholder="Issued By"
                    value={form.issuedBy}
                    onChange={handleChange}
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />



                <button
                    type="submit"
                    className="
                        bg-blue-500
                        hover:bg-blue-600
                        p-4
                        rounded-xl
                        font-semibold
                        lg:col-span-3
                    "
                >
                    {editingId
                        ? "Update Stock"
                        : "Add Stock"}
                </button>

            </form>






            {/* STOCK LIST */}
            <div className="space-y-4">

                {filteredStocks.length === 0 && (

                    <div
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            p-8
                            text-center
                            text-gray-400
                        "
                    >
                        No stock items found
                    </div>
                )}



                {filteredStocks.map((stock) => (

                    <div

                        key={stock._id}

                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            p-5
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-4
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-2xl
                                        font-semibold
                                        mb-2
                                    "
                                >
                                    {stock.itemName}
                                </h2>

                                <div className="space-y-1">

                                    <p className="text-gray-400">
                                        Category:
                                        {" "}
                                        {stock.category}
                                    </p>

                                    <p className="text-gray-400">
                                        Quantity:
                                        {" "}
                                        {stock.quantity}
                                    </p>

                                    <p className="text-gray-400">
                                        Price:
                                        {" "}
                                        ₹{stock.price}
                                    </p>

                                    {stock.issuedTo && (

                                        <p className="text-yellow-400">
                                            Issued To:
                                            {" "}
                                            {stock.issuedTo}
                                        </p>
                                    )}

                                    {stock.issuedBy && (

                                        <p className="text-blue-400">
                                            Issued By:
                                            {" "}
                                            {stock.issuedBy}
                                        </p>
                                    )}

                                </div>

                            </div>






                            {/* ACTIONS */}
                            <div className="flex gap-3 flex-wrap">

                                <button

                                    onClick={() =>
                                        editStock(stock)
                                    }

                                    className="
                                        bg-yellow-500
                                        hover:bg-yellow-600
                                        px-4
                                        py-2
                                        rounded-xl
                                    "
                                >
                                    Edit
                                </button>



                                {stock.issuedTo && (

                                    <button

                                        onClick={() =>
                                            returnStock(stock._id)
                                        }

                                        className="
                                            bg-green-500
                                            hover:bg-green-600
                                            px-4
                                            py-2
                                            rounded-xl
                                        "
                                    >
                                        Return
                                    </button>
                                )}



                                <button

                                    onClick={() =>
                                        deleteStock(stock._id)
                                    }

                                    className="
                                        bg-red-500
                                        hover:bg-red-600
                                        px-4
                                        py-2
                                        rounded-xl
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>






                        {/* HISTORY */}
                        {stock.history?.length > 0 && (

                            <div className="mt-6">

                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        mb-3
                                    "
                                >
                                    History
                                </h3>

                                <div className="space-y-3">

                                    {stock.history.map((h, i) => (

                                        <div

                                            key={i}

                                            className="
                                                bg-black/20
                                                rounded-xl
                                                p-4
                                            "
                                        >

                                            <p>
                                                Action:
                                                {" "}
                                                {h.action}
                                            </p>

                                            <p className="text-gray-400">
                                                By:
                                                {" "}
                                                {h.by}
                                            </p>

                                            <p className="text-gray-400">
                                                Quantity:
                                                {" "}
                                                {h.quantity}
                                            </p>

                                            <p className="text-gray-500 text-sm">
                                                {new Date(
                                                    h.date
                                                ).toLocaleString()}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}

                    </div>
                ))}

            </div>

        </div>
    );
}

export default StockPage;