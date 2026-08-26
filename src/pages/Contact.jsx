import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/Contact.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        let error = "";

        if (name === "name" && value !== "") {

            if (!/^[A-Za-z ]{3,}$/.test(value)) {
                error = "Enter a valid name";
            }

        }

        if (name === "email" && value !== "") {

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Enter a valid email";
            }

        }

        if (name === "phone" && value !== "") {

            if (!/^[6-9][0-9]{9}$/.test(value)) {
                error = "Enter a valid 10 digit mobile number";
            }

        }

        if (name === "message" && value !== "") {

            if (value.length < 10) {
                error = "Message must contain at least 10 characters";
            }

        }

        setErrors({
            ...errors,
            [name]: error
        });

    };


    const submitForm = (e) => {

        e.preventDefault();

        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        // Validate entered values
        if (
            formData.name &&
            !/^[A-Za-z ]{3,}$/.test(formData.name)
        ) {
            newErrors.name = "Enter a valid name";
        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (
            formData.phone &&
            !/^[6-9][0-9]{9}$/.test(formData.phone)
        ) {
            newErrors.phone = "Enter a valid 10 digit mobile number";
        }

        if (
            formData.message &&
            formData.message.length < 10
        ) {
            newErrors.message =
                "Message must contain at least 10 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        alert("Message sent successfully 🎉");

        setFormData({
            name: "",
            email: "",
            phone: "",
            message: ""
        });

        setErrors({});

    };


    return (

        <>

            <div className="contact-page">

                {/* Hero Section */}

                <div className="contact-hero">

                    <div>

                        <span className="contact-badge">
                            💬 Get In Touch
                        </span>

                        <h1>
                            We'd Love To
                            <span> Hear From You</span>
                        </h1>

                        <p>
                            Have a question, suggestion, or need help
                            with your order? Our team is always happy
                            to help.
                        </p>

                    </div>

                </div>


                {/* Main Contact Section */}

                <div className="contact-section">


                    {/* Left Side */}

                    <div className="contact-info">

                        <h2>
                            Let's Talk
                        </h2>

                        <p className="info-text">
                            Whether you have a question about our
                            products, orders, or anything else,
                            we're here to help.
                        </p>


                        <div className="info-card">

                            <div className="info-icon">
                                📧
                            </div>

                            <div>
                                <h3>Email Us</h3>
                                <p>support@megamart.com</p>
                            </div>

                        </div>


                        <div className="info-card">

                            <div className="info-icon">
                                📞
                            </div>

                            <div>
                                <h3>Call Us</h3>
                                <p>+91 98765 43210</p>
                            </div>

                        </div>


                        <div className="info-card">

                            <div className="info-icon">
                                📍
                            </div>

                            <div>
                                <h3>Visit Us</h3>
                                <p>Vijayawada, Andhra Pradesh</p>
                            </div>

                        </div>


                        <div className="social-box">

                            <h3>
                                Follow MegaMart
                            </h3>

                            <div className="social-icons">

                                <span>📘</span>
                                <span>📸</span>
                                <span>🐦</span>
                                <span>▶️</span>

                            </div>

                        </div>

                    </div>


                    {/* Right Side - Form */}

                    <div className="contact-form-card">

                        <div className="form-heading">

                            <h2>
                                Send Us a Message
                            </h2>

                            <p>
                                Fill out the form and we'll get back
                                to you shortly.
                            </p>

                        </div>


                        <form onSubmit={submitForm}>


                            {/* Name */}

                            <div className="input-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={
                                        errors.name
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.name && (
                                    <p className="error">
                                        {errors.name}
                                    </p>
                                )}

                            </div>


                            {/* Email */}

                            <div className="input-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={
                                        errors.email
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.email && (
                                    <p className="error">
                                        {errors.email}
                                    </p>
                                )}

                            </div>


                            {/* Phone */}

                            <div className="input-group">

                                <label>
                                    Mobile Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your mobile number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={
                                        errors.phone
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.phone && (
                                    <p className="error">
                                        {errors.phone}
                                    </p>
                                )}

                            </div>


                            {/* Message */}

                            <div className="input-group">

                                <label>
                                    Message
                                </label>

                                <textarea
                                    name="message"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={
                                        errors.message
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.message && (
                                    <p className="error">
                                        {errors.message}
                                    </p>
                                )}

                            </div>


                            <button
                                type="submit"
                                className="send-btn"
                            >

                                Send Message
                                <span> → </span>

                            </button>


                        </form>

                    </div>

                </div>

            </div>


            <Footer />

        </>

    );

}

export default Contact;