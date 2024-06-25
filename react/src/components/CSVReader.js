import React, { useEffect } from 'react';
import Papa from 'papaparse';

const CSVReader = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchCSV = async () => {
      const response = await fetch('/CSVs/support_de_vente_data.csv');
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); // the csv text
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          onDataLoaded(results.data);
        },
      });
    };
    
    fetchCSV();
  }, [onDataLoaded]);

  return (
    <div>
      <p>Loading CSV data...</p>
    </div>
  );
};

export default CSVReader;
