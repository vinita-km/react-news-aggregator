import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import moment from 'moment';


const ArticleCard = ({ article, categories }) => {
  console.log(article, 'article card');
  console.log(categories, 'categories card', article.published_date, 'published_date');
  
  // Check if article exists before accessing its properties
  if (!article) {
    return null; // or handle the case where article is undefined/null
  }
   // Function to format the date using Moment.js
   const formatDate = (dateString) => {
    // Parse the date string using Moment.js
    const parsedDate = moment(dateString);

    // Format the date using the desired format
    return parsedDate.format('DD MMMM YYYY');
  };
  console.log(formatDate, 'formatDate')
  return (
    <Card>
      {/* Add CardMedia component to display the image */}
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage} // Assuming urlToImage contains the image URL
        alt={article.title} // Use the article title as alt text for accessibility
      />
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        {/* Display source as a chip */}
        {article.source && (
          <Chip
            label={`Source: ${article.source.name}`}
            variant="outlined"
            size="small"
            sx={{
              marginTop: '5px',
              marginRight: '5px',
              backgroundColor: '#187da1', // Set primary color as background
              color: '#fff', // Set text color to white
            }}
          />
        )}
        {/* Display category as a chip */}
        {categories && (
          <Chip
            label={`Category: ${categories}`}
            variant="outlined"
            size="small"
            sx={{
              marginTop: '5px',
              marginRight: '5px',
              backgroundColor: '#187da1', // Set primary color as background
              color: '#fff', // Set text color to white
            }}
          />
        )}
        {/* Display published date as a chip */}
      
{article.publishedAt && (
  <Chip
  label={`Published: ${formatDate(article.publishedAt)}`}
    variant="outlined"
    size="small"
    sx={{
      marginTop: '5px',
      marginRight: '5px',
      backgroundColor: '#187da1', // Set primary color as background
      color: '#fff', // Set text color to white
    }}
  />
)}
        <Typography variant="body2">{article.description}</Typography>
        {/* Add more article details */}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
