import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    problemCode: '', 
    problemType: 'mcq',
    problemName: '',
    problemStatement: '',
    mcqOptions: [],
    problemMarks: 0
  });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const options = [...formData.mcqOptions];
      options[index].isCorrect = checked;
      setFormData({ ...formData, mcqOptions: options });
    } else if (name === 'mcqOption') {
      const options = [...formData.mcqOptions];
      options[index].option = value;
      setFormData({ ...formData, mcqOptions: options });
    }else if(name === 'problemType'){
      setFormData({ ...formData, problemType: value });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addOption = () => {
    setFormData({
      ...formData,
      mcqOptions: [...formData.mcqOptions, { option: '', isCorrect: false }],
    });
  };

  const deleteOption = (index) => {
    const options = [...formData.mcqOptions];
    options.splice(index, 1);
    setFormData({ ...formData, mcqOptions: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add/problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="problemCode">Problem Code:</label>
              </td>
              <td>
              <input
                type="text"
                id="problemCode"
                name="problemCode"
                value={formData.problemCode}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="problemName">Problem Name:</label>
              </td>
              <td>
              <input
                type="text"
                id="problemName"
                name="problemName"
                value={formData.problemName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="problemType">Problem Type:</label>
            </td>
            <td>
              <select
                id="problemType"
                name="problemType"
                value={formData.problemType}
                onChange={handleChange}
              >
                <option value="mcq">mcq</option>
                <option value="longAnswer">long answer</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="problemMarks">Problem Marks:</label>
              </td>
              <td>
              <input
                type='number'
                id="problemMarks"
                name="problemMarks"
                value={formData.problemMarks}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="problemStatement">Problem Statement:</label>
              </td>
              <td>
              <textarea
                id="problemStatement"
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table>
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Correct Option</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.mcqOptions.map((option, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name="mcqOption"
                          value={option.option}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="isCorrect"
                          checked={option.isCorrect}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => deleteOption(index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" onClick={addOption}>
        Add Option
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
