import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth"; // Make sure to import useAuth if required
import { TfiUppercase } from "react-icons/tfi";
import { useSelector } from "react-redux";

export const usePost = ({ url, login = false, type = false }) => {
       const auth = useAuth();
       const user = useSelector(state => state.user)
       const [loadingPost, setLoadingPost] = useState(false);
       const [response, setResponse] = useState(null);

       const postData = async (data, name) => {
              setLoadingPost(true);
              try {
                     const contentType = type ? 'application/json' : 'multipart/form-data';
                     const config = !login && user?.token
                            ? {
                                   headers: {
                                          'Content-Type': contentType,
                                          'Authorization': `Bearer ${user?.token || ''}`,
                                   },
                            }
                            : {
                                   headers: { 'Content-Type': contentType },
                            };

                     const response = await axios.post(url, data, config);

                     if (response.status === 200) {
                            setResponse(response);
                            auth.toastSuccess(name)
                     }
              } catch (error) {
                     auth.toastError(error.message)
                     console.error('error post Json', error);
              } finally {
                     setLoadingPost(false);
              }
       };

       return { postData, loadingPost, response };
};
