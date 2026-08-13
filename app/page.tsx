import { candidate } from "@/content/candidate";
import { contact } from "@/content/contact";
import { election } from "@/content/election";
import { events } from "@/content/events";
import { legislation } from "@/content/legislation";
import { news } from "@/content/news";
import { priorities } from "@/content/priorities";
import { site } from "@/content/site";
import { SignupForm } from "@/components/signup-form";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{election.office}</p>
            <h1>{candidate.name}</h1>
            <p className="lede">{site.description}</p>
            <div className="nav-links">
              <a className="button" href="#contact">
                Contact the Campaign
              </a>
              <a className="button secondary" href="#priorities">
                See Priorities
              </a>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Election information">
            <p className="eyebrow">Election Day</p>
            <strong>{election.electionDay}</strong>
            <p>{election.summary}</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">About</p>
            <h2>{candidate.headline}</h2>
          </div>
          <div className="feature-list">
            {candidate.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="priorities">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Priorities</p>
              <h2>Focused on practical results</h2>
            </div>
            <p>
              These file-based sections can be updated in GitHub now and moved
              to a CMS later without rebuilding the page layer.
            </p>
          </div>
          <div className="grid">
            {priorities.map((priority) => (
              <article className="card" key={priority.title}>
                <h3>{priority.title}</h3>
                <p>{priority.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Legislation</p>
            <h2>Issues to watch</h2>
          </div>
          <div className="feature-list">
            {legislation.map((item) => (
              <article className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="news">
        <div className="container split">
          <div>
            <p className="eyebrow">News</p>
            <h2>Campaign updates</h2>
          </div>
          <div className="news-list">
            {news.map((item) => (
              <article className="list-item" key={item.slug}>
                <time dateTime={item.date}>{item.date}</time>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="events">
        <div className="container split">
          <div>
            <p className="eyebrow">Events</p>
            <h2>Meet Will</h2>
          </div>
          <div className="event-list">
            {events.map((event) => (
              <article className="list-item" key={`${event.date}-${event.title}`}>
                <time dateTime={event.date}>{event.date}</time>
                <h3>{event.title}</h3>
                <p>{event.location}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="volunteer">
        <div className="container grid">
          <SignupForm
            formType="contact"
            title="Contact the Campaign"
            description={contact.contactIntro}
            buttonLabel="Send Message"
            fields={["name", "email", "message"]}
          />
          <SignupForm
            formType="newsletter"
            title="Newsletter Signup"
            description={contact.newsletterIntro}
            buttonLabel="Sign Up"
            fields={["name", "email"]}
          />
          <SignupForm
            formType="volunteer"
            title="Volunteer Signup"
            description={contact.volunteerIntro}
            buttonLabel="Volunteer"
            fields={["name", "email", "message"]}
          />
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="card">
            <p className="eyebrow">Campaign Contact</p>
            <h2>{contact.email}</h2>
            <p>{contact.mailingAddress}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
