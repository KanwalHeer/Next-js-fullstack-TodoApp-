'use client'
import React, { useState } from 'react';
import { createName } from '../services/name';

const CreateName: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createName(name);
      setName('');
    } catch (error) {
      console.error('Failed to create name', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h2 className='text-2xl md:text-xl lg:text-4xl font-extrabold pt-10'>Add Todo</h2>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center sm:flex-col gap-6 md:flex-row lg:flex-row xl:flex-row'>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter todo"
          className='text-black lg:px-12 lg:py-3 px-8 py-3  md:px-8 md:py-4  rounded-lg'
        />
        <button type="submit" className='bg-blue-300  h-12 w-20 rounded-xl text-black font-bold hover:bg-blue-400'>Add</button>
      </form>
    </div>
  );
};

export default CreateName;
