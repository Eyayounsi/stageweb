/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables/Eau";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ConsommationsEau from "layouts/tables/Eau/ConsommationsEau";
import UpdateCompteurForm from "layouts/tables/Eau/UpdateCompteurForm";
import UpdateConsommationEauForm from "layouts/tables/Eau/UpdateConsommationEauForm";

import { CompteurProvider } from "./context/CompteurContext";
import TablesElectricite from "layouts/tables/Electricite/TablesElectricite";
import ConsommationsElectricite from "layouts/tables/Electricite/ConsommationsElectricite";
import UpdateCompteurElectriciteForm from "layouts/tables/Electricite/UpdateCompteurElectriciteForm";
import UpdateConsommationElectriciteForm from "layouts/tables/Electricite/UpdateConsommationElectriciteForm";
import AjouterElectriciteForm from "layouts/tables/Electricite/AjouterElectriciteForm"; // Importez CompteurProvider
/////terre
import TablesCarburantTerrestre from "layouts/tables/CarburantTerrestre/TablesCarburantTerrestre";
import ConsommationsCarburantTerrestre from "layouts/tables/CarburantTerrestre/ConsommationsCarburantTerrestre";
import UpdateCompteurCarburantTerrestreForm from "layouts/tables/CarburantTerrestre/UpdateCompteurCarburantTerrestreForm";
import UpdateConsommationCarburantTerrestreForm from "layouts/tables/CarburantTerrestre/UpdateConsommationCarburantTerrestreForm";
import AjouterCarburantTerrestreForm from "layouts/tables/CarburantTerrestre/AjouterCarburantTerrestreForm";
// Importez le nouveau composant
import Logout from "layouts/tables/Logout"; // Importez le composant Logout
import AjouterCompteurForm from "layouts/tables/Eau/AjouterCompteurForm";
import AjouterConsommationForm from "layouts/tables/Eau/AjouterConsommationForm";

import AjouterCompteurElectriciteForm from "layouts/tables/Electricite/AjouterCompteurElectriciteForm";
import AjouterConsommationElectriciteForm from "layouts/tables/Electricite/AjouterConsommationElectriciteForm";
import AjouterCompteurCarburantTerrestreForm from "layouts/tables/CarburantTerrestre/AjouterCompteurCarburantTerrestreForm";
import AjouterConsommationCarburantTerrestreForm from "layouts/tables/CarburantTerrestre/AjouterConsommationCarburantTerrestreForm";

