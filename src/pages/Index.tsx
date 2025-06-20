
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ArticleGrid from '../components/ArticleGrid';
import BookmarkPanel from '../components/BookmarkPanel';
import { Article } from '../types/Article';
import { mockArticles } from '../data/mockArticles';

const Index = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('newsBookmarks');
    if (savedBookmarks) {
      setBookmarkedIds(JSON.parse(savedBookmarks));
    }
  }, []);

  // Filter articles based on category and search term
  useEffect(() => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  const toggleBookmark = (articleId: string) => {
    const updatedBookmarks = bookmarkedIds.includes(articleId)
      ? bookmarkedIds.filter(id => id !== articleId)
      : [...bookmarkedIds, articleId];
    
    setBookmarkedIds(updatedBookmarks);
    localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks));
  };

  const getBookmarkedArticles = () => {
    return articles.filter(article => bookmarkedIds.includes(article.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        bookmarkCount={bookmarkedIds.length}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        showBookmarks={showBookmarks}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              News Aggregator
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest news. Search, filter, and bookmark your favorite articles.
            </p>
          </div>

          <div className="mb-8 space-y-6">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <ArticleGrid
                articles={filteredArticles}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={toggleBookmark}
              />
            </div>

            {showBookmarks && (
              <div className="w-80 animate-slide-in-right">
                <BookmarkPanel
                  bookmarkedArticles={getBookmarkedArticles()}
                  onToggleBookmark={toggleBookmark}
                  onClose={() => setShowBookmarks(false)}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
