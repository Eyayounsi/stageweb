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

const ActionsCell = ({ row, onDelete, onUpdateCompteur }) => (
  <MDBox display="flex" gap={1}>
    <Button
      variant="contained"
      color="info"
      component={Link}
      to={`/consommations-carburant-flottant/${row.original.num_compteur_flottant}`}
    >
      Détails
    </Button>
    <Button
      variant="contained"
      color="error"
      onClick={() => onDelete(row.original.num_compteur_flottant)}
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
      num_compteur_flottant: PropTypes.number.isRequired,
      emplacement_flottant: PropTypes.string.isRequired,
      ordre_flottant: PropTypes.number.isRequired,
      portId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateCompteur: PropTypes.func.isRequired,
};

function TablesCarburantFlottant() {
  const [compteursFlottant, setCompteursFlottant] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erreur lors de la lecture des données utilisateur:", error);
      }
    }

    fetch("http://localhost:8082/user/api/consommation-carburant-flottante/tous")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données des compteurs récupérées:", data);
        setCompteursFlottant(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des compteurs de carburant flottant:", error)
      );
  }, []);

  const handleDelete = (id) => {
    swal({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      buttons: ["Annuler", "Supprimer"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:8082/user/api/consommation-carburant-flottante/supprimer/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              swal("Supprimé !", "Le compteur a été supprimé.", "success");
              setCompteursFlottant((prev) =>
                prev.filter((compteur) => compteur.num_compteur_flottant !== id)
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

  const handleUpdateCompteur = (compteur) => {
    navigate(`/update-compteur-carburant-flottant/${compteur.num_compteur_flottant}`);
  };

  const handleAjouterCompteur = () => {
    navigate("/ajouter-compteur-carburant-flottant");
  };

  const handleAjouterConsommation = () => {
    navigate("/ajouter-consommation-carburant-flottant");
  };

  const columns = [
    { Header: "Numéro Compteur", accessor: "num_compteur_flottant" },
    { Header: "Emplacement", accessor: "emplacement_flottant" },
    { Header: "Ordre", accessor: "ordre_flottant" },
    { Header: "Port ID", accessor: "portId" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <ActionsCell row={row} onDelete={handleDelete} onUpdateCompteur={handleUpdateCompteur} />
      ),
    },
  ];

  const rows = compteursFlottant.map((compteur) => ({
    num_compteur_flottant: compteur.num_compteur_flottant,
    emplacement_flottant: compteur.emplacement_flottant,
    ordre_flottant: compteur.ordre_flottant,
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
                  Compteurs de carburant flottant
                </MDTypography>
                {user && (
                  <MDTypography variant="body2" color="white">
                    Utilisateur : {user.nom} {user.prenom} | Port : {user.nom_port}
                  </MDTypography>
                )}
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

export default TablesCarburantFlottant;
