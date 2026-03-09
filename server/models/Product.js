const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Soft Drinks', 'Energy Drinks', 'Juices', 'Water', 'Snacks', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  description: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: String,
    default: '10-15 mins'
  },
  stock: {
    type: Number,
    default: 100
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);