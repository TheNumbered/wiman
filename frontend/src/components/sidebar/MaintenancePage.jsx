import React, { useState } from 'react';
import IssueReportsList from './IssueReportsList'; // Adjust path
import SingleIssueReport from './SingleIssueReport'; // Adjust path

const MaintenancePage = () => {
  const [selectedIssueId, setSelectedIssueId] = (useState < string) | (null > null);

  const handleSelectIssue = (id) => {
    setSelectedIssueId(id); // Set the selected issue ID to display the SingleIssueReport
  };

  const handleBackToList = () => {
    setSelectedIssueId(null); // Reset to show the list again
  };

  return (
    <div>
      {selectedIssueId ? (
        <SingleIssueReport
          id={selectedIssueId}
          onReviewButtonClick={() => alert('Review clicked')}
          onSetBackButtonClick={() => alert('Set Back clicked')}
        />
      ) : (
        <IssueReportsList onSelect={handleSelectIssue} />
      )}
    </div>
  );
};

export default MaintenancePage;
