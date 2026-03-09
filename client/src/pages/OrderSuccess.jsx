import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="text-6xl mb-4">🎉</div>
      <CheckCircle size={64} className="text-blinkit-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-blinkit-600 mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-2">Your order has been confirmed</p>
      <p className="text-gray-500 mb-6">Order ID: <span className="font-semibold">{orderId}</span></p>
      
      <div className="bg-blinkit-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">
          Your order will be delivered within <span className="font-semibold">10-15 minutes</span>
        </p>
      </div>

      <Link 
        to="/" 
        className="inline-block bg-blinkit-500 text-white px-8 py-3 rounded-lg hover:bg-blinkit-600 transition font-semibold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}