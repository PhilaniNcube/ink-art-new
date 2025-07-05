import { ReactNode } from "react";
import "./globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
