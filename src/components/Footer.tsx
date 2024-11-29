import React from "react";
// Texts
import componentTexts from "./texts.json";

const Footer: React.FC = () => {
  const { footer } = componentTexts;
  return (
    <footer>
      <div className="absolute w-full bottom-0 text-center py-8">
        <p className="text-center text-xs">{footer.text}</p>
      </div>
    </footer>
  );
};

export default Footer;
