import "./create-workout-u.css";
import Header from "../components/header";
import "../components/footer.css";
import Foter from "../components/footer";
import "../components/header.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Foter />
    </>
  );
}
