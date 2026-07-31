import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/EditProduct.css";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        image: "",
        description: "",
        rating: "",
        reviews: "",
        purchased: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        image: "",
        description: "",
        rating: "",
        reviews: "",
        purchased: ""
    });

    useEffect(() => {

        API.get(`/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log(err));

    }, [id]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: value
        });

        let error = "";

        switch (name) {

            case "name":
                if (value.trim() === "")
                    error = "Product Name is required";
                else if (value.trim().length < 3)
                    error = "Minimum 3 characters required";
                break;

            case "brand":
                if (value.trim() === "")
                    error = "Brand is required";
                else if (value.trim().length < 2)
                    error = "Minimum 2 characters required";
                break;

            case "category":
                if (value === "")
                    error = "Please Select Category";
                break;

            case "price":
                if (value === "")
                    error = "Price is required";
                else if (Number(value) <= 0)
                    error = "Price must be greater than 0";
                break;

            case "image":
                if (value.trim() === "")
                    error = "Image URL is required";
                else {
                    try {
                        new URL(value);
                    } catch {
                        error = "Invalid Image URL";
                    }
                }
                break;

            case "description":
                if (value.trim().length < 10)
                    error = "Minimum 10 characters required";
                break;

            case "rating":
                if (value === "")
                    error = "Rating is required";
                else if (Number(value) < 1 || Number(value) > 5)
                    error = "Rating must be between 1 and 5";
                break;

            case "reviews":
                if (value === "")
                    error = "Reviews required";
                else if (Number(value) < 0)
                    error = "Reviews cannot be negative";
                break;

            case "purchased":
                if (value.trim() === "")
                    error = "Purchased text required";
                break;
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };
    const updateProduct = async (e) => {

    e.preventDefault();

    let newErrors = {

        name: "",
        brand: "",
        category: "",
        price: "",
        image: "",
        description: "",
        rating: "",
        reviews: "",
        purchased: ""

    };

    if (product.name.trim().length < 3) {
        newErrors.name = "Minimum 3 characters required";
    }

    if (product.brand.trim().length < 2) {
        newErrors.brand = "Minimum 2 characters required";
    }

    if (product.category === "") {
        newErrors.category = "Please Select Category";
    }

    if (product.price === "" || Number(product.price) <= 0) {
        newErrors.price = "Price must be greater than 0";
    }

    if (product.image.trim() === "") {
        newErrors.image = "Image URL is required";
    } else {
        try {
            new URL(product.image);
        } catch {
            newErrors.image = "Invalid Image URL";
        }
    }

    if (product.description.trim().length < 10) {
        newErrors.description = "Minimum 10 characters required";
    }

    if (
        product.rating === "" ||
        Number(product.rating) < 1 ||
        Number(product.rating) > 5
    ) {
        newErrors.rating = "Rating must be between 1 and 5";
    }

    if (
        product.reviews === "" ||
        Number(product.reviews) < 0
    ) {
        newErrors.reviews = "Reviews cannot be negative";
    }

    if (product.purchased.trim() === "") {
        newErrors.purchased = "Purchased text is required";
    }

    setErrors(newErrors);

    if (
        Object.values(newErrors).some(error => error !== "")
    ) {
        return;
    }

    try {

        await API.put(`/products/${id}`, product);

        alert("✅ Product Updated Successfully");

        navigate("/admin/products");   // Change to "/admin/view-products" if that is your route

    } catch (err) {

        console.log(err);

        alert("❌ Update Failed");

    }

};
return (

    <div className="admin-page">

        <div className="admin-form">

            <h1>✏ Edit Product</h1>

            <form onSubmit={updateProduct}>

                {/* Product Name */}

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                />

                {errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                {/* Brand */}

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                />

                {errors.brand && (
                    <p className="error">{errors.brand}</p>
                )}

                {/* Category */}

                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Beauty">Beauty</option>
                    <option value="GenZ">GenZ</option>
                    <option value="Home Living">Home Living</option>
                </select>

                {errors.category && (
                    <p className="error">{errors.category}</p>
                )}

                {/* Price */}

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                {errors.price && (
                    <p className="error">{errors.price}</p>
                )}

                {/* Image */}

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                />

                {errors.image && (
                    <p className="error">{errors.image}</p>
                )}

                {
                    product.image &&
                    !errors.image && (
                        <img
                            src={product.image}
                            alt="Preview"
                            className="preview-image"
                        />
                    )
                }

                {/* Description */}

                <textarea
                    rows="4"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                {errors.description && (
                    <p className="error">{errors.description}</p>
                )}

                {/* Rating */}

                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="Rating"
                    value={product.rating}
                    onChange={handleChange}
                />

                {errors.rating && (
                    <p className="error">{errors.rating}</p>
                )}

                {/* Reviews */}

                <input
                    type="number"
                    name="reviews"
                    placeholder="Reviews"
                    value={product.reviews}
                    onChange={handleChange}
                />

                {errors.reviews && (
                    <p className="error">{errors.reviews}</p>
                )}

                {/* Purchased */}

                <input
                    type="text"
                    name="purchased"
                    placeholder="Purchased Text"
                    value={product.purchased}
                    onChange={handleChange}
                />

                {errors.purchased && (
                    <p className="error">{errors.purchased}</p>
                )}

                <button type="submit">
                    💾 Update Product
                </button>

            </form>

        </div>

    </div>

);

}

export default EditProduct;