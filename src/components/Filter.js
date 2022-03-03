import React from 'react';

const Filter = ({searchCountry, handleSearchChange}) => {
  return (
    <div>
      find countries: <input value={searchCountry} onChange={handleSearchChange}/>
    </div>
  )
}

export default Filter