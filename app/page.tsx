import React from 'react';
import NameList from './components/nameList';
import CreateName from './components/createName';

const HomePage: React.FC = () => {
  return (
    <div>
      <CreateName />
      <NameList />
    </div>
  );
};

export default HomePage;
