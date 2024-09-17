import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EventReview } from '@/types/events';

// Define your Yup validation schema
export const reviewSchema = Yup.object().shape({
  user_id: Yup.string().required('User ID is required'),
  event_id: Yup.string().required('Event ID is required'),
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
  review: Yup.string().min(20, 'Review must be at least 20 characters').required('Review is required'),
});

// Initial form values
const initialValues: EventReview = {
  event_id: 0,
  rating: 0,
  review: '',
  id: 0,
  created_date: '',
  user_id: 0
};

// Form submit handler
const handleSubmit = async (values: EventReview, actions: any) => {
  try {
    console.log(values);
    // Add your API call or data handling logic here
    actions.resetForm();
  } catch (err) {
    console.error(err);
  }
};

export const ReviewFormCreate: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          {/* User_id Field */}
          <div>
            <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User ID
            </label>
            <Field
              type="text"
              name="user_id"
              id="user_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <ErrorMessage name="user_id" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Event_id Field */}
          <div>
            <label htmlFor="event_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event ID
            </label>
            <Field
              type="text"
              name="event_id"
              id="event_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <ErrorMessage name="event_id" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Rating Field */}
          <div>
            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Rating (1 to 5)
            </label>
            <Field
              as="select"
              name="rating"
              id="rating"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>{number}</option>
              ))}
            </Field>
            <ErrorMessage name="rating" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Review Field */}
          <div>
            <label htmlFor="review" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Review
            </label>
            <Field
              as="textarea"
              name="review"
              id="review"
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <ErrorMessage name="review" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-10 px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-blue-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
}