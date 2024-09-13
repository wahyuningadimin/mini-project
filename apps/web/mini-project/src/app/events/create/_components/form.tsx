'use client';

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
import FieldDesc from "@/components/Form/FieldDesc";
import DatePickerField from "@/components/Form/DatePicker";
import { createEvent } from "@/lib/events";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";


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
    .required('Ticket start date is required')
    .test('start-before-event', 'Ticket start date must be before event', function(value){
      const { event_date } = this.parent;
      return !event_date || !value || new Date(value) <= new Date(event_date);
    }),
  ticket_end_date: Yup.date()
    .required('Ticket end date is required')
    .min(Yup.ref('ticket_start_date'), 'Ticket end date must be after ticket start date')
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
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onCreate = async (data: any) => {
    try {
      console.log(data);

      const composeTiers = () => {
        if (data.event_type == 'free') {
          return [
            {
              tier_name: 'regular',
              price: 0,
              max_capacity: Number(data.free_quantity),
            }
          ]
        } else {
          return [
            {
              tier_name: 'VIP',
              max_capacity: Number(data.paid_vip_quantity),
              price: Number(data.paid_vip_price)
            },
            {
              tier_name: 'regular',
              max_capacity: Number(data.paid_regular_quantity),
              price: Number(data.paid_regular_price)
            }
          ]
        }
      }

      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('event_date', data.event_date);
      formData.append('location', data.location);
      formData.append('venue', data.venue);
      formData.append('category', data.category);
      formData.append('event_type', data.event_type);
      formData.append('event_description', data.event_description);
      formData.append('ticket_start_date', data.ticket_start_date);
      formData.append('ticket_end_date', data.ticket_end_date);
      formData.append('image', data.image);
      formData.append('tiers', JSON.stringify(composeTiers()));

      const response = await createEvent(formData);
      const result = response.result;

      if (result.status) {
        enqueueSnackbar({
          message: 'Event has been created!',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'bottom'
          }
        })
        setTimeout(() => {
          router.push('/');
        }, 1000);
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: eventSchema,
    onSubmit: (values, actions) => {
      onCreate(values);
      // actions.resetForm();
    }
  });

  useEffect(() => {
    formik.setFieldValue('slug', createSlug(formik.values.name));
  }, [formik.values.name]);

  
  const handleSubmit = async (values: any) => {
    try {
      // console.log(values);
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
              { label: "Concert", value: "concert" },
              { label: "Musical", value: "musical" },
              { label: "Play", value: "play" },
              { label: "Classic", value: "classic" },
            ]}
          />
          <FieldSelect
            name="event_type"
            label="Event Type"
            formik={formik}
            options={[
              { label: "Select Event Type", value: "" },
              { label: "Free", value: "free" },
              { label: "Paid", value: "paid" },
            ]}
          />

          {
            formik.values.event_type == 'free' ? (
            <div className="flex flex-row gap-0.5">
              <FieldText 
              name="free_quantity"
              formik={formik}
              label="Quantity"
              />
            </div>
            
            ) : formik.values.event_type == 'paid' ? (
              <div>
              <div className="flex flex-row gap-0.5">
              <FieldText 
              name="paid_regular_quantity"
              formik={formik}
              label="Regular Quantity"
              />
              <FieldText 
              name="paid_regular_price"
              formik={formik}
              label="Regular Price"
              />
            </div>

            <div className="flex flex-row gap-0.5">
              <FieldText 
              name="paid_vip_quantity"
              formik={formik}
              label="VIP Quantity"
              />
              <FieldText 
              name="paid_vip_price"
              formik={formik}
              label="VIP Price"
              />
            </div>
              </div>
            ) : null
          }

          <FieldText
            name="location"
            formik={formik}
            label="Event Location"
          />

          <FieldText
            name="venue"
            formik={formik}
            label="Event Venue"
          />

          <FieldImage name="image" label="Image" formik={formik} />
          <div>
            <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
            <FieldDesc formik={formik} name="event_description" />
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">


          <DatePickerField
            name="event_date"
            label="Event Date"
            selected={formik.values.event_date ? new Date(formik.values.event_date) : null}
            onChange={(date) => formik.setFieldValue('event_date', date)}
            onBlur={() => formik.handleBlur('event_date')}
            error={formik.touched.event_date && formik.errors.event_date ? formik.errors.event_date : ''}
          />

          <DatePickerField
            name="ticket_start_date"
            label="Ticket Start Date"
            selected={formik.values.ticket_start_date ? new Date(formik.values.ticket_start_date) : null}
            onChange={(date) => formik.setFieldValue('ticket_start_date', date)}
            onBlur={() => formik.handleBlur('ticket_start_date')}
            error={formik.touched.ticket_start_date && formik.errors.ticket_start_date ? formik.errors.ticket_start_date : ''}
          />

          <DatePickerField
            name="ticket_end_date"
            label="Ticket End Date"
            selected={formik.values.ticket_end_date ? new Date(formik.values.ticket_end_date) : null}
            onChange={(date) => formik.setFieldValue('ticket_end_date', date)}
            onBlur={() => formik.handleBlur('ticket_end_date')}
            error={formik.touched.ticket_end_date && formik.errors.ticket_end_date ? formik.errors.ticket_end_date : ''}
          />

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

