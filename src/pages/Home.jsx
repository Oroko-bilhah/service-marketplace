import '../App.css'
import { Link } from "react-router-dom"


const categories = [
   {
    name: "Web development",
    description: "Websites, Web Apps and Frontend development"
   },
   {
    name: "Graphic design",
    description: "Logos, branding and visual designs"
   },
   {
    name: "Photography",
    description: "Professional photos for any occasion"
   },
  {
    name: "Writing",
    description: "Articles, copy-writing and content creation"
  },
  {
    name: "Marketing",
    description: "Social media and digital marketing"
  }
]
const services = [
  {
    title: "Modern Business Website",
    provider: "Alex Mwangi",
    category: "Web Development",
    price: 10150,
    rating: 4.9,
  },
  {
    title: "Professional Brand Logo",
    provider: "Sarah Wanjiku",
    category: "Graphic Design",
    price: 12000,
    rating: 4.8,
  },
  {
    title: "Professional Event Photography",
    provider: "Daniel Otieno",
    category: "Photography",
    price: 500,
    rating: 4.9,
  }
]
const providers = [
  {
    name: "Alex Mwangi",
    profession: "Full-Stack Developer",
    rating: 4.9,
    services: 24,
  },
  {
    name: "Sarah Wanjiku",
    profession: "Graphic Designer",
    rating: 4.8,
    services: 18,
  },
  {
    name: "Daniel Otieno",
    profession: "Professional Photographer",
    rating: 4.9,
    services: 31,
  },
]
function Home()
{
    return (
        <div>
      <header className="navbar">
        <h2> Service Market</h2>
        <nav>
        <a href="#"> Home </a>
        <a href="/Services"> Services </a>
        <a href="/Providers"> Providers </a>
      </nav>
      <button> Get Started </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow"> FIND THE RIGHT PROFESSIONAL </p>
            <h1> Find skilled people <br/> for any service </h1>
            <p className="hero-text">
              Discover trusted professionals, compare services, and find the right person for your next project
            </p>
          <div className="search-box">
            <input type="text" placeholder="What service are you looking for" />
            <button>Search</button>

          </div>

          </div>

        </section>
        <section className="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow"> EXPLORE SERVICES</p>
              <h2> What do you need help with?</h2>
            </div>
            <a href="#"> View all services →</a>
          </div>
          <div className="category-grid">
            {
              categories.map((category)=>
              (
                <div className="category-card" key={category.name}>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <a href="#">Explore →</a>
                </div>
              )

              )
            }

          </div>

        </section>
        <section className="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow"> FEATURED SERVICES</p>
              <h2> Popular services</h2>
            </div>
            <a href="#">View all services →</a>
          </div>
          
          <div className="service-grid">
    {services.map((service) => (
      <div className="service-card" key={service.title}>
        <div className="service-image">
          <span>{service.category}</span>
        </div>

        <div className="service-content">
          <h3>{service.title}</h3>

          <p className="provider">
            By {service.provider}
          </p>

          <div className="service-bottom">
            <span>★ {service.rating}</span>
            <strong>Ksh{service.price}</strong>
          </div>
        </div>
      </div>
    ))}
        </div>
        </section>
        <section className="how-it-works">
  <div className="section-heading centered">
    <div>
      <p className="eyebrow">HOW IT WORKS</p>
      <h2>Simple from start to finish</h2>
    </div>
  </div>

  <div className="steps">
    <div className="step">
      <span className="step-number">01</span>
      <h3>Find a service</h3>
      <p>
        Search for the service you need and explore professionals
        who can help.
      </p>
    </div>

    <div className="step">
      <span className="step-number">02</span>
      <h3>Compare providers</h3>
      <p>
        Compare services, prices, ratings, reviews, and provider
        profiles before choosing.
      </p>
    </div>

    <div className="step">
      <span className="step-number">03</span>
      <h3>Get the job done</h3>
      <p>
        Request the service and work directly with the professional
        you choose.
      </p>
    </div>
  </div>
</section>
<section className="providers">
  <div className="section-heading">
    <div>
      <p className="eyebrow">MEET THE PROFESSIONALS</p>
      <h2>Top service providers</h2>
    </div>

    <a href="#">View all providers →</a>
  </div>

  <div className="provider-grid">
    {providers.map((provider) => (
      <div className="provider-card" key={provider.name}>
        <div className="provider-avatar">
          {provider.name
            .split(" ")
            .map((name) => name[0])
            .join("")}
        </div>

        <div className="provider-info">
          <h3>{provider.name}</h3>
          <p>{provider.profession}</p>

          <div className="provider-stats">
            <span>★ {provider.rating}</span>
            <span>{provider.services} services</span>
          </div>
        </div>

        <a href="#" className="profile-link">
          View profile →
        </a>
      </div>
    ))}
  </div>
</section>
<section className="cta">
  <div className="cta-content">
    <p className="eyebrow">READY TO GET STARTED?</p>

    <h2>Find the right professional for your next project.</h2>

    <p>
      Explore services from skilled professionals and find someone
      who fits your needs, budget, and goals.
    </p>

    <button>Explore Services →</button>
  </div>
</section>

<footer className="footer">
  <div className="footer-brand">
    <h2>Market</h2>
    <p>A better way to find and offer services.</p>
  </div>

  <div className="footer-links">
    <div>
      <h4>Marketplace</h4>
      <a href="#">Services</a>
      <a href="#">Providers</a>
      <a href="#">Categories</a>
    </div>

    <div>
      <h4>Company</h4>
      <a href="#">About</a>
      <a href="#">How it works</a>
      <a href="#">Contact</a>
    </div>
  </div>
</footer>
      </main>
      
    </div>
    )
}

export default Home
