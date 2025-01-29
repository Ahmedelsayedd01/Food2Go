import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddDeliveryManSection, DeliveryManPage } from '../../../Pages/Pages'
import { useGet } from '../../../Hooks/useGet';


const DeliveryManLayout = () => {
       const apiUrl = import.meta.env.VITE_API_BASE_URL;
       const { refetch: refetchDeliveries, loading: loadingDeliveries, data: dataDeliveries } = useGet({
              url: `${apiUrl}/admin/delivery`
       });

       const [refetch, setRefetch] = useState(false)

       const [deliveries, setDeliveries] = useState([]);
       const [branches, setBranches] = useState([]);


       // Fetch Deliveries Pending when the component mounts or when refetch is called
       useEffect(() => {
              refetchDeliveries();
       }, [refetchDeliveries, refetch]);

       // Update Deliveries when `data` changes
       useEffect(() => {
              if (dataDeliveries && dataDeliveries.deliveries && dataDeliveries.branches) {
                     setDeliveries(dataDeliveries.deliveries);
                     setBranches([{ id: '', name: 'Select Branche' }, ...dataDeliveries.branches] || []);
              }
              console.log('dataDeliveries', dataDeliveries)
       }, [dataDeliveries]); // Only run this effect when `data` changes


       return (
              <>
                     <TitlePage text={'Add Delivery'} />
                     <AddDeliveryManSection data={branches} refetch={refetch} setRefetch={setRefetch} />
                     <TitleSection text={'Deliveries Table'} />
                     <DeliveryManPage data={deliveries} setDeliveries={setDeliveries} loading={loadingDeliveries} />
              </>
       )
}

export default DeliveryManLayout