//@ts-nocheck
import { useGetQuery } from '@/hooks';
import { SecurityReport, Venue } from '@/interfaces';
import { renderHook, waitFor } from '@testing-library/react'; // Import waitFor
import { getDistance } from 'geolib';
import useSecurityIssues, { truncateText } from '../security-issues-utils';

// Mock the hooks and libraries
vi.mock('@/hooks', () => ({
  useGetQuery: vi.fn(),
}));
vi.mock('geolib', () => ({
  getDistance: vi.fn(),
}));

const mockVenues: Venue[] = [
  {
    venueId: '1',
    location: { lat: -26.188609, lng: 28.026387 },
    amenities: ['WiFi', 'Parking'],
    isUnderMaintenance: 0,
    capacity: 100,
  },
];

const mockReports: SecurityReport[] = [
  {
    uid: 'GTGCINvyJIXLXglT7kxO0u4rgFn2',
    reportID: 6,
    removed: false,
    geoLocation: '-26.18860966118155, 28.026387782014314',
    description: 'Test Issue',
    imageUrls: ['https://via.placeholder.com/150'],
    location: '2nd Year Parking',
    urgencyLevel: 'Low',
    status: 'Open',
    timestamp: { _seconds: 1727867602, _nanoseconds: 224000000 },
  },
];

describe('useSecurityIssues hook', () => {
  beforeEach(() => {
    // Mock the fetch for security reports
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockReports),
      }),
    );

    // Mock useGetQuery for venue data
    (useGetQuery as vi.Mock).mockReturnValue({
      data: mockVenues,
    });

    // Mock getDistance to return a value within radius
    (getDistance as vi.Mock).mockReturnValue(150);
  });

  it('fetches security reports and filters "Open" reports', async () => {
    const { result } = renderHook(() => useSecurityIssues());

    // Wait for async fetch and state updates
    await waitFor(() => {
      // Ensure that only the "Open" reports are set
      expect(result.current.length).toBe(1);
      expect(result.current[0].issueDescription).toContain('Test Issue');
    });
  });

  it('calculates venue proximity and maps to AdvancedIssue', async () => {
    const { result } = renderHook(() => useSecurityIssues());

    await waitFor(() => {
      const advancedIssue = result.current[0];

      // Check if venues are mapped correctly
      expect(advancedIssue.venueId).toBe('1');
      expect(advancedIssue.amenities).toEqual(['WiFi', 'Parking']);
      expect(advancedIssue.underMaintenance).toBe(0);
      expect(advancedIssue.capacity).toBe(100);
    });
  });

  it('handles no nearby venues case', async () => {
    // Mock getDistance to return a value outside the radius
    (getDistance as vi.Mock).mockReturnValue(300);

    const { result } = renderHook(() => useSecurityIssues());

    await waitFor(() => {
      const advancedIssue = result.current[0];

      // Check if no venue is found within the radius
      expect(advancedIssue.venueId).toBe('N/A');
      expect(advancedIssue.amenities).toEqual([]);
      expect(advancedIssue.capacity).toBe(0);
    });
  });

  it('truncates text correctly', () => {
    const longText = 'This is a very long text that needs to be truncated.';
    const truncated = truncateText(longText, 20);

    expect(truncated).toBe('This is a very long ...');
  });
});
