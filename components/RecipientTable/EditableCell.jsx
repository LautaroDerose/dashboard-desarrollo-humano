import React, { useEffect, useState } from 'react'

const EditableCell = ({ getValue, row, column, table }) => {

  const initialValue = getValue()
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(
      row.index,
      column.id,
      value
    )
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])  

  return (
    <input 
      value={value}
      onChange={ e => setValue(e.target.value) }
      onBlur={onBlur}
      className=' overflow-hidden bg-slate-100 text-slate-800'

    />
  )
}

export default EditableCell
