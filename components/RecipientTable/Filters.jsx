import React from 'react'
import { FaSearch } from "react-icons/fa";
import FilterPopover from './FilterPopover';
import ColumnVisibilityButton from './ColumnVisibilityButton';
import { Button } from '../ui/button';


const Filters = ({ columnFilters, setColumnFilters, columnVisibility, columnNames, toggleColumnVisibility }) => {

  const firstName = columnFilters.find( (f) => f.id === 'firstName' )?.value || '';

  const onFilterChange = (id, value) => setColumnFilters(
    prev => prev
    .filter(f => f.id !== id )
    .concat({id, value})
  )

  return (
    <div className='flex items-center gap-4 my-4'>
      <div className='flex h-10 items-center gap-2 bg-gray-700 w-fit p-2 rounded-md'>
        <span style={{ pointerEvents: 'none' }}>
          <FaSearch className='text-slate-800' />
        </span>
        <input 
          type='text'
          placeholder=' Buscar por nombre'
          className='bg-transparent text-slate-800 outline-none'
          value={firstName}
          onChange={(e) => onFilterChange('firstName', e.target.value)}
        />
      </div>
      <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <ColumnVisibilityButton columnVisibility={columnVisibility} columnNames={columnNames} toggleColumnVisibility={toggleColumnVisibility} /> 
      <Button variant="outline" >Prueba</Button>
    </div>
  )
}

export default Filters
