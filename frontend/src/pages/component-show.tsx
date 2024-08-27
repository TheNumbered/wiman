import { Home, Info, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const ComponentShowcase = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg">
      {/* AppBar Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          AppBar
        </Typography>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wits App
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Buttons Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Buttons
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" size="large" color="primary">
            Contained Large
          </Button>
          <Button variant="contained" size="medium" color="secondary">
            Contained Medium
          </Button>
          <Button variant="contained" size="small">
            Contained Small
          </Button>

          <Button variant="outlined" size="large" color="primary">
            Outlined Large
          </Button>
          <Button variant="outlined" size="medium" color="secondary">
            Outlined Medium
          </Button>
          <Button variant="outlined" size="small">
            Outlined Small
          </Button>

          <Button variant="text" size="large" color="primary">
            Text Large
          </Button>
          <Button variant="text" size="medium">
            Text Medium
          </Button>
          <Button variant="text" size="small">
            Text Small
          </Button>
        </Box>
      </Box>
      <Divider>
        <Chip label="Chip" size="small" />
      </Divider>

      <Divider sx={{ mb: 4 }} />

      {/* Cards Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Cards & Paper
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Card Title</Typography>
                <Typography variant="body2">
                  This is a sample card content. It can include images, text, and actions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Another Card</Typography>
                <Typography variant="body2">
                  More sample content inside this card. You can customize it as needed.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={1} style={{ padding: '16px' }}>
              <Typography variant="h5">Paper with Elevation 1</Typography>
              <Typography variant="body2">
                This Paper component has a slight elevation for a subtle shadow effect.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={4} style={{ padding: '16px' }}>
              <Typography variant="h5">Paper with Elevation 4</Typography>
              <Typography variant="body2">
                This Paper component has a higher elevation, creating a more prominent shadow.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ padding: '16px' }}>
              <Typography variant="h5">Paper with Elevation 8</Typography>
              <Typography variant="body2">
                This Paper component has a strong shadow effect due to its higher elevation.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={12} style={{ padding: '16px' }}>
              <Typography variant="h5">Paper with Elevation 12</Typography>
              <Typography variant="body2">
                The highest elevation in this example, giving a pronounced shadow to the Paper.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Forms Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Forms & Inputs
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select"
                select
                variant="outlined"
                fullWidth
                margin="normal"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Switches and Sliders Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Switches & Sliders
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Toggle Switch</Typography>
            <Switch defaultChecked color="primary" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Volume Slider</Typography>
            <Slider defaultValue={30} aria-label="Volume" valueLabelDisplay="auto" />
          </Grid>
        </Grid>
      </Box>

      <Divider />
      {/* Dialog Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Dialog
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Open Dialog
        </Button>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Sample Dialog</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              This is a sample dialog box. You can place your content here.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Divider />
      {/* Typography Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Typography variant="h1" gutterBottom>
          Heading 1
        </Typography>
        <Typography variant="h2" gutterBottom>
          Heading 2
        </Typography>
        <Typography variant="h3" gutterBottom>
          Heading 3
        </Typography>
        <Typography variant="h4" gutterBottom>
          Heading 4
        </Typography>
        <Typography variant="h5" gutterBottom>
          Heading 5
        </Typography>
        <Typography variant="h6" gutterBottom>
          Heading 6
        </Typography>
        <Typography variant="body1" gutterBottom>
          Body Text: The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Body 2 Text: The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="caption" gutterBottom>
          Caption: The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="overline" gutterBottom>
          Overline: The quick brown fox jumps over the lazy dog.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />
      {/* Mobile Bottom Nav */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Mobile Bottom Navigation
        </Typography>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Info" icon={<Info />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </Box>
    </Container>
  );
};

export default ComponentShowcase;
