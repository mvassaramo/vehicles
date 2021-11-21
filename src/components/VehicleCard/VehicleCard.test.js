import { render } from '@testing-library/react';
import VehicleCard from './VehicleCard';


it('renders VehicleCard correctly', () => {
  const vehicle = { 
    photo: 'https://imageExample.com',
    make: 'Tesla', model: 'X',
    price: '300000 EUR',
    range: { distance: 450, unit: 'km'}
  }
  const { getByTestId } = render(<VehicleCard vehicle={vehicle}></VehicleCard>)
  expect(getByTestId('vehicleCard')).toHaveTextContent('Make: Tesla')
  expect(getByTestId('vehicleCard')).toHaveTextContent('Model: X')
  expect(getByTestId('vehicleCard')).toHaveTextContent('Price: 300000 EUR')
  expect(getByTestId('vehicleCard')).toHaveTextContent('Range: 450 km')
})