import './Card.css';

function Card({ title, children }) {
  return (
    <section className="card">
      {title && <h1 className="card-title">{title}</h1>}
      {children}
    </section>
  );
}

export default Card;
