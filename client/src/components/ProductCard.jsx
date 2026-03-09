import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  return (
    <Link to={`/product/${product._id || product.id}`}>
      <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h4 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h4>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="text-lg font-bold text-blinkit-600">₹{product.price}</p>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="mt-2 w-full bg-blinkit-500 text-white py-2 rounded-lg hover:bg-blinkit-600 transition flex items-center justify-center"
          >
            <Plus size={16} className="mr-1" /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}