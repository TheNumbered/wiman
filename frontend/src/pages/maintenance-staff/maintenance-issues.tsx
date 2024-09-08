import { NavigateBeforeRounded, NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Button, Container, Link, Typography } from '@mui/material';
import { useState } from 'react';
import IssueFixReporting from './issue-fix-reporting';
import IssueReportsList from './issue-reports-list';
import SingleIssueReport from './single-issue-report';

const CardList = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <div style={{ flex: '1' }}>
    <IssueReportsList onSelect={onSelect} />
  </div>
);

const NoCardSelected = () => (
  <div style={{ flex: '1' }}>
    <h2>No card is selected yet</h2>
  </div>
);

const CardDetails = ({ issue_id, onNext }: { issue_id: string; onNext: () => void }) => (
  <div style={{ flex: '1' }}>
    <SingleIssueReport id={issue_id} onReviewButtonClick={onNext} />
    {/* <button onClick={onNext}>Go to Another View</button> */}
  </div>
);

const AnotherView = ({ issue_id, onPrev }: { issue_id: string; onPrev: () => void }) => (
  <div style={{ flex: '1' }}>
    <Button onClick={onPrev} variant="text">
      <NavigateBeforeRounded /> Return
    </Button>
    <IssueFixReporting issue_id={issue_id} />
  </div>
);

export default function Issues() {
  // State management
  const [view, setView] = useState<'list' | 'details' | 'form'>('list'); // Manage views
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null); // Manage selected card

  // Handlers
  const handleCardSelect = (id: string) => {
    setSelectedCardId(id);
    setView('details'); // Move to details view
  };

  const handleNextView = () => {
    setView('form'); // Move to the 'form' view
  };

  const handlePrevView = () => {
    setView('details'); // Move back to the list view
    // setSelectedCardId(null); // Reset card selection
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Maintenance Issues
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Core
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Breadcrumb
    </Typography>,
  ];

  return (
    <Container>
      <Breadcrumbs
        style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <div style={{ display: 'flex' }}>
        {view === 'list' && (
          <>
            <CardList onSelect={handleCardSelect} />
            {!selectedCardId && <NoCardSelected />}
          </>
        )}

        {view === 'details' && selectedCardId && (
          <>
            <CardList onSelect={handleCardSelect} />
            <CardDetails issue_id={selectedCardId} onNext={handleNextView} />
          </>
        )}

        {view === 'form' && selectedCardId && (
          <>
            <CardDetails issue_id={selectedCardId} onNext={handleNextView} />
            <AnotherView onPrev={handlePrevView} issue_id={selectedCardId} />
          </>
        )}
      </div>
    </Container>
  );
}
