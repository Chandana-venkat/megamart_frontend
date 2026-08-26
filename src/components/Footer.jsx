import "../styles/Footer.css";

function Footer(){

    return(
        <footer className="footer">

            <div className="footer-container">

                
                <div className="footer-section">
                    <h3>Customer Support</h3>
                    <p>Contact Us</p>
                    <p>Help Center</p>
                    <p>FAQs</p>
                    <p>Order Tracking</p>
                </div>


                
                <div className="footer-section">
                    <h3>Policies</h3>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Return Policy</p>
                    <p>Shipping Policy</p>
                </div>


                
                <div className="footer-section">
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Our Stores</p>
                    <p>Blog</p>
                </div>


               
                <div className="footer-section">
                    <h3>Social Links</h3>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>LinkedIn</p>
                </div>


        
                <div className="footer-section newsletter">

                    <h3>Newsletter</h3>

                    <p>Subscribe for latest offers</p>

                    <input 
                        type="email"
                        placeholder="Enter your email"
                    />

                    <button>
                        Subscribe
                    </button>

                </div>


            </div>


            <div className="footer-bottom">

                © 2026 MegaMart. All Rights Reserved.

            </div>


        </footer>
    )

}

export default Footer;
