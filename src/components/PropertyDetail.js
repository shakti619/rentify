import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyDetail = ({ token, propertyId }) => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the property details!",
          error
        );
      });
  }, [token, propertyId]);

  const handleInterest = () => {
    axios
      .post(
        `http://localhost:5000/properties/${propertyId}/interest`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Interest email sent!", response.data);
      })
      .catch((error) => {
        console.error("There was an error sending the interest email!", error);
      });
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Rent: {property.rent}</p>
      <p>
        Seller: {property.seller.firstName} {property.seller.lastName}
      </p>
      <button onClick={handleInterest}>I'm Interested</button>
    </div>
  );
};

export default PropertyDetail;
