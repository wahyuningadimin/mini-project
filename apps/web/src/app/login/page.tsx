'use client'

import { loginUser } from "@/lib/register";
import { Login } from "@/types/login";
import { saveRole, saveToken } from "@/lib/server";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from 'yup'

const LoginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("email required"),
    password: yup.string()
      .min(6, "password must be at least 6 characters")
      .required("password required")
});

export default function LoginForm() {
    const router = useRouter()

    const onLogin = async (data: Login, action: FormikHelpers<Login>) => {
        try {
            const { result, ok } = await loginUser(data)
            if (!ok) throw result.msg
            toast.success(result.msg)
            action.resetForm()
            await saveToken(result.token)
            await saveRole(result.role) 
            router.push('/')
        } catch (err) {
            console.log(err);
            toast.error(err as string)
        }
    }

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => onLogin(values, action)}
        >
            {() => (
                <Form className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
                    <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="text"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 sm:text-sm"
                            />
                            <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm placeholder-gray-400 sm:text-sm"
                            />
                            <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            Login
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
