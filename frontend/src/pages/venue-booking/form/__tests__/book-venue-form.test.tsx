//@ts-nocheck
import { useCreateMutation, useGetQuery } from '@/hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import BookVenueForm from '../book-venue-form';

// Mock the hooks used in the component
vi.mock(import('@/hooks'), () => ({
  useGetQuery: vi.fn(),
  useUpdateMutation: vi.fn(), // Mocking the mutation hook
  useCreateMutation: vi.fn(), // Mocking the mutation hook
}));

vi.mock('./event-date-time', () => () => <div>Event Date Time Component</div>);
vi.mock('./event-details', () => () => <div>Event Details Component</div>);
vi.mock('./event-frequency', () => () => <div>Event Frequency Component</div>);
vi.mock('./form-buttons', () => ({ handleSubmit }: { handleSubmit: () => void }) => (
  <button onClick={handleSubmit}>Submit</button>
));
vi.mock('./venue-selection', () => () => <div>Venue Selection Component</div>);

describe('BookVenueForm Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useGetQuery as vi.Mock).mockReset();
    (useCreateMutation as vi.Mock).mockReset();
  });

  it('renders the form components', () => {
    (useGetQuery as vi.Mock).mockReturnValue({ data: [], isLoading: false });
    (useCreateMutation as vi.Mock).mockReturnValue({ mutate: vi.fn(), isLoading: false });

    render(<BookVenueForm />);

    expect(screen.getByText('Book Venue')).toBeInTheDocument();
    expect(screen.getByText('What is your event about?')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields on submit', async () => {
    (useGetQuery as vi.Mock).mockReturnValue({ data: [], isLoading: false });
    (useCreateMutation as vi.Mock).mockReturnValue({ mutate: vi.fn(), isLoading: false });

    render(<BookVenueForm />);

    fireEvent.click(screen.getByText('Book'));

    expect(await screen.findByText('Event Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Start Date is required')).toBeInTheDocument();
    expect(await screen.findByText('Start Time is required')).toBeInTheDocument();
    expect(await screen.findByText('End Time is required')).toBeInTheDocument();
    expect(await screen.findByText('Capacity is required')).toBeInTheDocument();
    expect(await screen.findByText('Venue is required')).toBeInTheDocument();
  });
});
