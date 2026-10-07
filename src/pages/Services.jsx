import { useState } from "react"

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
  },
]
const categories = [
  "All",
  "Web Development",
  "Graphic Design",
  "Photography",
]

function Services() {

const [selectedCategory, setSelectedCategory] = useState("All")
const filteredServices =
 selectedCategory === "All"
   ? services
   : services.filter(
    (service) => service.category === selectedCategory
   )

  return (
    <div className="services-page">
      <section className="services-header">
        <p className="eyebrow">EXPLORE MARKET</p>

        <h1>Find the right service for your needs.</h1>

        <p>
          Browse services from skilled professionals and find someone
          who can help with your next project.
        </p>
      </section>

      <section className="services-list">
        <div className="category-filters">
            {
                categories.map((category)=> (
                    <button 
                    key={category} 
                    className={ selectedCategory === category ? "active" : ""}
                    onClick={ ()=> setSelectedCategory(category)
                    }>
                       {category}
                    </button>
                )
            )
            }

         </div>
        <div className="service-grid">
         
          {filteredServices.map((service) => (
            <div className="service-card" key={service.title}>
              <div className={`service-image ${service.category.toLowerCase().replace(" ", "-")}`}>
                <span>{service.category}</span>
              </div>

              <div className="service-content">
                <h3>{service.title}</h3>

                <p className="provider">
                  By {service.provider}
                </p>

                <div className="service-bottom">
                  <span>★ {service.rating}</span>
                  <strong>Ksh {service.price}</strong>
                </div>
                <div className="service-action">
                    <button>View service →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Services