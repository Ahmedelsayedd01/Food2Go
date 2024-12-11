import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import { NumberInput, StaticButton, StaticLoader, SubmitButton, TextInput, UploadInput } from '../../../../Components/Components';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';


const AddOfferSection = ({ refetch, setRefetch }) => {
       const { refetch: refetchTranslation, loading: loadingTranslation, data: dataTranslation } = useGet({ url: 'https://Bcknd.food2go.online/admin/translation' });
       const { postData, loadingPost, response } = usePost({ url: 'https://Bcknd.food2go.online/admin/offer/add' });

       const ImageRef = useRef();
       const auth = useAuth();

       const [taps, setTaps] = useState([])
       const [currentTap, setCurrentTap] = useState(0);

       const [offerNames, setOfferNames] = useState([]);
       const [points, setPoints] = useState('');

       const [image, setImage] = useState('');
       const [imageFile, setImageFile] = useState(null);

       useEffect(() => {
              refetchTranslation(); // Refetch data when the component mounts
       }, [refetchTranslation]);

       useEffect(() => {
              if (dataTranslation) {
                     setTaps(dataTranslation.translation);
              }
       }, [dataTranslation]);

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
              console.log('response', response)
              if (!loadingPost) {
                     handleReset()
              }

              setRefetch(!refetch)
       }, [response])

       const handleReset = () => {
              setCurrentTap(0)
              offerNames.map((name, index) => {

                     setOfferNames(prev => {
                            const updatedNames = [...prev];

                            // Ensure the array is long enough
                            if (updatedNames.length <= index) {
                                   updatedNames.length = index + 1; // Resize array
                            }

                            // Create or update the object at the current index
                            updatedNames[index] = {
                                   ...updatedNames[index], // Retain existing properties if any
                                   'tranlation_id': '', // Use the ID from tap
                                   'offer_product': '', // Use the captured string value
                                   'tranlation_name': '', // Use tap.name for tranlation_name
                            };

                            return updatedNames;
                     });
              })
              setPoints('')
              setImage('')
              setImageFile(null)
       }



       const handleOfferAdd = (e) => {
              e.preventDefault();

              if (offerNames.length === 0) {
                     auth.toastError('please Enter Offer Names')
                     return;
              }
              if (offerNames.length !== taps.length) {
                     auth.toastError('please Enter All Offer Names')
                     return;
              }

              if (!imageFile) {
                     auth.toastError('please Set Offer Image')
                     return;
              }
              const formData = new FormData();

              offerNames.forEach((name, index) => {
                     // Corrected the typo and added translation_id and translation_name
                     formData.append(`offer_names[${index}][offer_product]`, name.offer_product);
                     formData.append(`offer_names[${index}][tranlation_id]`, name.tranlation_id);
                     formData.append(`offer_names[${index}][tranlation_name]`, name.tranlation_name);
              });

              formData.append('points', points);
              formData.append('image', imageFile);


              postData(formData, 'Offer Added Success');

       };
       return (
              <>
                     {loadingTranslation || loadingPost ? (
                            <>
                                   <div className="w-full h-56 flex justify-center items-center">
                                          <StaticLoader />
                                   </div>
                            </>
                     ) : (
                            <section>
                                   <form onSubmit={handleOfferAdd}>
                                          {/* Taps */}
                                          <div className="w-full flex items-center justify-start py-2 gap-x-6">
                                                 {taps.map((tap, index) => (
                                                        <span
                                                               key={tap.id}
                                                               onClick={() => handleTap(index)}
                                                               className={`${currentTap === index ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor'}  pb-1 text-xl font-TextFontMedium transition-colors duration-300 cursor-pointer hover:text-mainColor`}
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
                                                        <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
                                                 </div>
                                                 <div className="">
                                                        <SubmitButton
                                                               text={'Submit'}
                                                               rounded='rounded-full'
                                                               handleClick={handleOfferAdd}
                                                        />
                                                 </div>

                                          </div>
                                   </form>
                            </section>
                     )}
              </>
       )
}

export default AddOfferSection