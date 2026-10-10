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
const [searchTerm, setSearchTerm] = useState("")


const filteredServices = services.filter((service) => {
const matchesCategory =
    selectedCategory === "All" ||
    service.category === selectedCategory

const matchesSearch =
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase())

  return matchesCategory && matchesSearch
})


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
        <div className="services-search">
  <input
    type="text"
    placeholder="Search services or providers..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
</div>
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
 
{filteredServices.length > 0 ? (
  filteredServices.map((service) => (
    <div className="service-card" key={service.title}>
      <div
        className={`service-image ${service.category.toLowerCase().replace(" ", "-")}`}
      >
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
  ))
) : (
  <div className="no-services">
    <h3>No services found</h3>
    <p>Try a different search term or category.</p>
    <button
      onClick={() => {
        setSearchTerm("")
        setSelectedCategory("All")
      }}
    >
      Clear filters
    </button>
  </div>
)}

        </div>
      </section>
    </div>
  )
}

export default Services