import React, { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../styles/buttons";

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 300px;
  resize: none;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const SuccessMessage = styled.p`
  margin-top: 20px;
  color: green;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullNameError: "",
    subjectError: "",
    emailError: "",
    bodyError: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, subject, email, body } = formData;
    const errors = {};

    if (fullName.trim().length < 3) {
      errors.fullNameError = "Full name must be at least 3 characters long.";
    }

    if (subject.trim().length < 3) {
      errors.subjectError = "Subject must be at least 3 characters long.";
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.emailError = "Invalid email address.";
    }

    if (body.trim().length < 3) {
      errors.bodyError = "Body must be at least 3 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log(formData);
      setSuccessMessage("Message successfully sent!");
      setFormData({
        fullName: "",
        subject: "",
        email: "",
        body: "",
      });
      setFormErrors({});
    }
  };

  return (
    <ContactContainer>
      <h1>Contact Page</h1>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      <ContactForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name:</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          {formErrors.fullNameError && (
            <ErrorMessage>{formErrors.fullNameError}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="subject">Subject:</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
          {formErrors.subjectError && (
            <ErrorMessage>{formErrors.subjectError}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.emailError && (
            <ErrorMessage>{formErrors.emailError}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Body:</Label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            rows="10"
            required
          ></TextArea>
          {formErrors.bodyError && (
            <ErrorMessage>{formErrors.bodyError}</ErrorMessage>
          )}
        </FormGroup>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
