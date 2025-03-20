import React, { createContext, useState } from "react";
import PropTypes from "prop-types"; // Importez PropTypes

export const CompteurContext = createContext();

export const CompteurProvider = ({ children }) => {
  const [selectedCompteur, setSelectedCompteur] = useState(null);

  return (
    <CompteurContext.Provider value={{ selectedCompteur, setSelectedCompteur }}>
      {children}
    </CompteurContext.Provider>
  );
};

// Ajoutez la validation des props pour `children`
CompteurProvider.propTypes = {
  children: PropTypes.node.isRequired, // `children` doit être un nœud React et est requis
};
