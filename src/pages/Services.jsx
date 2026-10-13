import { useState } from "react"
import { Link } from "react-router-dom"
import { services } from "../data/services"
import ServiceCard from "../components/ServiceCard"

const categories = ["All", "Web Development", "Graphic Design", "Photography"]

function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const query = searchTerm.toLowerCase()
    const matchesSearch = service.title.toLowerCase().includes(query) || service.provider.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="services-page">
      <section className="services-header">
        <nav className="page-links"><Link to="/">Home</Link><Link to="/favorites">Favorites</Link><Link to="/inbox">Inbox</Link></nav>
        <p className="eyebrow">EXPLORE MARKET</p>
        <h1>Find the right service for your needs.</h1>
        <p>Browse services from skilled professionals and find someone who can help with your next project.</p>
      </section>
      <section className="services-list">
        <div className="services-search">
          <input type="text" placeholder="Search services or providers..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
        <div className="category-filters">
          {categories.map((category) => (
            <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="service-grid">
          {filteredServices.length ? filteredServices.map((service) => <ServiceCard key={service.id} service={service} />) : (
            <div className="no-services">
              <h3>No services found</h3>
              <p>Try a different search term or category.</p>
              <button onClick={() => { setSearchTerm(""); setSelectedCategory("All") }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Services
