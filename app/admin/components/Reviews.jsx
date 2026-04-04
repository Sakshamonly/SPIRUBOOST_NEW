"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Star, Trash2, RefreshCw } from "lucide-react";
import API from "../../../lib/api";

const normalizeReview = (review) => ({
  id: review?._id || review?.id,
  orderId: review?.orderId || review?.order?._id || "",
  userName: review?.userName || review?.user?.name || "Customer",
  productName: review?.productName || review?.product?.name || "Product",
  rating: Number(review?.rating ?? 0),
  reviewText: review?.reviewText || review?.text || "",
  date: review?.date
    ? String(review.date).slice(0, 10)
    : review?.createdAt
    ? String(review.createdAt).slice(0, 10)
    : "",
});

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/reviews/admin/all");
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.reviews || response.data?.data || [];

      setReviews(list.map(normalizeReview));
    } catch (err) {
      if (err?.response?.status === 404) {
        setReviews([]);
        setError("");
      } else {
        setError(err?.response?.data?.message || "Failed to load reviews");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarReviews = reviews.filter((r) => r.rating === 5).length;
  const oneStarReviews = reviews.filter((r) => r.rating === 1).length;

  const filteredReviews = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return reviews.filter((review) => {
      const matchesSearch =
        review.orderId.toLowerCase().includes(query) ||
        review.userName.toLowerCase().includes(query) ||
        review.productName.toLowerCase().includes(query);

      const matchesFilter =
        filterRating === "all" || review.rating === Number(filterRating);

      return matchesSearch && matchesFilter;
    });
  }, [reviews, searchTerm, filterRating]);

  const handleViewDetails = (review) => {
    setSelectedReview(review);
    setShowReviewDetails(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setActionLoading(true);
      setError("");
      await API.delete(`/reviews/${reviewId}`);
      setConfirmDeleteId(null);
      setShowReviewDetails(false);
      setSelectedReview(null);
      await fetchReviews();
    } catch (err) {
      console.warn("Delete review failed");
      setError(err?.response?.data?.message || "Failed to delete review");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="p-4 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Reviews Management
          </h1>
          <button
            onClick={fetchReviews}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Total Reviews
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              {loading ? "..." : totalReviews}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              Average Rating
            </p>
            <div className="flex items-center gap-2">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                {loading ? "..." : averageRating}
              </p>
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              5-Star Reviews
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              {loading ? "..." : fiveStarReviews}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              1-Star Reviews
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              {loading ? "..." : oneStarReviews}
            </p>
          </div>
        </div>

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
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            <div className="col-span-full bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
              Loading reviews...
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-card border border-border rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">
                        Order ID
                      </p>
                      <p className="text-base sm:text-lg font-bold text-foreground truncate">
                        {review.orderId}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">
                      User Name
                    </p>
                    <p className="text-sm sm:text-base text-foreground font-medium truncate">
                      {review.userName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">
                      Product
                    </p>
                    <p className="text-sm sm:text-base text-foreground font-medium truncate">
                      {review.productName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-1">
                      Date
                    </p>
                    <p className="text-sm sm:text-base text-foreground">
                      {review.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">
                      Review
                    </p>
                    <p className="text-xs sm:text-sm text-foreground line-clamp-2 italic">
                      "{review.reviewText}"
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  {confirmDeleteId === review.id ? (
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={actionLoading}
                        className="flex-1 px-3 py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap disabled:opacity-50"
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
                      onClick={() => {
                        setConfirmDeleteId(review.id);
                        setSelectedReview(review);
                      }}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <button
                    onClick={() => handleViewDetails(review)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && filteredReviews.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No reviews found</p>
          </div>
        )}

        {showReviewDetails && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between bg-card border-b border-border p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  Review Details
                </h2>
                <button
                  onClick={() => setShowReviewDetails(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">
                      Order ID
                    </p>
                    <p className="text-base sm:text-lg font-bold text-foreground">
                      {selectedReview.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">
                      Date
                    </p>
                    <p className="text-base sm:text-lg font-bold text-foreground">
                      {selectedReview.date}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">
                      User Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-foreground">
                      {selectedReview.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-2">
                      Product Name
                    </p>
                    <p className="text-base sm:text-lg font-bold text-foreground">
                      {selectedReview.productName}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-3">
                    Rating
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            i < selectedReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg font-bold text-yellow-600">
                      {selectedReview.rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-semibold uppercase mb-3">
                    Review
                  </p>
                  <div className="bg-muted border border-border rounded-lg p-4">
                    <p className="text-sm sm:text-base text-foreground leading-relaxed">
                      "{selectedReview.reviewText}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  {confirmDeleteId === selectedReview.id ? (
                    <>
                      <button
                        onClick={() => handleDeleteReview(selectedReview.id)}
                        disabled={actionLoading}
                        className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
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
