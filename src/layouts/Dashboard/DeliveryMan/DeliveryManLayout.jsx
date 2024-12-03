import React, { useEffect, useState } from 'react'
import { TitlePage, TitleSection } from '../../../Components/Components'
import { AddDeliveryManSection, DeliveryManPage } from '../../../Pages/Pages'
import { useGet } from '../../../Hooks/useGet';

/* admin/delivery/add */
/* f name, l name, identity_type{card, passpoart}, identity_number, email,phone,password,branch_id,status
image,identity_image */

const DeliveryManLayout = () => {
       const { refetch: refetchDeliveries, loading: loadingDeliveries, data: dataDeliveries } = useGet({ url: 'https://Bcknd.food2go.online/admin/delivery' });

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
                     setBranches(dataDeliveries.branches);
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