
import React from 'react';
import { Bookmark, BookmarkX } from 'lucide-react';
import { Article } from '../types/Article';

interface BookmarkPanelProps {
  bookmarkedArticles: Article[];
  onToggleBookmark: (id: string) => void;
  onClose: () => void;
}

const BookmarkPanel: React.FC<BookmarkPanelProps> = ({ bookmarkedArticles, onToggleBookmark, onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bookmark className="w-6 h-6 fill-current" />
            <h2 className="text-xl font-bold">Bookmarks</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <p className="text-blue-100 mt-2">{bookmarkedArticles.length} saved articles</p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {bookmarkedArticles.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500 text-sm">Start bookmarking articles to read them later!</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {bookmarkedArticles.map((article) => (
              <div key={article.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{article.source}</p>
                  <button
                    onClick={() => onToggleBookmark(article.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 flex items-center space-x-1 text-xs"
                  >
                    <BookmarkX className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPanel;
