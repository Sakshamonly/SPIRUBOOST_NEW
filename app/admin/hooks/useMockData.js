import { useState } from 'react';

const initialOrders = [
  { id: 'SB001', customer: 'John Doe', email: 'john@example.com', amount: 1299, status: 'Delivered', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-15', state: 'Maharashtra', items: 2 },
  { id: 'SB002', customer: 'Jane Smith', email: 'jane@example.com', amount: 899, status: 'Processing', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-14', state: 'Karnataka', items: 1 },
  { id: 'SB003', customer: 'Bob Johnson', email: 'bob@example.com', amount: 2499, status: 'Shipped', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-13', state: 'Tamil Nadu', items: 3 },
  { id: 'SB004', customer: 'Alice Brown', email: 'alice@example.com', amount: 599, status: 'Booked', paymentStatus: 'Postpaid', refundStatus: 'None', date: '2024-03-12', state: 'Rajasthan', items: 1 },
  { id: 'SB005', customer: 'Charlie Wilson', email: 'charlie@example.com', amount: 1899, status: 'Cancelled', paymentStatus: 'Refunded', refundStatus: 'Refunded', date: '2024-03-11', state: 'Gujarat', items: 2 },
  { id: 'SB006', customer: 'Diana Prince', email: 'diana@example.com', amount: 749, status: 'Delivered', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-10', state: 'Delhi', items: 1 },
  { id: 'SB007', customer: 'Eve Davis', email: 'eve@example.com', amount: 1599, status: 'Processing', paymentStatus: 'Postpaid', refundStatus: 'None', date: '2024-03-09', state: 'West Bengal', items: 2 },
  { id: 'SB008', customer: 'Frank Miller', email: 'frank@example.com', amount: 2199, status: 'Shipped', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-08', state: 'Maharashtra', items: 3 },
  { id: 'SB009', customer: 'Grace Lee', email: 'grace@example.com', amount: 449, status: 'Delivered', paymentStatus: 'Postpaid', refundStatus: 'None', date: '2024-03-07', state: 'Karnataka', items: 1 },
  { id: 'SB010', customer: 'Henry Brown', email: 'henry@example.com', amount: 3299, status: 'Booked', paymentStatus: 'Prepaid', refundStatus: 'None', date: '2024-03-06', state: 'Tamil Nadu', items: 4 },
];

const initialProducts = [
  { id: 'PROD001', name: 'Premium Dog Collar', sku: 'SKU001', price: 299.99, stock: 45, status: 'active', category: 'animal', quantitySold: 156 },
  { id: 'PROD002', name: 'Cat Bed Deluxe', sku: 'SKU002', price: 149.99, stock: 5, status: 'active', category: 'animal', quantitySold: 89 },
  { id: 'PROD003', name: 'Pet Shampoo', sku: 'SKU003', price: 29.99, stock: 120, status: 'active', category: 'animal', quantitySold: 234 },
  { id: 'PROD004', name: 'Bird Cage', sku: 'SKU004', price: 199.99, stock: 0, status: 'inactive', category: 'animal', quantitySold: 45 },
  { id: 'PROD005', name: 'Fish Tank Filter', sku: 'SKU005', price: 89.99, stock: 3, status: 'active', category: 'animal', quantitySold: 67 },
  { id: 'PROD006', name: 'Vitamin D Supplement', sku: 'SKU006', price: 19.99, stock: 200, status: 'active', category: 'human', quantitySold: 512 },
  { id: 'PROD007', name: 'Protein Powder', sku: 'SKU007', price: 49.99, stock: 85, status: 'active', category: 'human', quantitySold: 298 },
  { id: 'PROD008', name: 'Omega-3 Pills', sku: 'SKU008', price: 29.99, stock: 2, status: 'active', category: 'human', quantitySold: 189 },
  { id: 'PROD009', name: 'Multivitamin Gummies', sku: 'SKU009', price: 24.99, stock: 0, status: 'inactive', category: 'human', quantitySold: 156 },
  { id: 'PROD010', name: 'Collagen Powder', sku: 'SKU010', price: 59.99, stock: 42, status: 'active', category: 'human', quantitySold: 234 },
];

const initialCoupons = [
  { id: 'COUP001', code: 'SPRING2024', category: 'general', type: 'percent', value: 20, minOrder: 500, maxDiscount: 500, expiry: '2024-04-30', status: 'active', usageCount: 42, clauses: ['Valid on animal category only', 'Maximum 1 use per customer'] },
  { id: 'COUP002', code: 'FLAT100', category: 'first-order', type: 'flat', value: 100, minOrder: 1000, maxDiscount: 100, expiry: '2024-05-31', status: 'active', usageCount: 28, clauses: ['Applicable on human products', 'Cannot be combined with other offers'] },
  { id: 'COUP003', code: 'SAVE50', category: 'cart-based', type: 'percent', value: 10, minOrder: 300, maxDiscount: 200, expiry: '2024-03-20', status: 'inactive', usageCount: 15, clauses: ['Expired coupon'] },
];

const initialUsers = [
  { id: 'USER001', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', joinDate: '2024-01-15', orders: 5, totalSpent: 4299, status: 'active', orderHistory: [{ id: 'SB001', status: 'Delivered', amount: 1299 }, { id: 'SB006', status: 'Delivered', amount: 749 }], reviews: [{ productName: 'Premium Dog Collar', rating: 5, text: 'Excellent quality and great value!' }, { productName: 'Cat Bed Deluxe', rating: 4, text: 'Very comfortable, my cat loves it!' }] },
  { id: 'USER002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', joinDate: '2024-02-10', orders: 3, totalSpent: 2199, status: 'active', orderHistory: [{ id: 'SB002', status: 'Processing', amount: 899 }], reviews: [{ productName: 'Pet Shampoo', rating: 4, text: 'Good product, pleasant smell' }] },
  { id: 'USER003', name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', joinDate: '2024-01-20', orders: 8, totalSpent: 8999, status: 'active', orderHistory: [{ id: 'SB003', status: 'Shipped', amount: 2499 }], reviews: [{ productName: 'Vitamin D Supplement', rating: 5, text: 'Really helped boost my energy levels!' }, { productName: 'Protein Powder', rating: 5, text: 'Tastes great and mixes well' }, { productName: 'Omega-3 Pills', rating: 4, text: 'Good quality supplement' }] },
  { id: 'USER004', name: 'Alice Brown', email: 'alice@example.com', phone: '+1234567893', joinDate: '2024-03-01', orders: 1, totalSpent: 599, status: 'blocked', orderHistory: [{ id: 'SB004', status: 'Booked', amount: 599 }], reviews: [] },
  { id: 'USER005', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1234567894', joinDate: '2024-02-20', orders: 4, totalSpent: 5199, status: 'active', orderHistory: [{ id: 'SB005', status: 'Cancelled', amount: 1899 }], reviews: [{ productName: 'Collagen Powder', rating: 5, text: 'Amazing results on skin!' }] },
  { id: 'USER006', name: 'Diana Prince', email: 'diana@example.com', phone: '+1234567895', joinDate: '2024-01-10', orders: 6, totalSpent: 6499, status: 'active', orderHistory: [{ id: 'SB007', status: 'Processing', amount: 749 }], reviews: [{ productName: 'Multivitamin Gummies', rating: 4, text: 'Easy to take and effective' }, { productName: 'Fish Tank Filter', rating: 5, text: 'Works perfectly!' }] },
];

const initialAnalytics = {
  daily: [
    { date: 'Mar 1', sales: 2400, orders: 24 },
    { date: 'Mar 2', sales: 1398, orders: 22 },
    { date: 'Mar 3', sales: 9800, orders: 29 },
    { date: 'Mar 4', sales: 3908, orders: 20 },
    { date: 'Mar 5', sales: 4800, orders: 35 },
    { date: 'Mar 6', sales: 3800, orders: 27 },
    { date: 'Mar 7', sales: 4300, orders: 31 },
  ],
  weekly: [
    { date: 'Week 1', sales: 15298, orders: 142 },
    { date: 'Week 2', sales: 22100, orders: 189 },
    { date: 'Week 3', sales: 18900, orders: 167 },
    { date: 'Week 4', sales: 25400, orders: 213 },
  ],
  monthly: [
    { date: 'Jan', sales: 45200, orders: 412 },
    { date: 'Feb', sales: 52100, orders: 489 },
    { date: 'Mar', sales: 48900, orders: 467 },
  ],
};

const stateOrders = {
  daily: [
    { state: 'Maharashtra', orders: 8 },
    { state: 'Karnataka', orders: 5 },
    { state: 'Tamil Nadu', orders: 4 },
    { state: 'Delhi', orders: 6 },
    { state: 'Gujarat', orders: 3 },
  ],
  weekly: [
    { state: 'Maharashtra', orders: 28 },
    { state: 'Karnataka', orders: 18 },
    { state: 'Tamil Nadu', orders: 15 },
    { state: 'Delhi', orders: 22 },
    { state: 'Gujarat', orders: 12 },
  ],
  monthly: [
    { state: 'Maharashtra', orders: 98 },
    { state: 'Karnataka', orders: 72 },
    { state: 'Tamil Nadu', orders: 65 },
    { state: 'Delhi', orders: 88 },
    { state: 'Gujarat', orders: 54 },
  ],
};

const initialRefunds = [
  { id: 'REF001', orderId: 'SB005', customer: 'Charlie Wilson', amount: 1899, reason: 'Customer requested', status: 'Completed', initiatedDate: '2024-03-10', completedDate: '2024-03-11' },
  { id: 'REF002', orderId: 'SB008', customer: 'Frank Miller', amount: 599, reason: 'Failed delivery', status: 'In Progress', initiatedDate: '2024-03-12', completedDate: null },
  { id: 'REF003', orderId: 'SB009', customer: 'Grace Lee', amount: 299, reason: 'Product defect', status: 'Pending', initiatedDate: '2024-03-14', completedDate: null },
];

const initialReviews = [
  { id: 'REV001', orderId: 'SB001', userId: 'USER001', userName: 'John Doe', productId: 'PROD001', productName: 'Premium Dog Collar', rating: 5, reviewText: 'Excellent quality and great value! Highly recommend.', date: '2024-03-16', status: 'active' },
  { id: 'REV002', orderId: 'SB001', userId: 'USER001', userName: 'John Doe', productId: 'PROD002', productName: 'Cat Bed Deluxe', rating: 4, reviewText: 'Very comfortable, my cat loves it!', date: '2024-03-16', status: 'active' },
  { id: 'REV003', orderId: 'SB002', userId: 'USER002', userName: 'Jane Smith', productId: 'PROD003', productName: 'Pet Shampoo', rating: 4, reviewText: 'Good product, pleasant smell', date: '2024-03-15', status: 'active' },
  { id: 'REV004', orderId: 'SB003', userId: 'USER003', userName: 'Bob Johnson', productId: 'PROD006', productName: 'Vitamin D Supplement', rating: 5, reviewText: 'Really helped boost my energy levels!', date: '2024-03-17', status: 'active' },
  { id: 'REV005', orderId: 'SB003', userId: 'USER003', userName: 'Bob Johnson', productId: 'PROD007', productName: 'Protein Powder', rating: 5, reviewText: 'Tastes great and mixes well', date: '2024-03-17', status: 'active' },
  { id: 'REV006', orderId: 'SB007', userId: 'USER006', userName: 'Diana Prince', productId: 'PROD005', productName: 'Fish Tank Filter', rating: 5, reviewText: 'Works perfectly!', date: '2024-03-18', status: 'active' },
];

export const useMockData = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [users, setUsers] = useState(initialUsers);
  const [refunds, setRefunds] = useState(initialRefunds);
  const [reviews, setReviews] = useState(initialReviews);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const updateOrderPaymentStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, paymentStatus: newStatus } : o));
  };

  const cancelOrder = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o));
  };

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: `PROD${products.length + 1}` }]);
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(products.map(p => p.id === productId ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const addCoupon = (newCoupon) => {
    setCoupons([...coupons, { ...newCoupon, id: `COUP${coupons.length + 1}` }]);
  };

  const updateCoupon = (couponId, updatedData) => {
    setCoupons(coupons.map(c => c.id === couponId ? { ...c, ...updatedData } : c));
  };

  const deleteCoupon = (couponId) => {
    setCoupons(coupons.filter(c => c.id !== couponId));
  };

  const blockUnblockUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
  };

  const blockUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'blocked' } : u));
  };

  const unblockUser = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
  };

  const addRefund = (newRefund) => {
    setRefunds([...refunds, { ...newRefund, id: `REF${refunds.length + 1}` }]);
  };

  const updateRefund = (refundId, updatedData) => {
    setRefunds(refunds.map(r => r.id === refundId ? { ...r, ...updatedData } : r));
  };

  const deleteReview = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const updateReview = (reviewId, updatedData) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, ...updatedData } : r));
  };

  return {
    orders,
    products,
    coupons,
    users,
    refunds,
    reviews,
    analyticsData: initialAnalytics,
    stateOrders,
    updateOrderStatus,
    updateOrderPaymentStatus,
    cancelOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    blockUnblockUser,
    blockUser,
    unblockUser,
    addRefund,
    updateRefund,
    deleteReview,
    updateReview,
  };
};
