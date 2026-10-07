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

function Providers() {
  return (
    <div className="providers-page">

      <section className="providers-header">
        <p className="eyebrow">DISCOVER TALENT</p>

        <h1>Find skilled professionals for your next project.</h1>

        <p>
          Explore trusted professionals, compare their services,
          and find the right person for the job.
        </p>
      </section>

      <section className="providers-list">

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
                <h2>{provider.name}</h2>

                <p>{provider.profession}</p>

                <div className="provider-stats">
                  <span>★ {provider.rating}</span>
                  <span>{provider.services} services</span>
                </div>

                <button className="profile-link">
                  View profile →
                </button>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Providers