import React from 'react';
import { FormikProps } from 'formik';
import { ErrorMsg } from '@/components/Form/ErrorMessage';

interface FieldDescProps {
  name: string;
  label?: string;
  formik: FormikProps<any>;
  className?: string;
  rows?: number; // Added for specifying the number of rows in the textarea
}

const FieldDesc: React.FC<FieldDescProps> = ({ name, label, formik, className, rows = 4 }) => {
  
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <textarea
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        rows={6} // Set the number of rows for the textarea
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      />
      <ErrorMsg formik={formik} name={name} />
    </div>
  );
};

export default FieldDesc;
