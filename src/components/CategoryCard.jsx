import "../styles/CategoryCard.css";
function CategoryCard() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-container">
        <div className="card">🍎 Grocery</div>
        <div className="card">📱 Electronics</div>
        <div className="card">👕 Fashion</div>
        <div className="card">🏠 Home</div>
        <div className="card">💄 Beauty</div>
        <div className="card">⚽ Sports</div>
      </div>
    </section>
  );
}

export default CategoryCard;