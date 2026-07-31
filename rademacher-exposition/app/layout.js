import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata = {
  title: "Independent Rademacher Matrices · Lean ↔ Mathematics",
  description: "A synchronized formal and mathematical exposition of a trace-moment argument."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
