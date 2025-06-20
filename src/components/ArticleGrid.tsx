
import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../types/Article';

interface ArticleGridProps {
  articles: Article[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, bookmarkedIds, onToggleBookmark }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
          <span className="text-4xl">📰</span>
        </div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No articles found</h3>
        <p className="text-gray-500">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          isBookmarked={bookmarkedIds.includes(article.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
