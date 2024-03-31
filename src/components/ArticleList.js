import React, { useState, useEffect } from 'react';
import { fetchArticles, fetchCategories, fetchSources } from '../services/ApiService';
import ArticleCard from './common/ArticleCard';
import SearchBar from './SearchBar';
import {  Grid, Stack, MenuItem, Select, Typography } from '@mui/material';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");

    // Fetch categories and sources from the API
    useEffect(() => {
        fetchCategories()
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

        fetchSources()
            .then(data => setSources(data))
            .catch(error => console.error('Error fetching sources:', error));
    }, []);

    // Fetch articles from the API based on selected category and source
    useEffect(() => {
        fetchFilteredArticles();
    }, [category, source]);

    // Filter articles based on search keyword and date filter
    useEffect(() => {
        if (articles && articles.length > 0) {
            let filtered = articles;

            // Apply search keyword filter
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchKeyword.toLowerCase())
            );

            // Apply date filter
            if (dateFilter) {
                const currentDate = new Date();
                const selectedDate = new Date(dateFilter);
                filtered = filtered.filter(article =>
                    new Date(article.publishedAt) >= selectedDate && new Date(article.publishedAt) <= currentDate
                );
            }

            setFilteredArticles(filtered);
        }
    }, [searchKeyword, dateFilter, articles]);

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setSource(""); // Reset source when category is selected
    };

    const handleSourceChange = (event) => {
        setSource(event.target.value);
        setCategory(""); // Reset category when source is selected
    };

    const fetchFilteredArticles = async () => {
        try {
            let data = await fetchArticles(category, source);
            if (source) {
                // Filter articles based on the selected source name
                data = data.filter(article => article.source && article.source.name === source);
            }
            setArticles(data);
            setFilteredArticles(data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    

    // const handleReset = () => {
    //     setCategory("");
    //     setSource("");
    // };

    return (
        <div>
            <SearchBar onChange={handleSearch} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    fullWidth
                   // disabled={source !== ""}
                >
                    <MenuItem value="">
                        All Categories
                    </MenuItem>
                    {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
                <Select
                    value={source}
                    onChange={handleSourceChange}
                    displayEmpty
                    fullWidth
                   // disabled={category !== ""}
                >
                    <MenuItem value="" >
                        All Sources
                    </MenuItem>
                    {sources.map(src => (
                        <MenuItem key={src.id} value={src.name}>{src.name}</MenuItem>
                    ))}
                </Select>
                {/* <Button variant="outlined" onClick={handleReset}>Reset</Button> */}
            </div>

            {filteredArticles.length > 0 ? (
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    {filteredArticles.map((article) => (
                        <Grid item xs={12} md={6} lg={4} key={article.id}>
                            <ArticleCard article={article} categories={categories} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        ) : (
            <Typography variant="h6" align="center" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
            No articles found.
        </Typography>
        )}
        </div>
    );
};

export default ArticleList;
