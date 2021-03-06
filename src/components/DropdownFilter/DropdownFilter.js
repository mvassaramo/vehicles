import React from "react";
import Select from "react-select";

const DropdownFilter = props => {
  const options = [
    { label: 'Price Descending', value: 'Price DESC' },
    { label: 'Price Ascending', value: 'Price ASC' },
    { label: 'Range Descending', value: 'Range DESC' },
    { label: 'Range Ascending', value: 'Range ASC' }
  ]

  return (
    <Select
      options={options}
      onChange={props.onChange}
      value={props.selected}
    />
  )
}

export default DropdownFilter;