/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import { useState } from 'react';
import moment from 'moment';
import { ApiService } from 'services/apiservices';
let apiServices = new ApiService();
const PaymentForm = ({setLoader}) => {
  const didMountRef = useRef(true)
  const stripe = useStripe();
  const elements = useElements();
  const [currentDate, setCurrentDate] = useState("")
  const [vendorData, setVendorData] = useState("")
  const [membershipLastDate, setMembershipLastDate] = useState("")
  const cardElementOptions = {
    hidePostalCode: true, // This will hide the postal code field
  };
  function formatDateToDDMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear().toString();
 

    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    if (didMountRef.current) {

      apiServices.vendordataPostRequest({}).then(res => {
        if (res.data.status == 'success') {
          const date1String = new Date();
          const date2String = res.data.vendorData.membershipenddate;
          const date1 = moment(date1String);
          const date2 = moment(date2String);
          setCurrentDate(date1)
          setMembershipLastDate(date2)
          setVendorData(res.data.vendorData);
        }
        else if (res.data.message == 'Token Expired') {
          alert(res.data.message);
          localStorage.removeItem('AUTH_TOKEN');
          window.location.href = constant.FRONT_URL;
        }
      })
    }
    didMountRef.current = false;
  });

  const handleSubmit = async (type) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, so do nothing.
      return;
    }
    // Get a PaymentMethod object representing the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      // Handle error, display error to the user
      console.log(error.message);
      alert(error.message);
      return false;
    } else {
      // PaymentMethod ID
      const paymentMethodId = paymentMethod.id;
      console.log('sasas', paymentMethodId);
      // Call your API with the paymentMethodId  
      setLoader(true)   
      const datastring = {
        paymentMethodId: paymentMethodId,
        vendorname: vendorData.vendorname,
        vendor_id: vendorData._id,
        type: type
      };
      apiServices.membershippayment(datastring).then(response => {
        if (response.data.status == 'success') {
          alert(response.data.message)
          window.location.reload()
          setLoader(false)
        } else if (response.data.message == 'Token Expired') {
          alert(response.data.message);
          localStorage.removeItem('AUTH_TOKEN');
          window.location.href = constant.FRONT_URL;
          setLoader(false)
        }
        else if (response.data.status == 'error') {
          alert(response.data.message);
          setLoader(false)
          return false;
        }
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      {/* <div>
        <label>
          Card details
        </label>
      </div>
      <div className="text-center mt-4"> */}
      <div style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>

      <CardElement options={cardElementOptions} />
      </div>
      {membershipLastDate > currentDate ?
        <Button
          onClick={(event) => handleSubmit("purchase")}
          className="member-btn mt-4"
        >Purchase Plan
        </Button>
        : <Button
          onClick={(event) => handleSubmit("renew")}
          className="member-btn mt-4"
        >Renew Plan
        </Button>}

    </>
  );
};

export default PaymentForm;
