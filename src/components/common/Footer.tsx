import Container from "./Container";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t mt-16 py-12 px-4 border-(--border)">
      <Container>
        <div className=" flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
