import React from "react";
import "./VehicleCard.css"

const VehicleCard = (props) => {
  const { photo, make, model, price, range } = props.vehicle

  return(
    <div className="vehicle-card">
     <img src={photo} alt="vehicle" />
      <div className="vehicle-card-content">
        <p>Make: {make}</p>
        <p>Model: {model}</p>
        <p>Price: {price}</p>
        <p>{range.distance}</p>
      </div>
    </div>
  )
}

export default VehicleCard;