import React, { useState } from "react";

const FreeTrialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ph_number: "",
    free_trial_course: "",
    enrolled_date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value.trim() === "")) {
      alert("Please fill out all fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); 
    setFormData({
      name: "",
      email: "",
      ph_number: "",
      free_trial_course: "",
      enrolled_date: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create Free Trial</h2>
      {submitted && <div className="alert alert-success">Free Trial Created Successfully!</div>}
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="ph_number"
            value={formData.ph_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Free Trial Course</label>
          <input
            type="text"
            className="form-control"
            name="free_trial_course"
            value={formData.free_trial_course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enrolled Date</label>
          <input
            type="date"
            className="form-control"
            name="enrolled_date"
            value={formData.enrolled_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FreeTrialForm;
