'use client';

import React, { useState, useEffect } from 'react';
import { getNames, deleteName, updateName } from '../services/name';

const NameList: React.FC = () => {
  const [names, setNames] = useState<{ _id: string; name: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>('');

  // Fetch names when the component mounts
  useEffect(() => {
    fetchNames();
  }, []);

  
  const fetchNames = async () => {
    console.log('Fetching names...');
    try {
      const data = await getNames();
      console.log('Data fetched:', data);
      setNames(data.names);
    } catch (error) {
      console.error('Failed to fetch names', error);
    }
  };


  const handleDelete = async (id: string) => {
    console.log(`Deleting name with id ${id}`);
    try {
      await deleteName(id);
      console.log('Name deleted successfully');
      await fetchNames(); // Ensure the list is refreshed after deletion
    } catch (error) {
      console.error('Failed to delete name', error);
    }
  };


  const handleUpdate = async () => {
    if (editingId && newName.trim()) {
      console.log(`Updating name with id ${editingId} to ${newName}`);
      try {
        await updateName(editingId, newName.trim());
        console.log('Name updated successfully');
        await fetchNames(); // Ensure the list is refreshed after update
        setEditingId(null);
        setNewName('');
      } catch (error) {
        console.error('Failed to update name', error);
      }
    }
  };


  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 bg-slate-50 text-black p-4 m-6 rounded-lg shadow-xl">
      <div className="flex flex-col w-full max-w-4xl">
        <h1 className="font-semibold text-center text-2xl mb-4">Todo List</h1>
        <ul className="space-y-4">
          {names.map((item) => (
            <li
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row justify-between items-center"
            >
              <p className="bg-slate-200 rounded-lg px-4 py-2">{item.name}</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setNewName(item.name); // Pre-fill the input with current name
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editingId && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <input
              title="name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameList;
