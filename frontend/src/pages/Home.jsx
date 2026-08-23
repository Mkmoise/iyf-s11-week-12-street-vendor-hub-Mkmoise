import {
  Link,
} from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            STREETVENDORHUB
          </p>

          <h1>
            Empowering Street Vendors
            Through Community
          </h1>

          <p>
            Discover local vendors,
            connect with customers,
            advertise your products,
            and share your experience
            with the community.
          </p>

          <div className="hero-actions">
            <Link
              to="/vendors"
              className="button"
            >
              Explore Vendors
            </Link>

            <Link
              to="/posts"
              className="button secondary-button"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              WHAT WE OFFER
            </p>

            <h2>
              Everything in one place
            </h2>
          </div>

          <div className="feature-grid">
            <article>
              <h3>
                Find Vendors
              </h3>

              <p>
                Discover local street
                vendors and their
                products.
              </p>
            </article>

            <article>
              <h3>
                Community
              </h3>

              <p>
                Share posts and interact
                through comments.
              </p>
            </article>

            <article>
              <h3>
                Advertise
              </h3>

              <p>
                Promote your products
                and services.
              </p>
            </article>

            <article>
              <h3>
                Your Profile
              </h3>

              <p>
                Build your own profile
                and connect with others.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
