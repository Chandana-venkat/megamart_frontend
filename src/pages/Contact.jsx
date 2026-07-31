import { useState } from "react";
// import Nav from "../components/Nav";
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

                error = "Enter valid name";

            }

        }





        if (name === "email" && value !== "") {

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

                error = "Invalid email";

            }

        }





        if (name === "phone" && value !== "") {

            if (!/^[6-9][0-9]{9}$/.test(value)) {

                error = "Enter valid 10 digit mobile number";

            }

        }





        if (name === "message" && value !== "") {

            if (value.length < 10) {

                error = "Message minimum 10 characters";

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



        if (!formData.name) {

            newErrors.name = "Name is required";

        }


        if (!formData.email) {

            newErrors.email = "Email is required";

        }


        if (!formData.phone) {

            newErrors.phone = "Mobile number is required";

        }


        if (!formData.message) {

            newErrors.message = "Message is required";

        }



        setErrors(newErrors);



        if (Object.keys(newErrors).length > 0) {

            return;

        }



        if (Object.values(errors).some(err => err !== "")) {

            alert("Please fix errors");

            return;

        }



        alert("Message sent successfully 🎉");



        setFormData({

            name: "",
            email: "",
            phone: "",
            message: ""

        });


    };







    return (

        <>

         


            <div className="contact-container">


                <h1>
                    Contact Us
                </h1>



                <form onSubmit={submitForm}>


                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <p className="error">
                        {errors.name}
                    </p>





                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <p className="error">
                        {errors.email}
                    </p>





                    <input
                        type="text"
                        name="phone"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <p className="error">
                        {errors.phone}
                    </p>





                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <p className="error">
                        {errors.message}
                    </p>





                    <button type="submit">
                        Send Message
                    </button>


                </form>


            </div>


           


        </>

    );


}


export default Contact;