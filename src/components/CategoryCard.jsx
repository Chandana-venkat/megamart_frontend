import "../styles/CategoryCard.css";

function CategoryCard() {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-container">

        <div className="category-card">
          <img src="/images/men.jpg" alt="Men" />
          <h3>Men</h3>
        </div>

        <div className="category-card">
          <img src="/images/women.jpg" alt="Women" />
          <h3>Women</h3>
        </div>

        <div className="category-card">
          <img src="/images/genz.jpg" alt="Gen Z" />
          <h3>Gen Z</h3>
        </div>

        <div className="category-card">
          <img src="/images/kids.jpg" alt="Kids" />
          <h3>Kids</h3>
        </div>

        <div className="category-card">
          <img src="/images/home.jpg" alt="Home & Living" />
          <h3>Home & Living</h3>
        </div>

        <div className="category-card">
          <img src="/images/beauty.jpg" alt="Beauty" />
          <h3>Beauty</h3>
        </div>

      </div>
    </section>
  );
}

export default CategoryCard;