"use client";
import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import Firestore instance
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const FirebaseCrud = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "crudTableData"));
      setTableData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editClick) {
      // Update the document in Firestore
      const docRef = doc(db, "crudTableData", editId);
      await updateDoc(docRef, inputs);
    } else {
      // Add a new document to Firestore
      await addDoc(collection(db, "crudTableData"), inputs);
    }

    setInputs({
      name: "",
      email: "",
    });
    setEditClick(false);
    setEditId("");

    // Refetch data to update table
    const querySnapshot = await getDocs(collection(db, "crudTableData"));
    setTableData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleDelete = async (id) => {
    // Delete the document from Firestore
    const docRef = doc(db, "crudTableData", id);
    await deleteDoc(docRef);

    // Refetch data to update table
    const querySnapshot = await getDocs(collection(db, "crudTableData"));
    setTableData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleEdit = (id) => {
    const item = tableData.find((item) => item.id === id);
    setInputs({ name: item.name, email: item.email });
    setEditClick(true);
    setEditId(id);
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
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FirebaseCrud;
