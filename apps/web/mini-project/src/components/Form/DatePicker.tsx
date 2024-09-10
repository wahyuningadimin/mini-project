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

// import React from 'react';
// import DatePicker from 'react-datepicker';
// import { useField, useFormikContext } from 'formik';
// import "react-datepicker/dist/react-datepicker.css";

// interface DatePickerProps {
//         name: string;
//         label?: string;
//       }

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
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from 'formik';

interface DatePickerFieldProps {
  name: string;
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  selected,
  onChange,
  onBlur,
  error
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (date: Date | null) => {
    helpers.setValue(date);
    onChange(date);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <DatePicker
        id={name}
        selected={selected}
        onChange={handleChange}
        onBlur={onBlur}
        dateFormat="yyyy/MM/dd"
        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default DatePickerField;
