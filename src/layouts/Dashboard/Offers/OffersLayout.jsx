import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components';
import { AddOfferSection, OffersPage } from '../../../Pages/Pages';
import { useGet } from '../../../Hooks/useGet';

const OffersLayout = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchOffers, loading: loadingOffers, data: dataOffers } = useGet({
              url: `${apiUrl}/admin/offer`
       });

       const [refetch, setRefetch] = useState(false)

       const [offers, setOffers] = useState([]);


       // Fetch Offers Pending when the component mounts or when refetch is called
       useEffect(() => {
              refetchOffers();
       }, [refetchOffers, refetch]);

       // Update Offers when `data` changes
       useEffect(() => {
              if (dataOffers && dataOffers.offers) {
                     setOffers(dataOffers.offers);
              }
              console.log('dataOffers', dataOffers)
       }, [dataOffers]); // Only run this effect when `data` changes


       return (
              <>
                     <TitlePage text={'Add Offer'} />
                     <AddOfferSection refetch={refetch} setRefetch={setRefetch} />
                     <TitleSection text={'Offers Table'} />
                     <OffersPage data={offers} setOffers={setOffers} loading={loadingOffers} />
              </>
       )
}

export default OffersLayout