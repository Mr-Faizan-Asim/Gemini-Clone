import React, { useState } from 'react';
import './Form.css';
import { db } from "../../firebaseConfig"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore"; 

const Form = () => {
  const [formData, setFormData] = useState({
    submissionId: '',
    respondentId: '',
    name: '',
    age: '',
    gender: '',
    location: '',
    language: '',
    preferences: '',
    hobbies: '',
    favoriteTopics: '',
    preferredActivities: '',
    medicineTime: '',
    sensoryImpairments: '',
    historyOfLoneliness: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with formData
      const docRef = await addDoc(collection(db, "formData"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="form-container">
      <h2>Information Collection Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
