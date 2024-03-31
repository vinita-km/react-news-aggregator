const API_KEY = '139ee0a6b07448c89d7d6f08ba2da560';
const NYT_API_KEY = 'YV8Nne7RAlqWBZGz82dhGIueXRaDuzFm';

export const fetchNYTArticles = async () => {
  try {
    const response = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`);
    const data = await response.json();

    if (response.ok) {
      return data.results;
    } else {
      throw new Error(data.message || 'Failed to fetch articles from the New York Times API');
    }
  } catch (error) {
    console.error('Error fetching articles from the New York Times API:', error.message);
    throw error;
  }
};

export const fetchArticles = async (category) => {
  try {
    const categoryParam = category ? `&category=${category}` : '';
    const [newsApiArticles, nytArticles] = await Promise.all([
      fetchNewsArticles(category), // Fetch articles from News API
      fetchNYTArticles()   // Fetch articles from New York Times API
    ]);

    // Combine the articles from both APIs
    const combinedArticles = [...newsApiArticles, ...nytArticles];
    console.log(combinedArticles, 'combinedArticles')
    return combinedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    throw error;
  }
};


  
  
  
export const fetchNewsArticles = async (category) => {
  try {
    const categoryParam = category ? `&category=${category}` : '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us${categoryParam}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.status === 'ok') {
      return data.articles;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching news articles:', error.message);
    throw error;
  }
};

export const fetchSources = async () => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
    console.log(response, 'source response')
    const data = await response.json();

    if (response.ok) {
      return data.sources; // Assuming the API returns an array of sources
    } else {
      throw new Error(data.message || 'Failed to fetch sources');
    }
  } catch (error) {
    console.error('Error fetching sources:', error.message);
    throw error;
  }
};

export const fetchCategories = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`);
      console.log(response, 'categories response')
      const data = await response.json();
  
      if (response.ok) {
        // Extract categories from the response data
        const categories = data.sources.map(source => source.category).filter((category, index, self) => self.indexOf(category) === index);
        console.log(categories, 'extracted categories');
        return categories; // Return an array of unique categories
      } else {
        throw new Error(data.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw error;
    }
  };
  
  export const fetchPersonalizedNews = async (selectedSources, selectedCategories, selectedAuthors) => {
    try {
      // Implement logic to fetch personalized news based on selected preferences
      // Example:
      const response = await fetch(`https://example.com/api/personalized-news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sources: selectedSources,
          categories: selectedCategories,
          authors: selectedAuthors,
          apiKey: API_KEY,
        }),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data.articles;
      } else {
        throw new Error(data.message || 'Failed to fetch personalized news');
      }
    } catch (error) {
      console.error('Error fetching personalized news:', error.message);
      throw error;
    }
  };

