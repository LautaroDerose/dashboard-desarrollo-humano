'use client'
import { useEffect, useState } from 'react';

const LocalitiesAndStreets = () => {
  const [data, setData] = useState({ localities: [], loading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/localities');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setData({ localities: result, loading: false, error: null });
      } catch (error) {
        setData({ localities: [], loading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  return (
    <div>
      <h1>Localities and Streets</h1>
      {data.localities.map((locality) => (
        <div key={locality.id}>
          <h2>{locality.name}</h2>
          <ul>
            {locality.Street.map((street) => (
              <li key={street.id}>{street.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LocalitiesAndStreets;