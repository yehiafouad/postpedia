import React from "react";
import useLocalStorage from "../hooks/use-local-storage";
import PropTypes from "prop-types";

const LanguageContext = React.createContext();
LanguageContext.displayName = "LanguageContext"; // react dev tools doesn't display the name of the context

function LanguageProvider({ children }) {
  const [direction, setDirection] = useLocalStorage("direction", "rtl");
  const [language, setLocalStorageLanguage] = useLocalStorage("language", "ar");

  React.useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("dir", direction);
    document.getElementsByTagName("html")[0].setAttribute("lang", language);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLanguage(language) {
    const langDirection = language === "en" ? "ltr" : "rtl";
    setDirection(langDirection);

    document.getElementsByTagName("html")[0].setAttribute("dir", langDirection);
    document.getElementsByTagName("html")[0].setAttribute("lang", language);

    setLocalStorageLanguage(language);
  }

  return (
    <LanguageContext.Provider value={[language, setLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

export { LanguageProvider, useLanguage };
