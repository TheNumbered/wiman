//@ts-nocheck
import { useGetQuery } from '@/hooks';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import RoomDetails from '../venue-details';

// Mock the hooks and components used in RoomDetails
vi.mock('@/hooks', () => ({
  useGetQuery: vi.fn(),
}));

vi.mock('../form/quick-book-venue-form', () => {
  return vi.fn(() => <div>Mocked QuickBookVenueForm</div>);
});

vi.mock(import('react-router-dom'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ state: { venue: mockVenue } })),
  };
});

const mockVenue = {
  venueId: 'venue-123',
  buildingName: 'Building A',
  capacity: 100,
  type: 'Conference Room',
  campusName: 'Main Campus',
  amenities: ['Wi-Fi', 'projector', 'Air Conditioning'],
  imageUrl: 'https://via.placeholder.com/500',
};

describe('RoomDetails Component', () => {

  beforeEach(() => {
    // Reset mocks before each test
    (useGetQuery as vi.Mock).mockClear();
  });

  it('renders venue details correctly', async () => {
    (useGetQuery as vi.Mock).mockReturnValue({
      data: [],
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/room-details', state: { venue: mockVenue } }]}>
        <RoomDetails />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/venue details/i)).toBeInTheDocument();
  });

  it('displays amenities correctly', async () => {
    (useGetQuery as vi.Mock).mockReturnValue({ data: [] });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/room-details', state: { venue: mockVenue } }]}>
        <RoomDetails />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/property amenities/i)).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('projector')).toBeInTheDocument();
    expect(screen.getByText('Air Conditioning')).toBeInTheDocument();
  });
});
