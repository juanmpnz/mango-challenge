import React from "react";
// Providers
import Provider from "../../lib/Provider";
// Styles
import "../../assets/globals.css";
// Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Mango Challenge",
  description: "Develop inputs range for Mango company",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        <main className="px-8">
          <Provider>{children}</Provider>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
