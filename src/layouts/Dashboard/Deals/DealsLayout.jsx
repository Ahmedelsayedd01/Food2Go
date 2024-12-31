import React, { useEffect, useState } from 'react'
import { useGet } from '../../../Hooks/useGet';
import { TitlePage, TitleSection } from '../../../Components/Components';
import { AddDealSection, DealsPage } from '../../../Pages/Pages';

const DealsLayout = () => {
       const { refetch: refetchDeals, loading: loadingDeals, data: dataDeals } = useGet({ url: 'https://bcknd.food2go.online/admin/deal' });

       const [refetch, setRefetch] = useState(false)

       const [deals, setDeals] = useState([]);


       // Fetch Deals Pending when the component mounts or when refetch is called
       useEffect(() => {
              refetchDeals();
       }, [refetchDeals, refetch]);

       // Update Deals when `data` changes
       useEffect(() => {
              if (dataDeals && dataDeals.deals) {
                     setDeals(dataDeals.deals);
              }
              console.log('dataDeals', dataDeals)
       }, [dataDeals]); // Only run this effect when `data` changes


       return (
              <>
                     <TitlePage text={'Add Deal'} />
                     <AddDealSection refetch={refetch} setRefetch={setRefetch} />
                     <TitleSection text={'Deals Table'} />
                     <DealsPage data={deals} setDeals={setDeals} loading={loadingDeals} />
              </>
       )
}

export default DealsLayout