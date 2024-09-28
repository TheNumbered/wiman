import { scrollbarStyles } from '@/theme';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { Box, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import IssueFixReporting from './issue-fix-reporting';
import IssueReportsList from './issue-reports-list';
import IssueSetBackReporting from './issue-setback-reporting';
import SingleIssueReport from './single-issue-report';

const CardList = ({ onSelect }: { onSelect: (id: number) => void }) => (
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
      <img style={{ width: '15rem' }} src="/illustration.svg" alt="illustration" />
      <h2 style={{ marginBottom: '0' }}>No report is selected yet</h2>
      <p style={{ color: '#777', margin: '0' }}>
        Choose a report on the left menu to view its details
      </p>
    </Box>
  </Box>
);

const CardDetails = ({
  issueId,
  onNext,
  onShowSetBackForm,
  onPrev,
}: {
  issueId: number;
  onNext: () => void;
  onShowSetBackForm: () => void;
  onPrev: () => void;
}) => (
  <Box
    component={'article'}
    sx={{
      flex: '1',
      overflowY: 'scroll',
      height: '100vh',
      paddingBottom: '5rem',
      flexDirection: 'column',
      ...scrollbarStyles,
    }}
  >
    {useMediaQuery(useTheme().breakpoints.down('md')) && (
      <Button
        sx={{ margin: '1rem', width: '-webkit-fill-available', height: '2rem' }}
        onClick={onPrev}
        variant="text"
        disableElevation
      >
        <NavigateBeforeRounded /> Return
      </Button>
    )}
    <SingleIssueReport
      id={issueId}
      onReviewButtonClick={onNext}
      onSetBackButtonClick={onShowSetBackForm}
    />
  </Box>
);

const FormView = ({
  issueId,
  onPrev,
  which_view,
}: {
  issueId: number;
  onPrev: () => void;
  which_view: 'review' | 'setback';
}) => (
  <Box
    sx={{
      flex: '1',
      overflowY: 'scroll',
      height: '100vh',
      paddingBottom: '5rem',
      ...scrollbarStyles,
    }}
  >
    <Button
      sx={{ marginLeft: '1rem', width: '-webkit-fill-available' }}
      onClick={onPrev}
      variant="text"
      disableElevation
    >
      <NavigateBeforeRounded /> Return
    </Button>

    {which_view === 'setback' ? (
      <IssueSetBackReporting issueId={issueId} />
    ) : (
      <IssueFixReporting issueId={issueId} />
    )}
  </Box>
);

export default function Issues() {
  // State management
  const [view, setView] = useState<'list' | 'details' | 'form' | 'setbackform'>('list'); // Manage views
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null); // Manage selected card
  const isTabletScreen = useMediaQuery(useTheme().breakpoints.up('md'));

  // Handlers
  const handleCardSelect = (id: number) => {
    setSelectedCardId(id);
    setView('details'); // Move to details view
  };

  return (
    <Container sx={{ background: '#fff', width: '-webkit-fill-available', pt: { xs: 2, md: 0 } }}>
      <div style={{ display: 'flex' }}>
        {view === 'list' && (
          <>
            <CardList onSelect={handleCardSelect} />
            {!selectedCardId && isTabletScreen && <NoCardSelected />}
          </>
        )}

        {view === 'details' && selectedCardId && (
          <>
            {isTabletScreen && <CardList onSelect={handleCardSelect} />}
            <CardDetails
              issueId={selectedCardId}
              onNext={() => setView('form')}
              onShowSetBackForm={() => setView('setbackform')}
              onPrev={() => setView('list')} // Adjusted to handle return to list
            />
          </>
        )}

        {view === 'form' && selectedCardId && (
          <>
            {isTabletScreen && (
              <CardDetails
                issueId={selectedCardId}
                onNext={() => setView('form')}
                onShowSetBackForm={() => setView('setbackform')}
                onPrev={() => setView('list')} // Adjusted to handle return to list
              />
            )}
            <FormView
              onPrev={() => setView('details')}
              issueId={selectedCardId}
              which_view="review"
            />
          </>
        )}

        {view === 'setbackform' && selectedCardId && (
          <>
            {isTabletScreen && (
              <CardDetails
                issueId={selectedCardId}
                onNext={() => setView('form')}
                onShowSetBackForm={() => setView('setbackform')}
                onPrev={() => setView('list')} // Adjusted to handle return to list
              />
            )}
            <FormView
              onPrev={() => setView('details')}
              issueId={selectedCardId}
              which_view="setback"
            />
          </>
        )}
      </div>
    </Container>
  );
}