// Importez les nouveaux composants pour le carburant flottant
import TablesCarburantFlottant from "layouts/tables/CarburantFlottant/TablesCarburantFlottant";
import ConsommationsCarburantFlottant from "layouts/tables/CarburantFlottant/ConsommationsCarburantFlottant";
import UpdateCompteurCarburantFlottantForm from "layouts/tables/CarburantFlottant/UpdateCompteurCarburantFlottantForm";
import UpdateConsommationCarburantFlottantForm from "layouts/tables/CarburantFlottant/UpdateConsommationCarburantFlottantForm";
import AjouterCompteurCarburantFlottantForm from "layouts/tables/CarburantFlottant/AjouterCompteurCarburantFlottantForm";
import AjouterConsommationCarburantFlottantForm from "layouts/tables/CarburantFlottant/AjouterConsommationCarburantFlottantForm";
// @mui icons
import ContactUs from "layouts/contact"; // Assurez-vous que le chemin est correct
import AboutUs from "layouts/aboutUs"; // Assurez-vous que le chemin est correct

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Eau",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Électricité",
    key: "tables-electricite",
    icon: <Icon fontSize="small">bolt</Icon>,
    route: "/tables-electricite",
    component: <TablesElectricite />,
  },
  {
    type: "collapse",
    name: "Carburant Terrestre",
    key: "tables-carburant-terrestre",
    icon: <Icon fontSize="small">local_gas_station</Icon>,
    route: "/tables-carburant-terrestre",
    component: <TablesCarburantTerrestre />,
  },
  {
    type: "collapse",
    name: "Carburant Flottant",
    key: "tables-carburant-flottant",
    icon: <Icon fontSize="small">directions_boat</Icon>, // Icône pour le carburant flottant
    route: "/tables-carburant-flottant",
    component: <TablesCarburantFlottant />,
  },

  // Route pour les consommations de carburant flottant
  {
    type: "route",
    name: "Consommations Carburant Flottant",
    key: "consommations-carburant-flottant",
    icon: <Icon fontSize="small">water</Icon>, // Icône pour les consommations
    route: "/consommations-carburant-flottant/:id",
    component: <ConsommationsCarburantFlottant />,
  },

  // Route pour modifier un compteur de carburant flottant
  {
    type: "route",
    name: "Modifier Compteur Carburant Flottant",
    key: "update-compteur-carburant-flottant",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-compteur-carburant-flottant/:id",
    component: <UpdateCompteurCarburantFlottantForm />,
  },

  // Route pour modifier une consommation de carburant flottant
  {
    type: "route",
    name: "Modifier Consommation Carburant Flottant",
    key: "update-consommation-carburant-flottant",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-consommation-carburant-flottant/:id",
    component: <UpdateConsommationCarburantFlottantForm />,
  },

  // Route pour ajouter un compteur de carburant flottant
  {
    type: "route",
    name: "Ajouter Compteur Carburant Flottant",
    key: "ajouter-compteur-carburant-flottant",
    route: "/ajouter-compteur-carburant-flottant",
    component: <AjouterCompteurCarburantFlottantForm />,
  },

  // Route pour ajouter une consommation de carburant flottant
  {
    type: "route",
    name: "Ajouter Consommation Carburant Flottant",
    key: "ajouter-consommation-carburant-flottant",
    route: "/ajouter-consommation-carburant-flottant",
    component: <AjouterConsommationCarburantFlottantForm />,
  },
  {
    type: "collapse",
    name: "",
    key: "",
    route: "",
    component: <Billing />,
  },

  {
    type: "collapse",
    name: "Déconnexion",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>, // Icône de déconnexion
    route: "/logout", // Route pour la déconnexion
    component: <Logout />, // Composant de déconnexion
  },
  /* {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },*/
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "route", // Utilisez "route" au lieu de "collapse" si vous ne voulez pas l'afficher dans la sidebar
    name: "Consommations Eau",
    key: "consommations-eau",
    icon: <Icon fontSize="small">water_drop</Icon>, // Vous pouvez choisir une icône appropriée
    route: "/consommations-eau/:id", // Utilisez un paramètre dynamique pour l'ID du compteur
    component: <ConsommationsEau />,
  },
  {
    type: "route", // Nouvelle route pour le formulaire de modification
    name: "Modifier Compteur",
    key: "update-compteur",
    icon: <Icon fontSize="small">edit</Icon>, // Icône pour la modification
    route: "/update-compteur/:id", // Utilisez un paramètre dynamique pour l'ID du compteur
    component: <UpdateCompteurForm />,
  },
  {
    type: "route", // Utilisez "route" pour ne pas l'afficher dans la sidebar
    name: "Modifier Consommation Eau",
    key: "update-consommation-eau",
    icon: <Icon fontSize="small">edit</Icon>, // Icône pour la modification
    route: "/update-consommation-eau/:id", // Utilisez un paramètre dynamique pour l'ID de la consommation
    component: <UpdateConsommationEauForm />,
  },

  // Routes pour l'électricité
  {
    type: "route",
    name: "Consommations Électricité",
    key: "consommations-electricite",
    icon: <Icon fontSize="small">bolt</Icon>,
    route: "/consommations-electricite/:id",
    component: <ConsommationsElectricite />,
  },
  {
    type: "route",
    name: "Modifier Compteur Électricité",
    key: "update-compteur-electricite",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-compteur-electricite/:id",
    component: <UpdateCompteurElectriciteForm />,
  },
  {
    type: "route",
    name: "Modifier Consommation Électricité",
    key: "update-consommation-electricite",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-consommation-electricite/:id",
    component: <UpdateConsommationElectriciteForm />,
  },
  {
    type: "route",
    name: "Ajouter Électricité",
    key: "ajouter-electricite",
    route: "/ajouter-electricite",
    component: <AjouterElectriciteForm />,
  },
  ///////////////////////////////////////
  ///terre

  {
    type: "route",
    name: "Consommations Carburant Terrestre",
    key: "consommations-carburant-terrestre",
    icon: <Icon fontSize="small">local_gas_station</Icon>,
    route: "/consommations-carburant-terrestre/:id",
    component: <ConsommationsCarburantTerrestre />,
  },
  {
    type: "route",
    name: "Modifier Compteur Carburant Terrestre",
    key: "update-compteur-carburant-terrestre",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-compteur-carburant-terrestre/:id",
    component: <UpdateCompteurCarburantTerrestreForm />,
  },
  {
    type: "route",
    name: "Modifier Consommation Carburant Terrestre",
    key: "update-consommation-carburant-terrestre",
    icon: <Icon fontSize="small">edit</Icon>,
    route: "/update-consommation-carburant-terrestre/:id",
    component: <UpdateConsommationCarburantTerrestreForm />,
  },
  {
    type: "route",
    name: "Ajouter Carburant Terrestre",
    key: "ajouter-carburant-terrestre",
    route: "/ajouter-carburant-terrestre",
    component: <AjouterCarburantTerrestreForm />,
  },
  {
    type: "route",
    name: "Ajouter Compteur",
    key: "ajouter-compteur",
    route: "/ajouter-compteur",
    component: <AjouterCompteurForm />,
  },
  {
    type: "route",
    name: "Ajouter Consommation",
    key: "ajouter-consommation",
    route: "/ajouter-consommation",
    component: <AjouterConsommationForm />,
  },
  {
    type: "route",
    name: "Ajouter Compteur Électricité",
    key: "ajouter-compteur-electricite",
    route: "/ajouter-compteur-electricite",
    component: <AjouterCompteurElectriciteForm />,
  },
  {
    type: "route",
    name: "Ajouter Consommation Électricité",
    key: "ajouter-consommation-electricite",
    route: "/ajouter-consommation-electricite",
    component: <AjouterConsommationElectriciteForm />,
  },
  {
    type: "route",
    name: "Ajouter Compteur Carburant Terrestre",
    key: "ajouter-compteur-carburant-terrestre",
    route: "/ajouter-compteur-carburant-terrestre",
    component: <AjouterCompteurCarburantTerrestreForm />,
  },
  {
    type: "route",
    name: "Ajouter Consommation Carburant Terrestre",
    key: "ajouter-consommation-carburant-terrestre",
    route: "/ajouter-consommation-carburant-terrestre",
    component: <AjouterConsommationCarburantTerrestreForm />,
  },
  {
    type: "route", // Utilisez "collapse" pour l'afficher dans la sidebar
    name: "About Us", // Nom affiché dans la sidebar
    key: "about-us", // Clé unique pour cette route
    icon: <Icon fontSize="small">About us</Icon>, // Icône pour About Us
    route: "/about-us", // Route pour accéder à la page
    component: <AboutUs />, // Composant à afficher
  },
  {
    type: "route", // Utilisez "collapse" pour l'afficher dans la sidebar
    name: "Contact Us", // Nom affiché dans la sidebar
    key: "contact-us", // Clé unique pour cette route
    icon: <Icon fontSize="small">Contact Us</Icon>, // Icône pour Contact Us
    route: "/contact-us", // Route pour accéder à la page
    component: <ContactUs />, // Composant à afficher
  },
];

export default routes;
