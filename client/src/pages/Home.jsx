import { useEffect, useState, useCallback } from "react";
import { api } from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getProducts(
        page, 
        12, 
        searchTerm, 
        selectedCategory
      );
      
      const newProducts = response.products || [];
      
      setProducts(prev => page === 1 ? newProducts : [...prev, ...newProducts]);
      
      if (response.totalPages) {
        setHasMore(page < response.totalPages);
      } else {
        setHasMore(newProducts.length === 12);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
    setLoading(false);
  }, [page, searchTerm, selectedCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await api.getCategories();
        // Ensure categories is always an array
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search & Filter */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products && products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          !loading && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )
        )}
        {loading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-48" />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blinkit-500 text-white px-8 py-3 rounded-lg hover:bg-blinkit-600 transition font-semibold"
          >
            Load More
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blinkit-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}