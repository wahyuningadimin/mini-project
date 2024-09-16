/**
 * Saves the authentication token to localStorage.
 * @param token - The token to be stored.
 */
export const saveToken = (token: string): void => {
    if (typeof window !== 'undefined') { 
      localStorage.setItem('token', token);
    }
  };
  
  /**
   * Retrieves the authentication token from localStorage.
   * @returns The stored token or null if not found.
   */
  export const getToken = (): string | null => {
    if (typeof window !== 'undefined') { // Ensure code runs only on the client-side
      return localStorage.getItem('token');
    }
    return null;
  };
  
  /**
   * Removes the authentication token from localStorage.
   */
  export const removeToken = (): void => {
    if (typeof window !== 'undefined') { // Ensure code runs only on the client-side
      localStorage.removeItem('token');
    }
  };

  export const saveRole = (role: string): void => {
    if (typeof window !== 'undefined') { 
      localStorage.setItem('role', role);
    }
  };
  
  /**
   * Retrieves the authentication token from localStorage.
   * @returns The stored token or null if not found.
   */
  export const getRole = (): string | null => {
    if (typeof window !== 'undefined') { // Ensure code runs only on the client-side
      return localStorage.getItem('role');
    }
    return null;
  };
  
  /**
   * Removes the authentication token from localStorage.
   */
  export const removeRole = (): void => {
    if (typeof window !== 'undefined') { // Ensure code runs only on the client-side
      localStorage.removeItem('role');
    }
  };

  

