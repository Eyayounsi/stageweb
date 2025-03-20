import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Card, Button, Icon } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import swal from "sweetalert";

// Composant ActionsCell avec validation des props
const ActionsCell = ({ row, onDelete, onUpdateCompteur }) => (
  <MDBox display="flex" gap={1}>
    <Button
      variant="contained"
      color="info"
      component={Link}
      to={`/consommations-carburant-terrestre/${row.original.num_compteur_terrestre}`}
    >
      Détails
    </Button>
    <Button
      variant="contained"
      color="error"
      onClick={() => onDelete(row.original.num_compteur_terrestre)}
    >
      <Icon>delete</Icon>
    </Button>
    <Button variant="contained" color="warning" onClick={() => onUpdateCompteur(row.original)}>
      <Icon>edit</Icon>
    </Button>
  </MDBox>
);

ActionsCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      num_compteur_terrestre: PropTypes.number.isRequired,
      emplacement_terrestre: PropTypes.string.isRequired,
      ordre_terrestre: PropTypes.number.isRequired,
      portId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateCompteur: PropTypes.func.isRequired,
};

function TablesCarburantTerrestre() {
  const [compteursCarburantTerrestre, setCompteursCarburantTerrestre] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erreur lors de la lecture des données utilisateur:", error);
      }
    }

    // Récupérer les compteurs de carburant terrestre depuis l'API
    fetch("http://localhost:8082/user/api/consommation-carburant-terrestre/tous")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données des compteurs récupérées:", data);
        setCompteursCarburantTerrestre(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des compteurs de carburant terrestre:", error)
      );
  }, []);

  // Fonction pour supprimer un compteur
  const handleDelete = (id) => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      buttons: ["Annuler", "Supprimer"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:8082/user/api/consommation-carburant-terrestre/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              swal("Supprimé !", "Le compteur a été supprimé.", "success");
              // Mettre à jour la liste des compteurs après suppression
              setCompteursCarburantTerrestre((prev) =>
                prev.filter((compteur) => compteur.num_compteur_terrestre !== id)
              );
            } else {
              swal("Erreur !", "La suppression a échoué.", "error");
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression :", error);
            swal("Erreur !", "La suppression a échoué.", "error");
          });
      }
    });
  };

  // Fonction pour rediriger vers le formulaire de modification
  const handleUpdateCompteur = (compteur) => {
    navigate(`/update-compteur-carburant-terrestre/${compteur.num_compteur_terrestre}`);
  };

  // Fonction pour rediriger vers le formulaire d'ajout de compteur
  const handleAjouterCompteur = () => {
    navigate("/ajouter-compteur-carburant-terrestre");
  };

  // Fonction pour rediriger vers le formulaire d'ajout de consommation
  const handleAjouterConsommation = () => {
    navigate("/ajouter-consommation-carburant-terrestre");
  };

  const columns = [
    { Header: "Numéro Compteur", accessor: "num_compteur_terrestre" },
    { Header: "Emplacement", accessor: "emplacement_terrestre" },
    { Header: "Ordre", accessor: "ordre_terrestre" },
    { Header: "Port ID", accessor: "portId" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <ActionsCell row={row} onDelete={handleDelete} onUpdateCompteur={handleUpdateCompteur} />
      ),
    },
  ];

  const rows = compteursCarburantTerrestre.map((compteur) => ({
    num_compteur_terrestre: compteur.num_compteur_terrestre,
    emplacement_terrestre: compteur.emplacement_terrestre,
    ordre_terrestre: compteur.ordre_terrestre,
    portId: compteur.portId,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Compteurs de carburant terrestre
                </MDTypography>
                {user && (
                  <MDTypography variant="body2" color="white">
                    Utilisateur : {user.nom} {user.prenom} | Port : {user.nom_port}
                  </MDTypography>
                )}
                {/* Boutons pour ajouter un compteur ou une consommation */}
                <Button
                  variant="contained"
                  color="white"
                  onClick={handleAjouterCompteur}
                  sx={{ mt: 2, mr: 2 }}
                >
                  Ajouter Compteur
                </Button>
                <Button
                  variant="contained"
                  color="white"
                  onClick={handleAjouterConsommation}
                  sx={{ mt: 2 }}
                >
                  Ajouter Consommation
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default TablesCarburantTerrestre;
