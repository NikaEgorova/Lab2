import ProductCard from './components/ProductCard';
import './App.css'; 

// Дані, які ми передаємо у дочірні компоненти
const PRODUCTS = [
  { id: 1, name: 'Ноутбук T100', price: 25000, description: 'Легкий та потужний ноутбук для роботи та навчання.' },
  { id: 2, name: 'Миша ERGO-X', price: 1200, description: 'Бездротова ергономічна миша з підсвічуванням.' },
  { id: 3, name: 'Монітор 27" 4K', price: 18500, description: 'Професійний монітор для графічного дизайну.' },
];

function App() {
  return (
    <div className="app-container">
      <h1>Наш Магазин React-компонентів</h1>
      <div className="product-list">
        
        {/* Завдання 4: Рендеринг списку та передача props */}
        {PRODUCTS.map(product => (
          <ProductCard 
            key={product.id} // Обов'язковий унікальний ключ для списків
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}

      </div>
    </div>
  );
}

export default App;