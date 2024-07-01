'use client'

import React, { useState, useEffect } from 'react';

const DetailView2 = ({ recipientId }) => {
  const [recipientData, setRecipientData] = useState(null);

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const response = await fetch(`/api/recipient/${recipientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipient data');
        }
        const data = await response.json();
        setRecipientData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipientData();
  }, [recipientId]);

  if (!recipientData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Recipient Details</h1>
      <p>ID: {recipientData.id}</p>
      <p>First Name: {recipientData.first_name}</p>
      <p>Last Name: {recipientData.last_name}</p>
      <p>Birth Date: {recipientData.birth_date}</p>
      <p>DNI: {recipientData.dni}</p>
      <p>Sex: {recipientData.sex}</p>
      <p>Enrollment Date: {recipientData.enrollment_date}</p>
      <p>Is Active: {recipientData.is_active ? 'Yes' : 'No'}</p>
      <h2>Contact Info</h2>
      {recipientData.contact_info.map(contact => (
        <div key={contact.id}>
          <p>Phone: {contact.phone}</p>
          <p>Email: {contact.email}</p>
          <p>Street: {contact.street.name}</p>
          <p>Locality: {contact.locality.name}</p>
        </div>
      ))}
      <h2>Recipient Social Conditions</h2>
      {recipientData.recipientSocialConditions.map(condition => (
        <div key={condition.id}>
          <p>Social Condition: {condition.social_condition.name}</p>
          <p>Gravity: {condition.social_condition.gravity}</p>
          <p>Type: {condition.social_condition.type}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailView2;