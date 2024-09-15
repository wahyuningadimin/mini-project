"use client";
import { regUser } from "@/lib/register";
import { User } from "@/types/events";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import * as yup from 'yup';

// Validation schema using Yup
const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    name: yup.string(),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    createdDate: yup.string(),
    referralCode: yup.string(),
    role: yup.string().required("Role is required")
});

// Function to handle registration
const onRegister = async (data: User, action: FormikHelpers<User>) => {
    try {
        const { result, ok } = await regUser(data);
        if (!ok) throw result.msg;
        toast.success(result.msg);
        action.resetForm();
    } catch (err) {
        console.log(err);
        toast.error(err as string);
    }
};

export default function RegisterForm() {
    return (
        <Formik
            initialValues={{
                name: "",
                fullName: "",
                email: "",
                password: "",
                role: "",
                referralCode: ""
            }}
            validationSchema={registerSchema}
            onSubmit={(values, action) => {
                onRegister(values, action);
            }}
        >
            {() => (
                    <Form className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50"> {/* Gray background for outer container */}
                    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"> {/* White background for form container */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>
                
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <Field
                                id="fullName"
                                name="fullName"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage name="fullName" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <Field
                                id="role"
                                name="role"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <ErrorMessage name="role" component="div" className="text-sm text-red-500 mt-1" />
                        </div>
                
                        <div className="mb-4">
                            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Referral Code (optional)</label>
                            <Field
                                id="referralCode"
                                name="referralCode"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                
                        <button
                            type="submit"
                            className="w-full h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            Register
                        </button>
                    </div>
                </Form>
                
            )}
        </Formik>
    );
}
function regAuthor(data: User): { result: any; ok: any; } | PromiseLike<{ result: any; ok: any; }> {
    throw new Error("Function not implemented.");
}

