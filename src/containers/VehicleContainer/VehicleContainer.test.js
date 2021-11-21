import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import VehicleContainer from './VehicleContainer';
import { fetchVehicles } from '../../apis/vehicles';


jest.mock("../../apis/vehicles");

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleContainer />, div)
})

test('fetches the list of vehicles', async () => {
  const vehicles = [{ id: 1, photo: 'https://imageExample.com',
  make: 'Tesla', model: 'X',
  price: '300000 EUR',
  range: { distance: 450, unit: 'km'}}]

  fetchVehicles.mockResolvedValueOnce(vehicles)

  render(<VehicleContainer />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(fetchVehicles).toHaveBeenCalledTimes(1)

  await waitFor(() => expect(screen.getByText('All Vehicles')).toBeInTheDocument())
  vehicles.forEach((vehicle) =>
    expect(screen.getByText(`Make: ${vehicle.make}`)).toBeInTheDocument()
  );
});