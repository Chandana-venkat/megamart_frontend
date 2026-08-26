import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Banner.css";

function Banner() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: "/Images/Website_Banner_1.webp",
      title: "Welcome To MegaMart 🛒",
      text: "Everything you need, all in one place.",
      button: "Shop Now",
      action: "/products",
    },
    {
      id: 2,
      image: "/Images/gradient-shopping-discount-1.avif",
      title: "Mega Shopping Sale 🔥",
      text: "Grab amazing products at exciting prices.",
      button: "Explore Deals",
      action: "/products",
    },
    {
      id: 3,
      image: "/Images/fashion sale banner men women2.jpg",
      title: "Fashion For Everyone 👗",
      text: "Discover the latest styles for Men & Women.",
      button: "Shop Fashion",
      action: "/products",
    },
    {
      id: 4,
      image: "/Images/electronics-promotional3.webp",
      title: "Latest Electronics 🎧",
      text: "Upgrade your lifestyle with amazing gadgets.",
      button: "Shop Electronics",
      action: "/products",
    },
    {
      id: 5,
      image: "/Images/beauty4.webp",
      title: "Beauty & Care ✨",
      text: "Discover beauty products made for you.",
      button: "Shop Beauty",
      action: "/products",
    },
    {
      id: 6,
      image: "/Images/banner5.webp",
      title: "Big Deals Are Here 💥",
      text: "Shop more and save more with MegaMart.",
      button: "View Products",
      action: "/products",
    },
  ];



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [banners.length]);



  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };



  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="banner">

    
      <div
        className="banner-slider"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {banners.map((banner) => (
          <div className="banner-slide" key={banner.id}>

          
            <div className="banner-content">

              <h1>{banner.title}</h1>

              <p>{banner.text}</p>

              <button
                onClick={() => navigate(banner.action)}
              >
                {banner.button}
              </button>

            </div>

           
            <div className="banner-image-container">
              <img
                src={banner.image}
                alt={banner.title}
              />
            </div>

          </div>
        ))}
      </div>

     
      <button
        className="banner-arrow left"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        ❮
      </button>

      
      <button
        className="banner-arrow right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ❯
      </button>

     
      <div className="banner-dots">

        {banners.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${currentSlide === index ? "active" : ""
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>

    </section>
  );
}

export default Banner;