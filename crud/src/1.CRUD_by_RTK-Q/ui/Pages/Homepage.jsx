import React, { useEffect, useState } from "react";
import { PenIcon, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import AddUser from "../Components/modal/AddUser";
import { useDataOfApiQuery, useDeleteDataMutation } from "../../Redux/features/ApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteRdata, setData } from "../../Redux/features/mutation";

export default function Homepage() {
    const { data, isError, isFetching, isLoading } = useDataOfApiQuery();
    const [deleteData] = useDeleteDataMutation();
    const [first, setFirst] = useState([]);
    const [update, setUpdate] = useState([]);
    const [search, setSearch] = useState("")
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.userData);
    console.log("------------>>>>>>>", userData);

    useEffect(() => {
        if (!isLoading && data && search) {
            const searchdata = data.filter((e) =>
                e?.email.toLowerCase().includes(search.toLowerCase().trim()) ||
                e?.name.toLowerCase().includes(search.toLowerCase().trim())
            );
            setFirst(searchdata);
        } else if (!isLoading && data) {
            setFirst(data)
        }
    }, [isLoading, search, data]);


    useEffect(() => {
        if (first.length > 0) {
            dispatch(setData(first));
        }
    }, [first, dispatch]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
        setUpdate({});
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this data!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            });

            if (result.isConfirmed) {
                const Resp = deleteData(id);
                if (Resp.isConfirmed) {
                    dispatch(deleteRdata(id))
                }
                setFirst((prevData) => prevData.filter((item) => item.id !== id));
                Swal.fire("Deleted!", "Your data has been deleted.", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your data is safe :)", "error");
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const updataApiData = (upData) => {
        console.log("🚀 ~ updataApiData ~ upData:", upData)
        toggleModal();
        setUpdate(upData);
    };

    return (
        <div className="container py-10 mx-auto">
            {isFetching && isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="">
                    <div className="flex justify-center">
                        <button
                            className="cursor-pointer font-semibold overflow-hidden rounded-md relative z-100 border border-green-500 group px-8 py-2"
                            onClick={toggleModal}
                        >
                            <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
                                Add Data
                            </span>
                            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center p-7">
                        <input
                            className="bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-green-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-green-400"
                            name="text"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-slate-400">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">Password</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {first.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-200">
                                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item?.password}</td>
                                    <td className="flex justify-start space-x-2 px-6 py-4 whitespace-nowrap">
                                    <Trash2 role="button" onClick={() => handleDelete(item.id)} className="cursor-pointer hover:text-pink-600" />
                                    <PenIcon role="button" onClick={() =>updataApiData(item)} className="cursor-pointer hover:text-blue-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {modalOpen && <AddUser isOpen={modalOpen} toggle={toggleModal} initialValues={update} data={data} />}
        </div>
    )
}