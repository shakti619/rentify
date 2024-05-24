import React, { useState } from "react";
import axios from "axios";

const AddProperty = ({ token }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    rent: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!form.title) formErrors.title = "Title is required";
    if (!form.description) formErrors.description = "Description is required";
    if (!form.location) formErrors.location = "Location is required";
    if (form.bedrooms <= 0)
      formErrors.bedrooms = "Bedrooms must be greater than 0";
    if (form.bathrooms <= 0)
      formErrors.bathrooms = "Bathrooms must be greater than 0";
    if (form.rent <= 0) formErrors.rent = "Rent must be greater than 0";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      axios
        .post("http://localhost:5000/properties", form, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Property added!", response.data);
        })
        .catch((error) => {
          console.error("There was an error adding the property!", error);
        });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        {errors.location && <span>{errors.location}</span>}
      </div>
      <div>
        <label>Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
        />
        {errors.bedrooms && <span>{errors.bedrooms}</span>}
      </div>
      <div>
        <label>Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
        />
        {errors.bathrooms && <span>{errors.bathrooms}</span>}
      </div>
      <div>
        <label>Rent:</label>
        <input
          type="number"
          name="rent"
          value={form.rent}
          onChange={handleChange}
        />
        {errors.rent && <span>{errors.rent}</span>}
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
