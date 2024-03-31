import React, { useState } from 'react';
import { Typography, Checkbox, FormControlLabel, Grid, Container, Paper, Chip } from '@mui/material';

const PersonalizedNewsFeed = () => {
  // Sample articles data (replace with actual API data)
  const [articles, setArticles] = useState([
    { id: 1, title: 'Article 1', description: 'Description of article 1', category: 'Technology', source: 'CNN', author: 'John Doe' },
    { id: 2, title: 'Article 2', description: 'Description of article 2', category: 'Business', source: 'BBC', author: 'Jane Smith' },
    { id: 3, title: 'Article 3', description: 'Description of article 3', category: 'Sports', source: 'Fox News', author: 'Michael Brown' },
    { id: 4, title: 'Article 4', description: 'Description of article 4', category: 'Entertainment', source: 'The New York Times', author: 'Emily Johnson' },
  ]);

  // State variables to store user preferences
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  // Handler functions to toggle preferences
  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const toggleSource = (source) => {
    setSelectedSources((prevSources) =>
      prevSources.includes(source)
        ? prevSources.filter((s) => s !== source)
        : [...prevSources, source]
    );
  };

  const toggleAuthor = (author) => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.includes(author)
        ? prevAuthors.filter((a) => a !== author)
        : [...prevAuthors, author]
    );
  };

  // Function to filter articles based on selected preferences
  const filterArticles = () => {
    return articles.filter((article) =>
      (selectedCategories.length === 0 || selectedCategories.includes(article.category)) &&
      (selectedSources.length === 0 || selectedSources.includes(article.source)) &&
      (selectedAuthors.length === 0 || selectedAuthors.includes(article.author))
    );
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Personalized News Feed
        </Typography>
        <Grid container spacing={2}>
          {/* Categories section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            {/* Sample categories (replace with actual data or API call) */}
            {['Technology', 'Business', 'Sports', 'Entertainment'].map((category) => (
              <FormControlLabel
                key={category}
                control={<Checkbox checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} />}
                label={category}
              />
            ))}
          </Grid>
          {/* Sources section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Sources
            </Typography>
            {/* Sample sources (replace with actual data or API call) */}
            {['CNN', 'BBC', 'Fox News', 'The New York Times'].map((source) => (
              <FormControlLabel
                key={source}
                control={<Checkbox checked={selectedSources.includes(source)} onChange={() => toggleSource(source)} />}
                label={source}
              />
            ))}
          </Grid>
          {/* Authors section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Authors
            </Typography>
            {/* Sample authors (replace with actual data or API call) */}
            {['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Johnson'].map((author) => (
              <FormControlLabel
                key={author}
                control={<Checkbox checked={selectedAuthors.includes(author)} onChange={() => toggleAuthor(author)} />}
                label={author}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
      {/* Articles section */}
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Articles
        </Typography>
        <Grid container spacing={2}>
          {/* Display filtered articles */}
          {filterArticles().map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <div>
                <Typography variant="subtitle1">{article.title}</Typography>
                <Typography variant="body2">{article.description}</Typography>
                {/* Display tags for author, category, and source */}
                <div style={{ marginTop: '8px' }}>
                  <Chip label={`Author: ${article.author}`} style={{ marginRight: '4px', marginBottom: '4px' }} />
                  <Chip label={`Category: ${article.category}`} style={{ marginRight: '4px', marginBottom: '4px' }} />
                  <Chip label={`Source: ${article.source}`} style={{ marginRight: '4px', marginBottom: '4px' }} />
                </div>
              </div>
            </Grid>
          ))}
          {/* Show message if no articles found */}
          {filterArticles().length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1">No articles found.</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default PersonalizedNewsFeed;
