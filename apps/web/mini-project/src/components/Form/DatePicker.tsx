// import React from 'react';
// import DatePicker from 'react-datepicker';
// import { useField, useFormikContext } from 'formik';

// import "react-datepicker/dist/react-datepicker.css";

// interface DatePickerProps {
//     name: string;
//     label?: string;
//   }

// export const DatePickerField: React.FC<DatePickerProps> = ({ name, label }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   return (
//     <div>
//       <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//         {label}
//       </label>
//       <DatePicker
//         id={name}
//         selected={field.value ? new Date(field.value) : null}
//         onChange={(date) => setFieldValue(name, date ? date.toISOString().split('T')[0] : '')}
//         dateFormat="yyyy-MM-dd"
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       />
//       {meta.touched && meta.error ? (
//         <div className="text-red-500 text-sm">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

import React from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
        name: string;
        label?: string;
      }

export const DatePickerField: React.FC<DatePickerProps> = ({ name, label }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <DatePicker
        id={name}
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => setFieldValue(name, date ? date.toISOString().split('T')[0] : '')}
        dateFormat="yyyy-MM-dd"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};
