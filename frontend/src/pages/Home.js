import React from 'react';
import '../styles/Home.css'; // Import CSS file

function Home() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <nav className="navbar">
          <a className="logo" href="#">
            <img
              alt="Ai-R logo"
              src="https://placehold.co/80x24/ffffff/2a7fff?text=Ai-R&font=inter&font-weight=600&font-size=20"
            />
          </a>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Smart Suggestions</a></li>
            <li><a href="#">My Resumes</a></li>
          </ul>
          <div className="nav-actions">
            <a className="btn-signup" href="/signup">Sign Up</a>
            <a className="btn-login" href="/login">Login</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <h1>
              Craft Your Career Story with AI.
              <br />
              Build a Resume That Gets You Hired.
            </h1>
            <p>
              Leverage, cutting AI to create, optimize, and manage your professional profile effortlessly.
            </p>
            <button className="btn-primary">Build My Free Resume Now</button>
          </div>
          <div className="hero-image">
            <img
              alt="AI Resume Illustration"
              src="https://placehold.co/280x280/def2fc/2a7fff?text=AI+Resume+Illustration&font=inter&font-weight=600&font-size=18"
            />
          </div>
        </section>

        {/* Feature Cards */}
        <section className="feature-section">
          <article className="feature-card">
            <img src="https://placehold.co/40x40/ffffff/2a7fff?text=🤖" alt="AI Icon" />
            <h3>AI-Powered Resume Creation</h3>
            <p>Losersang nleon tal cases yeant tvenemetsno petest oleses</p>
            <img className="preview-img" src="https://placehold.co/260x100/ebf1f9/9a9a9a?text=Resume+Preview+1" alt="Resume Preview 1" />
          </article>
          <article className="feature-card">
            <img src="https://placehold.co/40x40/ffffff/2a7fff?text=⬆️" alt="Optimize Icon" />
            <h3>Optimize Your Current Resume</h3>
            <p>Lbeovong tnoes rat assense posribo oessensiy yoeut oasles</p>
            <img className="preview-img" src="https://placehold.co/260x100/ebf1f9/9a9a9a?text=Resume+Preview+2" alt="Resume Preview 2" />
          </article>
          <article className="feature-card">
            <img src="https://placehold.co/40x40/ffffff/2a7fff?text=💰" alt="Wallet Icon" />
            <h3>Centralized Resume Management</h3>
            <p>Slerpagn dnos seuses estio temenentris peal seases</p>
            <img className="preview-img" src="https://placehold.co/260x100/ebf1f9/9a9a9a?text=Resume+Preview+3" alt="Resume Preview 3" />
          </article>
        </section>

        {/* Templates Section */}
        <section className="templates-section">
          <div className="templates-content">
            <h2>Stand Out with Professionaly Designed Templates</h2>
            <p>To rem use sullers tleuere designte tits voved ooptiahent the tonpee in yeut tomlating.</p>
            <p>Unlock Your Potential with Smart Suggestions</p>
          </div>
          <div className="templates-img">
            <img
              alt="Resume Smart Suggestions"
              src="https://placehold.co/280x280/def2fc/7bc89c?text=Resume+with+Smart+Suggestions"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <img alt="Ai-R logo" src="https://placehold.co/80x24/ffffff/2a7fff?text=Ai-R" />
            <p>
              Logni quer trry builder wiket <br />
              Cepyright t to rortsisire ibv sepltest.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <p className="title">Product</p>
              <p>Features, Pricing</p>
            </div>
            <div>
              <p className="title">Company</p>
              <p>About Us, Blog</p>
            </div>
          </div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fas fa-dollar-sign"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
