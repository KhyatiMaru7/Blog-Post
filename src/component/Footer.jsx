import './Footer.css';

export function Footer() {
  const CurrentYear=new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© { CurrentYear} All right are reseved BlogPost </p>
    </footer>
  );
}
