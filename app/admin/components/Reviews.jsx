'use client';

import { useState } from 'react';
import { useMockData } from '../hooks/useMockData.js';
import { X, Star, Trash2 } from 'lucide-react';

export default function Reviews() {
  const { reviews, deleteReview, updateReview } = useMockData();
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
  const oneStarReviews = reviews.filter(r => r.rating === 1).length;

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRating === 'all' || review.rating === parseInt(filterRating);
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowReviewDetails(true);
  };

  const handleDeleteReview = (reviewId) => {
    deleteReview(reviewId);
    setConfirmDeleteId(null);
    setShowReviewDetails(false);
    setSelectedReview(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Reviews Management</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Total Reviews</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalReviews}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Average Rating</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{averageRating}</p>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">5-Star Reviews</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{fiveStarReviews}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">1-Star Reviews</p>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">{oneStarReviews}</p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by order ID, user name, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
            <option value="2">⭐⭐ (2 Stars)</option>
            <option value="1">⭐ (1 Star)</option>
          </select>
        </div>

        {/* Reviews Grid - Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">Order ID</p>
                    <p className="text-base sm:text-lg font-bold text-foreground truncate">{review.orderId}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">User Name</p>
                  <p className="text-sm sm:text-base text-foreground font-medium truncate">{review.userName}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">Product</p>
                  <p className="text-sm sm:text-base text-foreground font-medium truncate">{review.productName}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">Date</p>
                  <p className="text-sm sm:text-base text-foreground">{review.date}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">Review</p>
                  <p className="text-xs sm:text-sm text-foreground line-clamp-2 italic">"{review.reviewText}"</p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {confirmDeleteId === review.id ? (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="flex-1 px-3 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="flex-1 px-3 py-2 text-xs sm:text-sm border border-border rounded-lg hover:bg-muted transition-colors font-medium whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(review.id)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No reviews found</p>
          </div>
        )}

        {/* Review Details Modal */}
        {showReviewDetails && selectedReview && (
          <div className="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between bg-card border-b border-border p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Review Details</h2>
                <button
                  onClick={() => setShowReviewDetails(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">Order ID</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">{selectedReview.orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">Date</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">{selectedReview.date}</p>
                  </div>
                </div>

                {/* User and Product Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">User Name</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">{selectedReview.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">Product Name</p>
                    <p className="text-base sm:text-lg font-bold text-foreground">{selectedReview.productName}</p>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-3">Rating</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            i < selectedReview.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-border'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-yellow-600">{selectedReview.rating}/5</span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-3">Review</p>
                  <div className="bg-muted border border-border rounded-lg p-4">
                    <p className="text-sm sm:text-base text-foreground leading-relaxed">"{selectedReview.reviewText}"</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  {confirmDeleteId === selectedReview.id ? (
                    <>
                      <button
                        onClick={() => handleDeleteReview(selectedReview.id)}
                        className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="flex-1 px-4 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setConfirmDeleteId(selectedReview.id)}
                        className="flex-1 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                      >
                        Delete Review
                      </button>
                      <button
                        onClick={() => setShowReviewDetails(false)}
                        className="flex-1 px-4 py-2 text-sm border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
