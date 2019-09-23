import React from 'react';

// components
import { Header } from '../components/Surfaces';
import { Select } from '../components/Inputs';
import { Table } from '../components/DataDisplay';

const App = () => {
  return (
    <>
      <Header title="Search Mellow Pages" />
      <Select />
      <Table />
    </>
  );
};

export default App;
