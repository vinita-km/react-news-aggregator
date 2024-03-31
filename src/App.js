import React, { useState } from 'react'; 
import ArticleList from './components/ArticleList';
import PersonalizedNewsFeed from './components/PersonalizedNewsFeed';
import { Tabs, Tab, Container, Typography, AppBar, Toolbar, ThemeProvider, createTheme } from '@mui/material';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#187da1', // Set primary color to #187da1
    },
  },
});
const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
    <div>
    <AppBar position="static">
  <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
    <img src="https://it.innoscripta.com/logo.a9065aec.svg" alt="News Aggregator Logo" style={{ marginRight: '10px' }} />
    <Typography variant="h6" component="div">
      News Aggregator App
    </Typography>
  </Toolbar>
</AppBar>


      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Article Search and Filtering" />
          <Tab label="Personalized News Feed" />
        </Tabs>
        <div style={{ marginTop: '20px' }}>
          {selectedTab === 0 && (
            <ArticleList />
          )}
          {selectedTab === 1 && (
            <PersonalizedNewsFeed />
          )}
        </div>
      </Container>
    </div>
  </ThemeProvider>
  );
};

export default App;
