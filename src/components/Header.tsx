
import React from 'react';
import { Search, Bookmark } from 'lucide-react';

interface HeaderProps {
  bookmarkCount: number;
  onToggleBookmarks: () => void;
  showBookmarks: boolean;
}

const Header: React.FC<HeaderProps> = ({ bookmarkCount, onToggleBookmarks, showBookmarks }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">sti-News</h1>
              <p className="text-sm text-gray-500">Stay informed, stay ahead</p>
            </div>
          </div>

          <button
            onClick={onToggleBookmarks}
            className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              showBookmarks 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
