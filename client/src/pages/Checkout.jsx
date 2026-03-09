import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { CreditCard, MapPin, Truck } from 'lucide-react';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { orderId } = await api.placeOrder(
        cart, 
        total, 
        formData,
        formData.paymentMethod
      );
      clearCart();
      navigate(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error("Order failed:", error);
      setError("Order failed. Please try again.");
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blinkit-500 hover:underline">
          Add items to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleOrder} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Delivery Address */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={20} className="text-blinkit-500" />
            <h3 className="font-semibold">Delivery Address</h3>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded mb-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded mb-3"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={20} className="text-blinkit-500" />
            <h3 className="font-semibold">Payment Method</h3>
          </div>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck size={20} className="text-blinkit-500" />
            <h3 className="font-semibold">Order Summary</h3>
          </div>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span>{item.name} x {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-blinkit-600">₹{total}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blinkit-500 text-white py-3 rounded-lg hover:bg-blinkit-600 transition font-semibold disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}