import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AddProduct.css";

function AddProduct() {

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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct({

            ...product,

            [name]: value

        });

        let error = "";

        switch (name) {

            case "name":

                if (value.trim().length < 3) {

                    error = "Minimum 3 characters required";

                }

                break;


            case "brand":

                if (value.trim().length < 2) {

                    error =
                        "Brand name must contain at least 2 characters";

                }

                break;


            case "category":

                if (value === "") {

                    error = "Please Select Category";

                }

                break;


            case "price":

                if (Number(value) <= 0) {

                    error =
                        "Price must be greater than 0";

                }

                break;


            case "image":

                try {

                    new URL(value);

                } catch {

                    error =
                        "Enter Valid Image URL";

                }

                break;


            case "description":

                if (value.trim().length < 10) {

                    error =
                        "Description should contain minimum 10 characters";

                }

                break;


            case "rating":

                if (Number(value) < 1 || Number(value) > 5) {

                    error =
                        "Rating must be between 1 and 5";

                }

                break;


            case "reviews":

                if (Number(value) < 0) {

                    error =
                        "Reviews cannot be negative";

                }

                break;


            case "purchased":

                if (value.trim().length === 0) {

                    error =
                        "Purchased information is required";

                }

                break;


            default:

                break;

        }


        setErrors({

            ...errors,

            [name]: error

        });

    };



    const validateProduct = () => {

        const newErrors = {};


        if (product.name.trim().length < 3) {

            newErrors.name =
                "Minimum 3 characters required";

        }


        if (product.brand.trim().length < 2) {

            newErrors.brand =
                "Brand name must contain at least 2 characters";

        }


        if (product.category === "") {

            newErrors.category =
                "Please Select Category";

        }


        if (Number(product.price) <= 0) {

            newErrors.price =
                "Price must be greater than 0";

        }


        try {

            new URL(product.image);

        } catch {

            newErrors.image =
                "Enter Valid Image URL";

        }


        if (product.description.trim().length < 10) {

            newErrors.description =
                "Description should contain minimum 10 characters";

        }


        if (
            Number(product.rating) < 1 ||
            Number(product.rating) > 5
        ) {

            newErrors.rating =
                "Rating must be between 1 and 5";

        }


        if (Number(product.reviews) < 0) {

            newErrors.reviews =
                "Reviews cannot be negative";

        }


        if (product.purchased.trim().length === 0) {

            newErrors.purchased =
                "Purchased information is required";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const saveProduct = async (e) => {

        e.preventDefault();


        const isValid = validateProduct();


        if (!isValid) {

            alert("Please Fix All Validation Errors");

            return;

        }


        try {

            await API.post("/products", product);

            alert("✅ Product Added Successfully");

            navigate("/admin/view-products");

        } catch (err) {

            console.log(err);

            alert("Product Adding Failed");

        }

    };

return (

        <div className="admin-page">

            <div className="admin-form">

                <h1>Add Product</h1>


                <form onSubmit={saveProduct}>


                

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                    />

                    {errors.name && (

                        <p className="error">
                            {errors.name}
                        </p>

                    )}


                 

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={product.brand}
                        onChange={handleChange}
                    />

                    {errors.brand && (

                        <p className="error">
                            {errors.brand}
                        </p>

                    )}


                 

                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="Men">
                            Men
                        </option>

                        <option value="Women">
                            Women
                        </option>

                        <option value="Kids">
                            Kids
                        </option>

                        <option value="Beauty">
                            Beauty
                        </option>

                        <option value="GenZ">
                            GenZ
                        </option>

                        <option value="Home Living">
                            Home Living
                        </option>

                    </select>

                    {errors.category && (

                        <p className="error">
                            {errors.category}
                        </p>

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

                        <p className="error">
                            {errors.price}
                        </p>

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

                        <p className="error">
                            {errors.image}
                        </p>

                    )}


                    {/* Image Preview */}

                    {

                        product.image &&
                        !errors.image &&

                        <img
                            src={product.image}
                            alt="Preview"
                            className="preview-image"
                        />

                    }


                  

                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                    />

                    {errors.description && (

                        <p className="error">
                            {errors.description}
                        </p>

                    )}


               

                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        step="0.1"
                        value={product.rating}
                        onChange={handleChange}
                    />

                    {errors.rating && (

                        <p className="error">
                            {errors.rating}
                        </p>

                    )}


                  

                    <input
                        type="number"
                        name="reviews"
                        placeholder="Reviews"
                        value={product.reviews}
                        onChange={handleChange}
                    />

                    {errors.reviews && (

                        <p className="error">
                            {errors.reviews}
                        </p>

                    )}


                

                    <input
                        type="text"
                        name="purchased"
                        placeholder="Purchased Info"
                        value={product.purchased}
                        onChange={handleChange}
                    />

                    {errors.purchased && (

                        <p className="error">
                            {errors.purchased}
                        </p>

                    )}



                    <button type="submit">

                        ➕ Add Product

                    </button>


                </form>

            </div>

        </div>

    );

}


export default AddProduct;