// "use client";

// import { Formik, Form, Field } from "formik";
// import * as Yup from 'yup';
// import { createSlug } from "@/app/helper/createSlug";
// import FieldText from "@/components/Form/FieldText";
// import FieldSelect from "@/components/Form/FieldSelect";
// import { FieldImage } from "@/components/Form/FieldImage";
// import { DatePickerField } from "@/components/Form/DatePicker";
// import FieldDesc from "@/components/Form/FieldDesc";
// import { Event } from "@/types/events";
// import { useEffect } from "react";

// export const eventSchema = Yup.object({
//   name: Yup.string()
//     .min(5, 'Event name must be at least 5 characters long')
//     .max(100, 'Event name must be at most 100 characters long')
//     .required('Event name is required'),
//   event_date: Yup.date().required('Event date is required'),
//   location: Yup.string().required('Location is required'),
//   venue: Yup.string().required('Venue is required'),
//   category: Yup.string().required('Category is required'),
//   event_type: Yup.string().required('Event type is required'),
//   event_description: Yup.string()
//     .min(20, 'Description must be at least 20 characters long')
//     .required('Description is required'),
//   image: Yup.mixed()
//     .test('fileType', 'Only JPEG & PNG allowed', (value) => !value || (value instanceof File && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)))
//     .test('fileSize', 'File size too large (max 5MB)', (value) => !value || (value instanceof File && value.size <= 5242880)) // 5 MB in bytes
//     .required('Image is required'),
//   ticket_start_date: Yup.date().required('Ticket start date is required'),
//   ticket_end_date: Yup.date().required('Ticket end date is required'),
//   created_date: Yup.date(),
//   modified_date: Yup.date(),
// });

// const initialValues: Event = {
//   name: '',
//   event_date: '',
//   location: '',
//   venue: '',
//   category: '',
//   event_type: '',
//   event_description: '',
//   image: '',
//   ticket_start_date: '',
//   ticket_end_date: '',
//   created_date: '',
//   modified_date: '',
//   id: 0,
//   slug: "",
// };

// export const FormCreate: React.FC = () => {
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={eventSchema}
//       onSubmit={(values, actions) => {
//         try {
//           console.log(values);
//           // Handle form submission
//         } catch (err) {
//           console.error(err);
//         }
//         actions.resetForm();
//       }}
//     >
//       {({ values, setFieldValue }) => {
//         useEffect(() => {
//           setFieldValue('slug', createSlug(values.name));
//         }, [values.name]);

//         return (
//           <div className="flex justify-center items-center min-h-screen py-4 px-4 lg:px-20 md:px-10">
//             <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
//               <Form className="flex flex-col gap-4">
//                 <FieldText name="name" label="Event Name" formik={undefined} />
//                 <div>
//                   <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
//                   <input
//                     type="text"
//                     name="slug"
//                     value={values.slug || ''}
//                     readOnly
//                     disabled
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   />
//                 </div>
//                 <FieldSelect
//                   name="category"
//                   label="Category"
//                   options={[
//                     { label: "Select Category", value: "" },
//                     { label: "Concert", value: "Concert" },
//                     { label: "Musical", value: "Musical" },
//                     { label: "Play", value: "Play" },
//                     { label: "Classic", value: "Classic" },
//                   ]} formik={undefined}                />
//                 <FieldSelect
//                   name="event_type"
//                   label="Event Type"
//                   options={[
//                     { label: "Select Event Type", value: "" },
//                     { label: "Free", value: "Free" },
//                     { label: "Paid", value: "Paid" },
//                   ]} formik={undefined}                />

//                 {values.event_type === 'Free' && (
//                   <div className="flex flex-row gap-0.5">
//                     <FieldText 
//                       name="regular_quantity"
//                       label="Quantity" formik={undefined}                    />
//                   </div>
//                 )}
                
//                 {values.event_type === 'Paid' && (
//                   <div>
//                     <div className="flex flex-row gap-0.5">
//                       <FieldText 
//                         name="regular_quantity"
//                         label="Regular Quantity" formik={undefined}                      />
//                       <FieldText 
//                         name="regular_price"
//                         label="Regular Price" formik={undefined}                      />
//                     </div>

//                     <div className="flex flex-row gap-0.5">
//                       <FieldText 
//                         name="vip_quantity"
//                         label="VIP Quantity" formik={undefined}                      />
//                       <FieldText 
//                         name="vip_price"
//                         label="VIP Price" formik={undefined}                      />
//                     </div>
//                   </div>
//                 )}

//                 <FieldText
//                   name="location"
//                   label="Event Location" formik={undefined}                />

//                 <FieldText
//                   name="venue"
//                   label="Event Venue" formik={undefined}                />

//                 <FieldImage name="image" label="Image" formik={undefined} />
//                 <div>
//                   <label htmlFor="event_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
//                   <FieldDesc name="event_description" formik={undefined} />
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
//                   <DatePickerField name="event_date" label="Event Date" />
//                   <DatePickerField name="ticket_start_date" label="Ticket Start Date" />
//                   <DatePickerField name="ticket_end_date" label="Ticket End Date" />
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="w-full sm:w-auto h-10 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-gray-300 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         );
//       }}
//     </Formik>
//   );
// }
