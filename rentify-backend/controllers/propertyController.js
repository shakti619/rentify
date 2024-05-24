const Property = require("../models/Property");
const nodemailer = require("nodemailer");

exports.createProperty = async (req, res) => {
  const { title, description, location, bedrooms, bathrooms, rent, seller } =
    req.body;
  try {
    const property = new Property({
      title,
      description,
      location,
      bedrooms,
      bathrooms,
      rent,
      seller,
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("seller");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    property.likes = (property.likes || 0) + 1;
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.interestProperty = async (req, res) => {
  const { propertyId } = req.body;
  const user = req.user; // Assuming the user is authenticated and user info is in req.user

  try {
    const property = await Property.findById(propertyId).populate("seller");
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    // Send email to the seller
    const mailOptions = {
      from: "your-email@gmail.com",
      to: property.seller.email,
      subject: "Interest in your property",
      text: `Hello ${property.seller.firstName},\n\n${user.firstName} ${user.lastName} is interested in your property titled "${property.title}".\n\nContact details:\nEmail: ${user.email}\nPhone: ${user.phoneNumber}\n\nRegards,\nRentify`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Interest email sent to the seller" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
