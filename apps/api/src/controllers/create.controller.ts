import { useRouter } from 'next/router';

export const FormCreate: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const onCreate = async (data: Event) => {
    try {
      console.log(data);
      // Redirect to another page after successful form submission
      router.push('/success-page'); // Replace '/success-page' with the URL you want to navigate to
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

  // ...rest of your component
};
