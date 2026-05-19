import './Page.css';

function Page({ children }) {
  return (
    <main className="page">
      <div className="content-container">{children}</div>
    </main>
  );
}

export default Page;
