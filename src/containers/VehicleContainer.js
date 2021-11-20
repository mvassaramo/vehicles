import React from "react";
import './VehicleContainer.css';
import VehicleCard from '../components/VehicleCard';
import DropdownFilter from '../components/DropdownFilter'

class VehicleContainer extends React.Component {
  state = {
    vehicles: [],
    loading: true,
    sortBy: undefined,
  }

  async componentDidMount() {
    const url = 'https://6157228e8f7ea600179850e4.mockapi.io/api/vehicles'

    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState({ vehicles: data, loading: false })
    } catch (e) {
      return null
    }
  }

  sortedVehicles  = () => {
    if (this.state.sortBy === 'Range ASC') {
      return this.state.vehicles.sort((a, b) => this.sortAscending(a.range.distance, b.range.distance))
    } else if (this.state.sortBy === 'Range DESC') {
      return this.state.vehicles.sort((a, b) => this.sortDescending(a.range.distance, b.range.distance))
    } else if (this.state.sortBy === 'Price ASC') {
      return this.state.vehicles.sort((a, b) => this.sortAscending(parseInt(a.price.split(" ")[0]), parseInt(b.price.split(" ")[0])))
    } else if (this.state.sortBy === 'Price DESC') {
      return this.state.vehicles.sort((a, b) => this.sortDescending(parseInt(a.price.split(" ")[0]), parseInt(b.price.split(" ")[0])))
    } else {
      return this.state.vehicles
    }
  }

  sortAscending =  (a, b ) => {
    if ( a < b ) {
      return -1;
    }
    else if ( a > b ){
      return 1;
    }
    return 0;
  }

  sortDescending = (a, b) => {
    if ( a > b ) {
      return -1;
    }
    else if ( a < b ) {
      return 1;
    }
    return 0;
  }

  renderVehicleList = () => {
    const vehicles = this.state.sortBy ? this.sortedVehicles() : this.state.vehicles

    return vehicles.map((vehicle) => {
      return <VehicleCard key={vehicle.id} vehicle={vehicle}/>
    }) 
  }

  handleSortByChange = (selectedOption) => {
    this.setState({ sortBy: selectedOption.value })
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <DropdownFilter
          onChange={this.handleSortByChange}
          value={this.state.sortBy}
        />
        <div className="image-list">
          {this.state.loading || this.state.vehicles.length === 0 ?
            <div>Loading...</div> :
            this.renderVehicleList()
          }
        </div>
      </div>
    )
  }
}

export default VehicleContainer;