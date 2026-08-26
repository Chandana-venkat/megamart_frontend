import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewProduct.css";
import API from "../services/api";

function ViewProduct() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

   
    const getProducts = () => {
        API.get("/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

   
    const deleteProduct = (id) => {
        const confirmDelete = window.confirm("Delete this product?");

        if (!confirmDelete) return;

        API.delete(`/products/${id}`)
            .then(() => {
                alert("Product Deleted Successfully");
                getProducts();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="view-page">
            <h1>📦 Product Management</h1>

            <button
                className="add-product-btn"
                onClick={() => navigate("/admin/add-product")}
            >
                ➕ Add New Product
            </button>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="8">No Products Found</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="table-image"
                                    />
                                </td>

                                <td>{product.name}</td>

                                <td>{product.brand}</td>

                                <td>
                                    <span className="category-badge">
                                        {product.category}
                                    </span>
                                </td>

                                <td>₹{product.price}</td>

                                <td>⭐ {product.rating}</td>

                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(`/admin/edit-product/${product.id}`)
                                        }
                                    >
                                        ✏ Edit
                                    </button>
                                </td>

                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProduct;