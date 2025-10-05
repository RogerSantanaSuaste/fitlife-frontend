import "./workout-u.css"; 
import Header from "../header/page";    
import "../header/header.css"; 
import Foter from "../foter/page";    
import "../foter/foter.css"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header/>
        {children}
        <Foter/>
      </body>
    </html>
  );
}
