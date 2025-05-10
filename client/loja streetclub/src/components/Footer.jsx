import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <a href="http://www.skyzdesign.com.br/" target='__blank'><p>&copy; {new Date().getFullYear()} Skyz Design. Todos os direitos reservados.</p></a>
    </footer>
  );
}