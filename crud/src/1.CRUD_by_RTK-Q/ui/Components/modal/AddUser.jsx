import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAddDataMutation, useUpdateDataMutation } from "../../../Redux/features/ApiSlice";
import { useDispatch } from "react-redux";
import { updateRdata } from "../../../Redux/features/mutation";

const validation = Yup.object({
    name: Yup.string()
        .min(2, "Name is too short, minimum 2 characters required")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
        .required("Please enter a name"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Please enter an email address"),
    password: Yup.string().required("Please enter a valid password"),
});

export default function AddUser({ isOpen, toggle, data,
    initialValues = {
        email: "",
        name: "",
        password: "",
    },
}) {
    console.log("🚀 ~ initialValues:", initialValues)
    const dispatch = useDispatch()
    const [addData] = useAddDataMutation();
    const [updateData] = useUpdateDataMutation();


    // const addData = async (data) => {
    //     const resp = await fetch("https://65f7bfe1b4f842e80885efc4.mockapi.io/users", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     });
    //     console.log("fetch ", await resp.json());
    // }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues || {
            email: "",
            name: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: (values, { resetForm }) => {
            console.log("add value", values)
            try {
                if (initialValues.email && initialValues.name && initialValues.password) {
                    // If initialValues are provided, it means we are updating existing data
                    const resp = updateData(values);
                    if (resp.isConformed) {
                        dispatch(updateRdata(values))
                    }
                    Swal.fire({
                        title: "Updated!",
                        text: "User data has been updated successfully.",
                        icon: "success",
                    });
                } else {
                    // If no initialValues, it means we are adding new data
                    const resp = addData(values);
                    if (resp.isConformed) {
                        dispatch(updateRdata(values))
                    }
                    Swal.fire({
                        title: "Added!",
                        text: "New user has been added successfully.",
                        icon: "success",
                    });
                }
                resetForm();
                toggle();
            } catch (error) {
                console.error("Error adding data:", error);
            }
        },

    });

    const cancelButton = () => {
        resetForm({
            values: {
                email: "",
                name: "",
                password: "",
            },
        });
        toggle();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
                    <div className="relative p-8 bg-white w-96 rounded-md shadow-lg">

                        {/* Cancle button */}

                        <button
                            type="button"
                            onClick={cancelButton}
                            className="absolute top-0 right-0 p-2 m-2 text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add User</h2>

                        {/* Name */}

                        <div className="flex items-center justify-center py-5">
                            <div className="relative">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700
                                    ${values.name ? "-top-[16px] text-xs text-blue-700" : ""}
                                    ${touched.name && errors.name ? "text-red-500" : ""}`}
                                >
                                    User name
                                </label>
                                {touched.name && errors.name && (
                                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>
                        </div>

                        {/* Email Id */}

                        <div className="flex items-center justify-center py-5">
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={values.email || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700
                                    ${values.email ? "-top-[16px] text-xs text-blue-700" : ""}
                                    ${touched.email && errors.email ? "text-red-500" : ""}`}
                                >
                                    Email Id
                                </label>
                                {touched.email && errors.email && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Password */}

                        <div className="flex items-center justify-center py-5">
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    value={values.password || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-0 cursor-text peer-focus:text-xs transition-all peer-focus:-top-4 peer-focus:text-blue-700
                                    ${values.password ? "-top-[16px] text-xs text-blue-700" : ""}
                                    ${touched.password && errors.password ? "text-red-500" : ""}`}
                                >
                                    Password
                                </label>
                                {touched.password && errors.password && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {initialValues?.email?.length > 0 ? 'Update Data' : 'Submit Data'}
                            </button>
                            <button
                                type="button"
                                onClick={cancelButton}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
