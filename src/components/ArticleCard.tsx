
import React from 'react';
import { Bookmark, Clock, Calendar } from 'lucide-react';
import { Article } from '../types/Article';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isBookmarked, onToggleBookmark }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-100 text-blue-700',
      science: 'bg-purple-100 text-purple-700',
      health: 'bg-green-100 text-green-700',
      environment: 'bg-teal-100 text-teal-700',
      sports: 'bg-orange-100 text-orange-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.02] border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
        </div>
        <button
          onClick={() => onToggleBookmark(article.id)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            isBookmarked 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min</span>
            </div>
          </div>
          <span className="font-medium text-gray-700">{article.source}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
