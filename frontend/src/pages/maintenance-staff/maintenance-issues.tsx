import { scrollbarStyles } from '@/theme';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material';
import { useState } from 'react';
import IssueFixReporting from './issue-fix-reporting';
import IssueReportsList from './issue-reports-list';
import IssueSetBackReporting from './issue-setback-reporting';
import SingleIssueReport from './single-issue-report';

const CardList = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <Box
    sx={{
      flex: '1',
      overflowY: 'scroll',
      height: '100vh',
      paddingBottom: '2rem',
      ...scrollbarStyles,
    }}
  >
    <IssueReportsList onSelect={onSelect} />
  </Box>
);

const NoCardSelected = () => (
  <Box sx={{ flex: '1' }}>
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img style={{ width: '15rem' }} src="/src/assets/illustration.svg" alt="illustration" />
      <h2 style={{ marginBottom: '0' }}>No report is selected yet</h2>
      <p style={{ color: '#777', margin: '0' }}>
        Choose report on the left menu to view its details
      </p>
    </Box>
  </Box>
);

const CardDetails = ({
  issue_id,
  onNext,
  onShowSetBackForm,
}: {
  issue_id: string;
  onNext: () => void;
  onShowSetBackForm: () => void;
}) => (
  <Box
    sx={{
      flex: '1',
      overflowY: 'scroll',
      height: '100vh',
      paddingBottom: '2rem',
      ...scrollbarStyles,
    }}
  >
    <SingleIssueReport
      id={issue_id}
      onReviewButtonClick={onNext}
      onSetBackButtonClick={onShowSetBackForm}
    />
    {/* <button onClick={onNext}>Go to Another View</button> */}
  </Box>
);

const AnotherView = ({
  issue_id,
  onPrev,
  which_view,
}: {
  issue_id: string;
  onPrev: () => void;
  which_view: string;
}) => (
  <div style={{ flex: '1' }}>
    <Button
      sx={{ marginLeft: '1rem', width: '100%' }}
      onClick={onPrev}
      variant="text"
      disableElevation
    >
      <NavigateBeforeRounded /> Return To List
    </Button>

    {which_view == 'setback' ? (
      <IssueSetBackReporting issue_id={issue_id} />
    ) : (
      <IssueFixReporting issue_id={issue_id} />
    )}
  </div>
);

export default function Issues() {
  // State management
  const [view, setView] = useState<'list' | 'details' | 'form' | 'setbackform'>('list'); // Manage views
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null); // Manage selected card

  // Handlers
  const handleCardSelect = (id: string) => {
    setSelectedCardId(id);
    setView('details'); // Move to details view
  };

  const handleNextView = () => {
    setView('form'); // Move to the 'form' view
  };
  const handleShowSetBackForm = () => {
    setView('setbackform'); // Move to the 'form' view
  };

  const handlePrevView = () => {
    setView('details'); // Move back to the list view
    // setSelectedCardId(null); // Reset card selection
  };

  return (
    <Container sx={{ background: '#fff', width: '-webkit-fill-available' }}>
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
            <CardDetails
              issue_id={selectedCardId}
              onNext={handleNextView}
              onShowSetBackForm={handleShowSetBackForm}
            />
          </>
        )}

        {view === 'form' && selectedCardId && (
          <>
            <CardDetails
              issue_id={selectedCardId}
              onNext={handleNextView}
              onShowSetBackForm={handleShowSetBackForm}
            />
            <AnotherView onPrev={handlePrevView} issue_id={selectedCardId} which_view="review" />
          </>
        )}
        {view === 'setbackform' && selectedCardId && (
          <>
            <CardDetails
              issue_id={selectedCardId}
              onNext={handleNextView}
              onShowSetBackForm={handleShowSetBackForm}
            />
            <AnotherView onPrev={handlePrevView} issue_id={selectedCardId} which_view="setback" />
          </>
        )}
      </div>
    </Container>
  );
}
