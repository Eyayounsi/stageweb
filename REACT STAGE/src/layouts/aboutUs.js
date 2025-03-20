import React from "react";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AboutUs() {
  return (
    <div>
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          {/* Section: Qui sommes-nous ? */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h3" gutterBottom>
                  Qui sommes-nous ?
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  L’Office de la Marine Marchande et des Ports (OMMP) est un établissement public
                  tunisien créé en vertu de la loi N° 65-2 du 12 Février 1965. Nous gérons et
                  exploitons les ports maritimes de commerce tunisiens, en veillant à la
                  productivité, à la sécurité et à la diversité du trafic maritime.
                </MDTypography>
                <MDBox mt={2}>
                  <MDButton variant="gradient" color="info">
                    En savoir plus
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Section: Notre mission */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h3" gutterBottom>
                  Notre mission
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  Notre mission principale est de traiter, dans les meilleures conditions de délai,
                  de coût et de sécurité, l’ensemble des navires et des marchandises transitant par
                  les ports tunisiens. Nous assurons également les services de la marine marchande,
                  y compris l&apos;administration des navires, la gestion des gens de mer et la
                  sécurité de la navigation maritime.
                </MDTypography>
                <MDBox mt={2}>
                  <MDButton variant="gradient" color="info">
                    Découvrir notre mission
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Section: Notre application de suivi de consommation */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h3" gutterBottom>
                  Notre application de suivi de consommation
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  Au sein de l&apos;OMMP, nous utilisons une application de suivi de consommation
                  pour préserver et économiser l&apos;énergie (eau, électricité, carburant). Cette
                  application nous permet de :
                </MDTypography>
                <MDBox component="ul" p={2} pl={4}>
                  <MDTypography variant="body1" color="text" component="li">
                    Surveiller et optimiser la consommation d&apos;énergie dans nos installations.
                  </MDTypography>
                  <MDTypography variant="body1" color="text" component="li">
                    Réduire notre empreinte carbone et protéger l&apos;environnement.
                  </MDTypography>
                  <MDTypography variant="body1" color="text" component="li">
                    Promouvoir une culture de préservation et de durabilité.
                  </MDTypography>
                  <MDTypography variant="body1" color="text" component="li">
                    Éviter le gaspillage et la destruction des ressources naturelles.
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body1" color="text">
                  Grâce à cette application, nous contribuons activement à la protection de
                  l&apos;environnement tout en améliorant l&apos;efficacité énergétique de nos
                  opérations.
                </MDTypography>
                <MDBox mt={2}>
                  <MDButton variant="gradient" color="info">
                    Découvrir l&apos;application
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Section: Nos ports */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h3" gutterBottom>
                  Nos ports
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  Nous gérons plusieurs ports stratégiques en Tunisie, notamment :
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de La Goulette :</strong> Une destination privilégiée pour le
                    trafic maritime.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Bizerte Menzel Bourguiba :</strong> Un port d&apos;avenir.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Rades :</strong> Le premier terminal à conteneurs en Tunisie.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Sousse :</strong> Un maillon essentiel de la chaîne portuaire.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Sfax :</strong> Au service du deuxième pôle économique du pays.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Gabès :</strong> Au service de l&apos;industrie tunisienne.
                  </MDTypography>
                  <MDTypography variant="body1" color="text">
                    <strong>Port de Zarzis :</strong> Un port limitrophe stratégique.
                  </MDTypography>
                </MDBox>
                <MDBox mt={2}>
                  <MDButton variant="gradient" color="info">
                    Explorer nos ports
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Section: Informations de contact */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h3" gutterBottom>
                  Informations de contact
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  <strong>Nom de l&apos;établissement :</strong> Office de la Marine Marchande et
                  des Ports (OMMP)
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  <strong>Adresse :</strong> Bâtiment administratif, 2060 La Goulette, Tunisie
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  <strong>Téléphone :</strong> +216 70 240 000
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  <strong>Fax :</strong> +216 71 735 812
                </MDTypography>
                <MDTypography variant="body1" color="text">
                  <strong>Email :</strong> ommp@ommp.nat.tn
                </MDTypography>
                <MDBox mt={2}>
                  <MDButton variant="gradient" color="info">
                    Nous contacter
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default AboutUs;
