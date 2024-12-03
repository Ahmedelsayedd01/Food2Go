import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth";
import { useSelector } from "react-redux";

export const useChangeState = () => {
  const auth = useAuth();
  const user = useSelector(state => state.user)
  const [loadingChange, setLoadingChange] = useState(false);
  const [responseChange, setResponseChange] = useState(null);

  const changeState = async (url, name, data) => { // Accepting a single "data" object
    setLoadingChange(true);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user?.token || ''}`,
        },
      };

      // Send the "data" object directly as the request body

      const response = await axios.put(url, data || {}, config);

      if (response.status === 200) {
        setResponseChange(response);
        auth.toastSuccess(name);
        return true; // Return true on success
      }
    } catch (error) {
      auth.toastError(error.message);
      console.error('Error changing state:', error);
      return false; // Return false on error
    } finally {
      setLoadingChange(false);
    }
  };

  return { changeState, loadingChange, responseChange };
};
