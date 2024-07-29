import React, { useState } from 'react';
import './ProductsPage.css';

const placeholderImage = 'https://via.placeholder.com/150';

const products = [
  { id: 1, name: 'T-shirt for Men', price: '$90.00', image: placeholderImage, category: 'Clothing' },
  { id: 2, name: 'Travel Bag Jeans', price: '$19.50', image: placeholderImage, category: 'Accessories' },
  { id: 3, name: 'Jeans shorts', price: '$70.00', image: placeholderImage, category: 'Clothing' },
  { id: 4, name: 'Sofa for interior', price: '$375.00', image: placeholderImage, category: 'Furniture' },
  { id: 5, name: 'Leather Wallet', price: '$375.00', image: placeholderImage, category: 'Accessories' },
  { id: 6, name: 'Travel Bag Jeans', price: '$375.00', image: placeholderImage, category: 'Accessories' },
  { id: 7, name: 'Just a Item', price: '$375.00', image: placeholderImage, category: 'Misc' },
  { id: 8, name: 'GoPro Camera 4K', price: '$32.00', image: placeholderImage, category: 'Electronics' },
  { id: 9, name: 'Headset Xiaomi', price: '$375.00', image: placeholderImage, category: 'Electronics' },
  { id: 10, name: 'WinterJacket', price: '$375.00', image: placeholderImage, category: 'Clothing' },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Last added');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = products
    .filter(product => 
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => sortOption === 'Last added' ? b.id - a.id : a.id - b.id);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <div className="header">
        <h2>Products grid</h2>
        <div className="header-buttons">
          <button className="export-btn">Export</button>
          <button className="create-btn">Create new</button>
        </div>
      </div>
      <div className="controls">
        <input 
          type="search" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <div className="right-controls">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Misc">Misc</option>
          </select>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Last added">Last added</option>
            <option value="First added">First added</option>
          </select>
        </div>
      </div>
      <div className="product-grid">
        {paginatedProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <div className="actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1} 
            className={currentPage === i + 1 ? 'active' : ''} 
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
