const handleApiError = (error) => {
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error('Error Response:', error.response.data);
      throw new Error(error.response.data.message || 'Something went wrong');
    } else if (error.request) {
      // No response received
      throw new Error('Network error, please try again');
    } else {
      // Other errors
      throw new Error(error.message);
    }
  };

  export default handleApiError;