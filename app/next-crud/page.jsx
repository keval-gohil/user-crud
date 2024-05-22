"use client";
import React, { useState, useEffect } from "react";

const Crud = () => {
  const LOCAL_STORAGE_KEY = "crudTableData"; 

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedData) setTableData(storedData);
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTableData = [...tableData]; 

    if (editClick) {
      newTableData[editIndex] = inputs;
    } else {
      newTableData.push(inputs);
    }

    setTableData(newTableData);
    setInputs({
      name: "",
      email: "",
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTableData));
  };

  const handleDelete = (index) => {
    const newTableData = tableData.filter((item, i) => i !== index);
    setTableData(newTableData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTableData)); 
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>Crud App</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" value={inputs.email} onChange={handleChange} />
          </div>
          <button type="submit">
            {editClick ? "Update" : "Add"}
          </button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crud;
