import CSVReader from './components/CsvReader/CsvReader.tsx';
import { useState } from 'react';
import { CSVData } from './types/types.ts';
import UsersTable from './components/UsersTable/UsersTable.tsx';

import './App.css';

function App() {
  const [data, setData] = useState<CSVData[]>([]);
  const [error, setError] = useState<string>('');

  const handleChangeData = (data: CSVData[]) => setData(data);
  const handleChangeError = (value: string) => setError(value);

  console.log('data', data);

  return (
    <>
      <CSVReader
        handleChangeData={handleChangeData}
        handleChangeError={handleChangeError}
      />
      <UsersTable data={data} error={error} />
      {error && <div className="error-message">{error}</div>}
    </>
  );
}

export default App;
