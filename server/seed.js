const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');
require('dotenv').config();

const products = [
  { 
    name: 'Coca-Cola Classic', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80', 
    description: 'The original cola taste.', 
    rating: 4.8, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Sprite', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=500&q=80', 
    description: 'Lemon-lime soda.', 
    rating: 4.7, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Fanta Orange', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1624516249327-99e644443222?auto=format&fit=crop&w=500&q=80', 
    description: 'Orange flavored soda.', 
    rating: 4.6, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Red Bull', 
    category: 'Energy Drinks', 
    price: 250, 
    image: 'https://images.unsplash.com/photo-1543362906-ac1b452601d8?auto=format&fit=crop&w=500&q=80', 
    description: 'Gives you wings.', 
    rating: 4.9, 
    deliveryTime: '15 mins',
    stock: 50
  },
  { 
    name: 'Monster Energy', 
    category: 'Energy Drinks', 
    price: 220, 
    image: 'https://images.unsplash.com/photo-1582236548566-22b794224226?auto=format&fit=crop&w=500&q=80', 
    description: 'Unleash the beast.', 
    rating: 4.5, 
    deliveryTime: '15 mins',
    stock: 50
  },
  { 
    name: 'Tropicana Orange', 
    category: 'Juices', 
    price: 120, 
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80', 
    description: '100% pure orange juice.', 
    rating: 4.8, 
    deliveryTime: '10 mins',
    stock: 75
  },
  { 
    name: 'Real Mango', 
    category: 'Juices', 
    price: 110, 
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=500&q=80', 
    description: 'Real mango pulp.', 
    rating: 4.7, 
    deliveryTime: '10 mins',
    stock: 75
  },
  { 
    name: 'Kinley Water', 
    category: 'Water', 
    price: 20, 
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=80', 
    description: 'Pure drinking water.', 
    rating: 4.9, 
    deliveryTime: '5 mins',
    stock: 200
  },
  { 
    name: 'Mountain Dew', 
    category: 'Soft Drinks', 
    price: 45, 
    image: 'https://images.unsplash.com/photo-1624516249327-99e644443222?auto=format&fit=crop&w=500&q=80', 
    description: 'The taste of electric.', 
    rating: 4.6, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Pepsi', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1624516249327-99e644443222?auto=format&fit=crop&w=500&q=80', 
    description: 'The choice of a new generation.', 
    rating: 4.7, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Lays Chips', 
    category: 'Snacks', 
    price: 20, 
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80', 
    description: 'Salted potato chips.', 
    rating: 4.5, 
    deliveryTime: '10 mins',
    stock: 150
  },
  { 
    name: 'Biscuits', 
    category: 'Snacks', 
    price: 10, 
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80', 
    description: 'Crunchy biscuits.', 
    rating: 4.4, 
    deliveryTime: '10 mins',
    stock: 150
  },
  { 
    name: 'Thums Up', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1624516249327-99e644443222?auto=format&fit=crop&w=500&q=80', 
    description: 'Taste the thunder.', 
    rating: 4.7, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: '7UP', 
    category: 'Soft Drinks', 
    price: 40, 
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=500&q=80', 
    description: 'Clear, crisp, refreshing.', 
    rating: 4.6, 
    deliveryTime: '10 mins',
    stock: 100
  },
  { 
    name: 'Punch', 
    category: 'Juices', 
    price: 100, 
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80', 
    description: 'Fruit punch drink.', 
    rating: 4.5, 
    deliveryTime: '10 mins',
    stock: 75
  },
  { 
    name: 'Bisleri Water', 
    category: 'Water', 
    price: 20, 
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=80', 
    description: 'Pure bottled water.', 
    rating: 4.8, 
    deliveryTime: '5 mins',
    stock: 200
  },
  { 
    name: 'C2 Energy', 
    category: 'Energy Drinks', 
    price: 180, 
    image: 'https://images.unsplash.com/photo-1543362906-ac1b452601d8?auto=format&fit=crop&w=500&q=80', 
    description: 'Zero sugar energy.', 
    rating: 4.6, 
    deliveryTime: '15 mins',
    stock: 50
  },
  { 
    name: 'Bournvita', 
    category: 'Juices', 
    price: 130, 
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=500&q=80', 
    description: 'Chocolate drink mix.', 
    rating: 4.7, 
    deliveryTime: '10 mins',
    stock: 75
  },
  { 
    name: 'Kurkure', 
    category: 'Snacks', 
    price: 20, 
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80', 
    description: 'Spicy corn snack.', 
    rating: 4.6, 
    deliveryTime: '10 mins',
    stock: 150
  },
  { 
    name: 'Haldirams Bikaneri Bhujia', 
    category: 'Snacks', 
    price: 30, 
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80', 
    description: 'Traditional Indian snack.', 
    rating: 4.8, 
    deliveryTime: '10 mins',
    stock: 150
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const insertedProducts = await Product.insertMany(products);
    console.log(`📦 Inserted ${insertedProducts.length} products`);

    console.log('\n📊 Database Seeded Successfully!');
    console.log('📍 Categories:', [...new Set(products.map(p => p.category))]);
    console.log('📍 Total Products:', products.length);
    console.log('📍 Server URL: http://localhost:5000');
    console.log('📍 API Endpoints:');
    console.log('   GET    /api/products');
    console.log('   GET    /api/products/:id');
    console.log('   POST   /api/products');
    console.log('   PUT    /api/products/:id');
    console.log('   DELETE /api/products/:id');
    console.log('   GET    /api/products/categories');
    console.log('   POST   /api/orders');
    console.log('   GET    /api/orders');
    console.log('   PUT    /api/orders/:id/status');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();