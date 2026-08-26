import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/Help.css";

function Help() {

  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      category: "Orders",
      icon: "📦",
      question: "How can I place an order?",
      answer: (
        <>
          Select a product, click <b>Buy Now</b> or <b>Add To Cart</b>,
          enter your delivery address, choose a payment method and click
          <b> Place Order</b>.
        </>
      )
    },
    {
      category: "Payments",
      icon: "💳",
      question: "Which payment methods are available?",
      answer: (
        <ul>
          <li>Cash on Delivery (COD)</li>
          <li>UPI</li>
          <li>Credit Card</li>
          <li>Debit Card</li>
        </ul>
      )
    },
    {
      category: "Delivery",
      icon: "🚚",
      question: "How long does delivery take?",
      answer: (
        <>
          Orders are usually delivered within <b>3 - 7 business days.</b>
          <br />
          You can track your order from the <b>My Orders</b> page.
        </>
      )
    },
    {
      category: "Returns",
      icon: "↩️",
      question: "What is the return policy?",
      answer: (
        <>
          Products can be returned within <b>7 days</b> if eligible.
          Refunds are generally processed within <b>5-7 working days.</b>
        </>
      )
    },
    {
      category: "Account",
      icon: "👤",
      question: "How can I reset my password?",
      answer: (
        <>
          Go to the Login page and select <b>Forgot Password</b>.
          Enter your registered email and create a new password.
        </>
      )
    }
  ];

  const filteredFAQs = faqs.filter((faq) =>
    `${faq.category} ${faq.question} ${faq.answer}`
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="help-page">

        <section className="help-hero">

          <div className="help-hero-content">

            <div className="help-badge">
              🛟 MegaMart Support
            </div>

            <h1>
              How can we help you?
            </h1>

            <p>
              Find quick answers to your questions about
              orders, payments, delivery and more.
            </p>

            <div className="help-search">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search for help..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

        </section>


        <section className="help-categories">

          <div className="category-card">
            <div className="category-icon">📦</div>
            <h3>Orders</h3>
            <p>Place and manage your orders</p>
          </div>

          <div className="category-card">
            <div className="category-icon">💳</div>
            <h3>Payments</h3>
            <p>Payment and checkout help</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🚚</div>
            <h3>Delivery</h3>
            <p>Track your orders and delivery</p>
          </div>

          <div className="category-card">
            <div className="category-icon">↩️</div>
            <h3>Returns</h3>
            <p>Returns and refunds information</p>
          </div>

        </section>


        <section className="faq-section">

          <div className="faq-heading">

            <span>FAQ</span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Everything you need to know about MegaMart
            </p>

          </div>


          <div className="faq-container">

            {filteredFAQs.length > 0 ? (

              filteredFAQs.map((faq, index) => (

                <div
                  className={`faq-card ${open === index ? "faq-active" : ""
                    }`}
                  key={index}
                >

                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >

                    <div className="question-left">

                      <span className="faq-icon">
                        {faq.icon}
                      </span>

                      <div>

                        <small>
                          {faq.category}
                        </small>

                        <h3>
                          {faq.question}
                        </h3>

                      </div>

                    </div>

                    <span className="faq-plus">
                      {open === index ? "−" : "+"}
                    </span>

                  </button>


                  {open === index && (

                    <div className="faq-answer">

                      {faq.answer}

                    </div>

                  )}

                </div>

              ))

            ) : (

              <div className="no-results">

                <span>🔍</span>

                <h3>No results found</h3>

                <p>
                  Try searching with a different keyword.
                </p>

              </div>

            )}

          </div>

        </section>

        <section className="support-section">

          <div className="support-content">

            <div className="support-icon">
              💬
            </div>

            <div>

              <h2>
                Still need help?
              </h2>

              <p>
                Our customer support team is ready to help you.
              </p>

              <div className="support-details">

                <span>📧 support@megamart.com</span>

                <span>📞 +91 9876543210</span>

                <span>🕘 9:00 AM - 8:00 PM</span>

              </div>

            </div>

          </div>

          <a
            href="/contact"
            className="contact-button"
          >
            Contact Us →
          </a>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Help;