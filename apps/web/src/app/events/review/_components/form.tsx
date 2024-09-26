import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EventReview } from '@/types/events';
import { submitReview } from '@/lib/events';
import { useRouter } from 'next/navigation';

interface ReviewFormCreateProps {
  eventId: number
}

// Define your Yup validation schema
export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5')
    .required('Rating is required'),
  review: Yup.string().min(20, 'Review must be at least 20 characters').required('Review is required'),
});

// Initial form values
const initialValues: any = {
  rating: 0,
  review: ''
};

// Form submit handler


export const ReviewFormCreate: React.FC<ReviewFormCreateProps> = ({eventId}) => {
  const router = useRouter();
  const handleSubmit = async (values: any, actions: any) => {
    try {
      const review = {
        event_id: eventId,
        rating: values.rating,
        review: values.review
      }

      const result = await submitReview(review);

      if (result) {
        actions.resetForm();
        router.back();
      }
      
      
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
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