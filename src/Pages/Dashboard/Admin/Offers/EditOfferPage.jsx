import React, { useEffect, useRef, useState } from 'react'
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import { useNavigate, useParams } from 'react-router-dom';
import { LoaderLogin, NumberInput, StaticButton, SubmitButton, TextInput, UploadInput } from '../../../../Components/Components';
import { useAuth } from '../../../../Context/Auth';


const EditOfferPage = () => {
       const { offerId } = useParams();
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({
              url: `${apiUrl}/admin/translation`
       });
       const { refetch: refetchOffer, loading: loadingOffer, data: dataOffer } = useGet({ url: `${apiUrl}/admin/offer/item/${offerId}` });
       const { postData, loadingPost, response } = usePost({ url: `${apiUrl}/admin/offer/update/${offerId}` });

       const ImageRef = useRef();
       const auth = useAuth();
       const navigate = useNavigate();

       const [taps, setTaps] = useState([])
       const [currentTap, setCurrentTap] = useState(0);

       const [offerNames, setOfferNames] = useState([]);
       const [points, setPoints] = useState('');

       const [image, setImage] = useState('');
       const [imageFile, setImageFile] = useState(null);

       useEffect(() => {
              refetchTranslation(); // Refetch data when the component mounts
              refetchOffer(); // Refetch data when the component mounts
       }, [refetchTranslation, refetchOffer]);

       useEffect(() => {
              if (dataTranslation) {
                     setTaps(dataTranslation.translation);
              }
       }, [dataTranslation]);

       useEffect(() => {
              if (dataOffer && dataOffer.offer) {

                     const newOfferNames = [];
                     if (dataOffer.offer.offer_names) {
                            dataOffer.offer.offer_names.forEach((offer) => {
                                   let obj = {
                                          tranlation_id: offer.tranlation_id || '-',  // Use '' if id is missing
                                          tranlation_name: offer.tranlation_name || 'Default Language',  // Fallback value
                                          offer_product: offer.offer_product || '-',  // Use '' if name is missing
                                   };
                                   newOfferNames.push(obj);
                            });
                     }
                     setOfferNames(newOfferNames.length > 0 ? newOfferNames : []);

                     console.log('offerNames edite', offerNames)


                     setPoints(dataOffer?.offer?.points || points)
                     setImage(dataOffer?.offer?.image_link || image)
                     setImageFile(dataOffer?.offer?.image_link || imageFile)
              }
              console.log('dataOffer', dataOffer)
       }, [dataOffer]);


       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setImageFile(file);
                     setImage(file.name);
              }
       };
       const handleImageClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };


       const handleTap = (index) => {
              setCurrentTap(index)
       }

       useEffect(() => {
              console.log('offerNames', offerNames)
       }, [offerNames])

       useEffect(() => {
              console.log('response', response);
              if (!loadingPost && response) {
                     handleCancel();
              }
       }, [loadingPost, response]);


       const handleCancel = () => {
              navigate(-1, { replace: true });
       };



       const handleOfferEdit = (e) => {
              e.preventDefault();

              if (offerNames.length === 0) {
                     auth.toastError('please Enter Offer Names')
                     return;
              }
              // if (offerNames.length !== taps.length) {
              //        auth.toastError('please Enter All Offer Names')
              //        return;
              // }

              if (!imageFile) {
                     auth.toastError('please Set Offer Image')
                     return;
              }
              const formData = new FormData();

              offerNames.forEach((name, index) => {
                     // Corrected the typo and added translation_id and translation_name
                     formData.append(`offer_names[${index}][offer_product]`, name.offer_product);
                     formData.append(`offer_names[${index}][tranlation_id]`, name.translation_id);
                     formData.append(`offer_names[${index}][tranlation_name]`, name.translation_name);
              });

              formData.append('points', points);
              formData.append('image', imageFile);


              postData(formData, 'Offer Added Success');

       };
       return (
              <>
                     {loadingTranslation || loadingOffer || loadingPost ? (
                            <>
                                   <div className="w-full flex justify-center items-center">
                                          <LoaderLogin />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleOfferEdit}>
                                          {/* Taps */}
                                          <div className="w-full flex items-center justify-start py-2 gap-x-6">
                                                 {taps.map((tap, index) => (
                                                        <span
                                                               key={tap.id}
                                                               onClick={() => handleTap(index)}
                                                               className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text - xl font - TextFontMedium transition - colors duration - 300 cursor - pointer hover: text - mainColor`}
                                                        >
                                                               {tap.name}
                                                        </span>

                                                 ))}
                                          </div>
                                          {/* Content*/}
                                          <div className="sm:py-3 lg:py-6">
                                                 {taps.map((tap, index) => (
                                                        currentTap === index && (
                                                               <div
                                                                      className="w-full flex sm:flex-col lg:flex-row flex-wrap items-center justify-start gap-4"
                                                                      key={tap.id}
                                                               >
                                                                      {/* Name Input */}
                                                                      <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                             <span className="text-xl font-TextFontRegular text-thirdColor">Name {tap.name}:</span>
                                                                             <TextInput
                                                                                    value={offerNames[index]?.offer_product} // Access offer_product property
                                                                                    onChange={(e) => {
                                                                                           const inputValue = e.target.value; // Ensure this is a string
                                                                                           setOfferNames(prev => {
                                                                                                  const updatedNames = [...prev];

                                                                                                  // Ensure the array is long enough
                                                                                                  if (updatedNames.length <= index) {
                                                                                                         updatedNames.length = index + 1; // Resize array
                                                                                                  }

                                                                                                  // Create or update the object at the current index
                                                                                                  updatedNames[index] = {
                                                                                                         ...updatedNames[index], // Retain existing properties if any
                                                                                                         'tranlation_id': tap.id, // Use the ID from tap
                                                                                                         'offer_product': inputValue, // Use the captured string value
                                                                                                         'tranlation_name': tap.name || 'Default Name', // Use tap.name for tranlation_name
                                                                                                  };

                                                                                                  return updatedNames;
                                                                                           });
                                                                                    }}
                                                                                    placeholder="Offer Name"
                                                                             />
                                                                      </div>

                                                                      {/* Conditional Rendering for First Tab Only */}
                                                                      {currentTap === 0 && (
                                                                             <>
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Points :</span>
                                                                                           <NumberInput
                                                                                                  value={points} // Access addon_name property
                                                                                                  onChange={(e) => setPoints(e.target.value)}
                                                                                                  placeholder="Points"
                                                                                           />
                                                                                    </div>
                                                                                    {/* Category Image */}
                                                                                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                                                                           <span className="text-xl font-TextFontRegular text-thirdColor">Offer Image:</span>
                                                                                           <UploadInput
                                                                                                  value={image}
                                                                                                  uploadFileRef={ImageRef}
                                                                                                  placeholder="Offer Image"
                                                                                                  handleFileChange={handleImageChange}
                                                                                                  onChange={(e) => setImage(e.target.value)}
                                                                                                  onClick={() => handleImageClick(ImageRef)}
                                                                                           />
                                                                                    </div>

                                                                             </>
                                                                      )}
                                                               </div>
                                                        )
                                                 ))}


                                          </div>

                                          {/* Buttons*/}
                                          <div className="w-full flex items-center justify-end gap-x-4">
                                                 <div className="">
                                                        <StaticButton text={'Cancel'} handleClick={handleCancel} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Edit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleOfferEdit}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default EditOfferPage