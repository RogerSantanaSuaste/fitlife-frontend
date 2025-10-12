import "./create-workout-u.css";
import Header from "../components/header";
import Foter from "../components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Foter />
    </>
  );
}
