import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyList = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:5000/properties", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the properties!", error);
      });
  }, [token]);

  const handleLike = (propertyId) => {
    axios
      .post(
        `http://localhost:5000/properties/${propertyId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setProperties(
          properties.map((property) =>
            property._id === propertyId ? response.data : property
          )
        );
      })
      .catch((error) => {
        console.error("There was an error liking the property!", error);
      });
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {currentProperties.map((property) => (
          <li key={property._id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>{property.location}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Rent: {property.rent}</p>
            <p>
              Seller: {property.seller.firstName} {property.seller.lastName}
            </p>
            <p>Likes: {property.likes || 0}</p>
            <button onClick={() => handleLike(property._id)}>Like</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from(
          { length: Math.ceil(properties.length / propertiesPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PropertyList;
