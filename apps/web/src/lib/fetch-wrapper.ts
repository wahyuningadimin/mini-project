import { removeToken, getToken } from "./server";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchWrapperOptions extends RequestInit {
  method: HttpMethod;
  body?: any;
}

const fetchWrapper = async (
  url: string,
  options: FetchWrapperOptions = { method: 'GET' }
): Promise<Response> => {
  try {
    // Get the token from localStorage or any other storage
    const token = getToken();

    // Construct the headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // Create the fetch options object
    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      ...(options.body ? { body: options.body } : {}),
    };

    // Make the fetch request
    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        // Handle unauthorized error
        // You might want to redirect the user to the login page
        // or clear the token and prompt them to reauthenticate
        removeToken(); // Clear token
        window.location.href = '/login'; // Redirect to login page (example)
        throw new Error('Unauthorized. Please log in.');
    }

    // Handle non-2xx responses
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'An error occurred');
    }

    // Return the JSON response
    return response;
  } catch (error) {
    // Log the error or handle it as needed
    console.error('Fetch error:', error);
    throw error; // Rethrow to allow further handling by the caller
  }
};

export default fetchWrapper;

// import { removeToken, getToken } from "./server";

// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// interface FetchWrapperOptions extends RequestInit {
//   method: HttpMethod;
//   body?: any;
// }

// const fetchWrapper = async (
//   url: string,
//   options: FetchWrapperOptions = { method: 'GET' }
// ): Promise<any> => {
//   try {
//     // Get the token from localStorage or any other storage
//     const token = getToken();

//     // Construct the headers
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...options.headers,
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     };

//     // Ensure the body is stringified if present
//     const fetchOptions: RequestInit = {
//       method: options.method,
//       headers,
//       ...(options.body ? { body: JSON.stringify(options.body) } : {}),
//     };

//     // Make the fetch request
//     const response = await fetch(url, fetchOptions);

//     if (response.status === 401) {
//       // Handle unauthorized error
//       removeToken(); // Clear token
//       window.location.href = '/login'; // Redirect to login page (example)
//       throw new Error('Unauthorized. Please log in.');
//     }

//     // Check if the response is JSON
//     const contentType = response.headers.get('Content-Type');
//     let data;
//     if (contentType && contentType.includes('application/json')) {
//       data = await response.json(); // Parse as JSON if the content type is JSON
//     } else {
//       data = await response.text(); // Otherwise, parse as text
//     }

//     if (!response.ok) {
//       // Throw an error with the message from the response
//       throw new Error(data.error || 'An error occurred');
//     }

//     return data; // Return the data (which could be JSON or text)

//   } catch (error) {
//     // Log the error or handle it as needed
//     console.error('Fetch error:', error);
//     throw error; // Rethrow to allow further handling by the caller
//   }
// };

// export default fetchWrapper;
