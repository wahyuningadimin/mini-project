// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // DateTimePicker Component
// const DateTimePicker = ({ name, label, value, onChange }) => (
//   <div>
//     <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
//     <DatePicker
//       selected={value ? new Date(value) : null}
//       onChange={date => onChange(date)}
//       showTimeSelect
//       timeFormat="HH:mm"
//       timeIntervals={15}
//       dateFormat="MMMM d, yyyy h:mm aa"
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     />
//   </div>
// );

// export default DateTimePicker;

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

const DateTimePickerField: React.FC<DatePickerFieldProps> = ({
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
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default DateTimePickerField;
