"use client";

import RichTextEditor from "./editor";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";
import { ErrorMsg } from "@/components/Form/ErrorMessage";
import { useEffect } from "react";
import FieldText from "@/components/Form/FieldText";
import FieldSelect from "@/components/Form/FieldSelect";
import { createSlug } from "@/app/helper/createSlug";
import { FieldImage } from "@/components/Form/FieldImage";
import * as Yup from 'yup';
import { Event } from "@/types/events";
import DatePicker from "react-datepicker";
import { DatePickerField } from "@/components/Form/DatePicker";


export const eventSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Event name must be at least 5 characters long')
    .max(100, 'Event name must be at most 100 characters long')
    .required('Event name is required'),
  event_date: Yup.date()
    .required('Event date is required'),
  location: Yup.string()
    .required('Location is required'),
  venue: Yup.string()
    .required('Venue is required'),
  category: Yup.string()
    .required('Category is required'),
  event_type: Yup.string()
    .required('Event type is required'),
  event_description: Yup.string()
    .min(20, 'Description must be at least 20 characters long')
    .required('Description is required'),
  image: Yup.mixed()
    .test('fileType', 'Only JPEG & PNG allowed', (value) => !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)))
    .test('fileSize', 'File size too large (max 5MB)', (value) => !value || (value instanceof File && value.size <= 5242880)) // 5 MB in bytes
    .required('Image is required'),
  ticket_start_date: Yup.date()
    .required('Ticket start date is required'),
  ticket_end_date: Yup.date()
    .required('Ticket end date is required'),
  created_date: Yup.date(),
  modified_date: Yup.date(),
});

const initialValues: Event = {
  name: '',
  event_date: '',
  location: '',
  venue: '',
  category: '',
  event_type: '',
  event_description: '',
  image: '',
  ticket_start_date: '',
  ticket_end_date: '',
  created_date: '',
  modified_date: '',
  id: 0,
  slug: "",
};

export const FormCreate: React.FC = () => {
  const onCreate = async (data: Event) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: eventSchema,
    onSubmit: (values, actions) => {
      onCreate(values);
      actions.resetForm();
    }
  });

  useEffect(() => {
    formik.setFieldValue('slug', createSlug(formik.values.name));
  }, [formik.values.name]);

  
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      // Handle form submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
  initialValues={initialValues}
  validationSchema={eventSchema}
  onSubmit={handleSubmit}
>
    <div className="flex justify-center items-center min-h-screen py-4 px-4 lg:px-20 md:px-10">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <FieldText
            name="name"
            formik={formik}
            label="Event Name"
          />
          <div>
            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
            <input
              type="text"
              name="slug"
              value={formik.values.slug || ''}
              readOnly
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <FieldSelect
            name="category"
            label="Category"
            formik={formik}
            options={[
              { label: "Select Category", value: "" },
              { label: "Concert", value: "Concert" },
              { label: "Musical", value: "Musical" },
              { label: "Play", value: "Play" },
              { label: "Classic", value: "Classic" },
            ]}
          />
          <FieldSelect
            name="event_type"
            label="Event Type"
            formik={formik}
            options={[
              { label: "Select Event Type", value: "" },
              { label: "Free", value: "Free" },
              { label: "Paid", value: "Paid" },
            ]}
          />
          <FieldImage name="image" label="Image" formik={formik} />
          <div>
            <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
            <RichTextEditor formik={formik} />
            <ErrorMsg formik={formik} name="event_description" />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* <DatePickerField
            name="event_date"
            label="Event Date"
            />

            <FieldText
              name="ticket_start_date"
              formik={formik}
              label="Ticket Start Date"
              type="date"
            />
            <FieldText
              name="ticket_end_date"
              formik={formik}
              label="Ticket End Date"
              type="date"
            /> */}

            <DatePickerField name="event_date" label="Event Date" />
            <DatePickerField name="ticket_start_date" label="Ticket Start Date" />
            <DatePickerField name="ticket_end_date" label="Ticket End Date" />
          </div>
          <div className="flex justify-end">
        <button
    	    type="submit"
            className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >Save
        </button>
          </div>
        </form>
      </div>
    </div>
    </Formik>
  );
}
