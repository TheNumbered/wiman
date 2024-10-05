import { useGetQuery } from '@/hooks';
import { AdvancedIssue, SecurityReport, Venue } from '@/interfaces';
import { getDistance } from 'geolib';
import { useEffect, useState } from 'react';

// Parse the geoLocation string from the issue
const parseGeoLocation = (geoLocation: string) => {
  if (!geoLocation.includes(',')) {
    throw new Error('Invalid geoLocation format');
  }
  const [lat, lng] = geoLocation.split(',').map(Number);
  return { lat, lng };
};

interface Issue {
  geoLocation: string;
}

const findVenuesNearIssue = (issue: Issue, venues: Venue[], radius: number) => {
  let issueLocation;
  try {
    issueLocation = parseGeoLocation(issue.geoLocation);
  } catch {
    // console.error('Error parsing geoLocation:', error);
    return [];
  }

  return venues.filter((venue) => {
    const distance = getDistance(
      { latitude: issueLocation.lat, longitude: issueLocation.lng },
      { latitude: venue.location.lat, longitude: venue.location.lng },
    );
    return distance <= radius;
  });
};

const useSecurityIssues = () => {
  const [reports, setReports] = useState<SecurityReport[]>([
    {
      uid: 'GTGCINvyJIXLXglT7kxO0u4rgFn2',
      reportID: 6,
      removed: false,
      geoLocation: '-26.18860966118155, 28.026387782014314',
      description: 'Testing that this thing actually works',
      imageUrls: ['https://via.placeholder.com/150'],
      location: '2nd+ Year Parking',
      urgencyLevel: 'Low',
      status: 'Open',
      timestamp: { _seconds: 1727867602, _nanoseconds: 224000000 },
    },
  ]);
  const [advancedIssues, setAdvancedIssues] = useState<AdvancedIssue[]>([]);

  // Fetch venue data using the useGetQuery hook
  const { data: venuesData } = useGetQuery<Venue[]>({
    resource: `api/venues`,
  });

  useEffect(() => {
    // Fetch security reports from the server
    fetch('https://sdp-campus-safety.azurewebsites.net/reports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const openReports = data.filter((report: SecurityReport) => report.status === 'Open');
        setReports(openReports);
      });
  }, []);

  useEffect(() => {
    if (reports.length > 0 && venuesData) {
      const radius = 200;

      // Map each security report to an AdvancedIssue
      const issues = reports.map((report) => {
        const nearbyVenues = findVenuesNearIssue(
          { geoLocation: report.geoLocation },
          venuesData,
          radius,
        );

        const advancedIssue: AdvancedIssue = {
          issueId: report.uid,
          issueDescription: report.description + ` - [${report.urgencyLevel}]`,
          issueImages: report.imageUrls,
          resolutionLog: null, // defaulting to null
          amenities: nearbyVenues.length == 1 ? nearbyVenues[0].amenities : [],
          underMaintenance: nearbyVenues.length == 1 ? nearbyVenues[0].isUnderMaintenance : 0,
          capacity: nearbyVenues.length == 1 ? nearbyVenues[0].capacity : 0,
          venueId:
            nearbyVenues.length > 0 ? nearbyVenues.map((venue) => venue.venueId).join(', ') : 'N/A',
        };

        return advancedIssue;
      });

      setAdvancedIssues(issues);
    }
  }, [reports, venuesData]);

  return advancedIssues;
};

export const truncateText = (text: string, charLimit: number): string => {
  if (text.length > charLimit) {
    return text.slice(0, charLimit) + '...';
  }
  return text;
};

export default useSecurityIssues;
