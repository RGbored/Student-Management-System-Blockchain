import React, { useState } from 'react';

function Registrationform({formData, setFormData}) {

  // const [formData, setFormData] = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="Registrationform">
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label>Rollno :</label>
        <input
          type="text"
          name="rollno"
          placeholder="Enter Rollno"
          value={formData.rollNo}
          onChange={handleChange}
        />
        <br />
        <label>Admission Number :</label>
        <input
          type="text"
          name="admno"
          placeholder="Enter Admission Number"
          value={formData.admissionNumber}
          onChange={handleChange}
        />
        <br />
        <label>Course :</label>
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={formData.course}
          onChange={handleChange}
        />
        <br />
        <label>Branch :</label>
        <input
          type="text"
          name="branch"
          placeholder="Enter Branch"
          value={formData.branch}
          onChange={handleChange}
        />
        <br />
        <label>Year :</label>
        <input
          type="text"
          name="year"
          placeholder="Enter Year"
          value={formData.year}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Registrationform;
