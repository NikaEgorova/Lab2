import React, { useState } from 'react';

// Деструктуризуємо props для чистоти коду
function ProductCard({ name, price, description }) {

  // Стан для відстеження, чи був товар доданий до кошика
  const [isAdded, setIsAdded] = useState(false);

  // Обробник події для кнопки
  const handleAddToCart = () => {
    // Змінюємо стан на протилежний
    setIsAdded(!isAdded); 
  };

  return (
    <div className="product-card">
      <h2 className="product-name">{name}</h2>
      <p className="product-price">{price} грн</p>
      <p className="product-description">{description}</p>
      
      <button 
        className={isAdded ? 'btn-added' : 'btn-primary'}
        onClick={handleAddToCart}
      >
        {/* Відображаємо текст залежно від стану */}
        {isAdded ? 'У кошику (Натисніть для видалення)' : 'Купити'}
      </button>
    </div>
  );
}

export default ProductCard;