import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blinkit-500 hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-lg font-bold text-blinkit-600">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateQty(item._id, -1)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-semibold">{item.qty}</span>
              <button 
                onClick={() => updateQty(item._id, 1)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Plus size={16} />
              </button>
            </div>
            <button 
              onClick={() => removeFromCart(item._id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Subtotal</span>
          <span className="text-blinkit-600">₹{total}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Delivery Fee</span>
          <span className="text-blinkit-600">₹0</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t pt-4 mb-6">
          <span>Total</span>
          <span className="text-blinkit-600">₹{total}</span>
        </div>
        <Link 
          to="/checkout" 
          className="block w-full bg-blinkit-500 text-white text-center py-3 rounded-lg hover:bg-blinkit-600 transition font-semibold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}