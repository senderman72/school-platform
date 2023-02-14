import React from "react";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="headers">
        <h1 className="header__title">Welcome to School Platform</h1>
        <p className="header__subtitle">
          A platform to help students and teachers collaborate.
        </p>
      </header>

      <section className="features">
        <h2 className="features__title">Features</h2>
        <ul className="features__list">
          <li className="features__item">
            <h3 className="features__item-title">Online Classrooms</h3>
            <p className="features__item-description">
              Attend live and recorded classes from anywhere, on any device.
            </p>
          </li>
          <li className="features__item">
            <h3 className="features__item-title">Assignments</h3>
            <p className="features__item-description">
              Submit and receive feedback on assignments, all in one place.
            </p>
          </li>
          <li className="features__item">
            <h3 className="features__item-title">Collaboration</h3>
            <p className="features__item-description">
              Work together with classmates on projects and group assignments.
            </p>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <p className="footer__text">
          &copy; 2023 School Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
