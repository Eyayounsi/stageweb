import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "layouts/authentication/components/Footer/index";
import swal from "sweetalert";

function Overview() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    mail: "",
    role: "",
    portId: 0,
  });
  const [selectedPortName, setSelectedPortName] = useState("");

  const ports = [
    { id: 1, nom: "Tunis Goulette" },
    { id: 2, nom: "Bizerte" },
    { id: 3, nom: "Sousse" },
    { id: 4, nom: "Sfax" },
    { id: 5, nom: "Gabes" },
    { id: 6, nom: "Rades" },
    { id: 7, nom: "Zarzis" },
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser({
        nom: userData.nom || "",
        prenom: userData.prenom || "",
        mail: userData.mail || "",
        role: userData.role || "",
        portId: userData.port_id || 0,
      });
      const selectedPort = ports.find((port) => port.id === userData.port_id);
      if (selectedPort) {
        setSelectedPortName(selectedPort.nom);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "portId") {
      const selectedPort = ports.find((port) => port.id === parseInt(value, 10));
      if (selectedPort) {
        setSelectedPortName(selectedPort.nom);
      }
      setUser((prev) => ({
        ...prev,
        portId: parseInt(value, 10),
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      const updatedUser = {
        nom: user.nom,
        prenom: user.prenom,
        mail: user.mail,
        role: user.role,
        port_id: user.portId,
        nom_port: selectedPortName,
        mot_de_passe: user.mot_de_passe || "",
      };

      const response = await fetch(`http://localhost:8082/user/auth/updateUtilisateur/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        swal("Succès !", "Profil mis à jour avec succès.", "success").then(() => {
          navigate("/dashboard"); // Redirect to /dashboard after successful update
        });
      } else {
        swal("Erreur !", "La mise à jour a échoué.", "error");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      swal("Erreur !", "La mise à jour a échoué.", "error");
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = await swal({
      title: "Êtes-vous sûr ?",
      text: "Une fois supprimé, vous ne pourrez pas récupérer ce profil !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:8082/user/auth/deleteUtilisateur/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          swal("Succès !", "Profil supprimé avec succès.", "success").then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            navigate("/authentication/sign-in"); // Redirect to /sign-in after successful delete
          });
        } else {
          swal("Erreur !", "La suppression a échoué.", "error");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        swal("Erreur !", "La suppression a échoué.", "error");
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
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
                  Modifier le profil
                </MDTypography>
              </MDBox>
              <MDBox pt={3} px={3}>
                <form onSubmit={handleUpdateProfile}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nom"
                        name="nom"
                        value={user.nom}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Prénom"
                        name="prenom"
                        value={user.prenom}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="mail"
                        value={user.mail}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="role-label">Rôle</InputLabel>
                        <Select
                          labelId="role-label"
                          name="role"
                          value={user.role}
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="USER">User</MenuItem>
                          <MenuItem value="ADMIN">Admin</MenuItem>
                          <MenuItem value="CHEF_DE_SERVICE">Chef de Service</MenuItem>
                          <MenuItem value="GESTIONNAIRE">Gestionnaire</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="port-id-label">ID du Port</InputLabel>
                        <Select
                          labelId="port-id-label"
                          name="portId"
                          value={user.portId}
                          onChange={handleChange}
                          required
                        >
                          {ports.map((port) => (
                            <MenuItem key={port.id} value={port.id}>
                              {port.id}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="port-name-label">Nom du Port</InputLabel>
                        <Select
                          labelId="port-name-label"
                          name="portName"
                          value={selectedPortName}
                          onChange={handleChange}
                          required
                        >
                          {ports.map((port) => (
                            <MenuItem key={port.id} value={port.nom}>
                              {port.nom}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="success">
                        Mettre à jour
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteProfile}
                        style={{ marginLeft: "10px" }}
                      >
                        Supprimer le profil
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
