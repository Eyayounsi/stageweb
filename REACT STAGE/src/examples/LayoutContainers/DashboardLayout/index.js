import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React context
import { useMaterialUIController, setLayout } from "context";

function DashboardLayout({ children, hasSidenav = true }) {
  // Ajoutez la prop hasSidenav (true par défaut)
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        // Appliquez la marge gauche uniquement si hasSidenav est true
        [breakpoints.up("xl")]: {
          marginLeft: hasSidenav ? (miniSidenav ? pxToRem(120) : pxToRem(274)) : 0,
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidenav: PropTypes.bool, // Ajoutez la prop hasSidenav
};

export default DashboardLayout;
