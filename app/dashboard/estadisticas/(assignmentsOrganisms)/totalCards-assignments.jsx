'use client';

import { getAssignmentsForLocalities } from '@/actions/estadisticas-actions';
import React, { useState, useEffect } from 'react';

export default function TotalCards() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAssignmentsForLocalities();
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error('Expected data to be an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Asignaciones por localidad</h1>
      <ul>
        {results.map((result) => (
          <li key={result.localityId}>
            Localidad {result.localityId}: {result.count} asignaciones
          </li>
        ))}
      </ul>
    </div>
  );
}