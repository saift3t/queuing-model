import React, { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

const QueueInputForm = ({ onSimulate }) => {
  const [model, setModel] = useState({
    arrival: "M",
    arrivalMean: 10,
    arrivalK: 5,
    arrivalValue: 1, // for deterministic
    service: "Em",
    serviceMean: 5,
    serviceK: 20,
    serviceValue: 1, // for deterministic
    servers: 2,
    queueDiscipline: "FIFO",
    capacity: "∞",
    population: "∞",
    customerCount: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prev) => ({
      ...prev,
      [name]: [
        "servers",
        "customerCount",
        "arrivalMean",
        "arrivalK",
        "serviceMean",
        "serviceK",
        "arrivalValue",
        "serviceValue",
      ].includes(name)
        ? parseFloat(value)
        : value === "" || value.toLowerCase() === "infinity"
        ? "∞"
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(model);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Queuing System Parameters
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* ARRIVAL SECTION */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Arrival Distribution
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Arrival Pattern"
              name="arrival"
              value={model.arrival}
              onChange={handleChange}
            >
              <MenuItem value="M">Poisson (M)</MenuItem>
              <MenuItem value="D">Deterministic (D)</MenuItem>
              <MenuItem value="Em">Erlang (Em)</MenuItem>
              <MenuItem value="G">General (G)</MenuItem>
            </TextField>
          </Grid>

          {model.arrival === "D" && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="arrivalValue"
                label="Fixed Arrival Time"
                value={model.arrivalValue}
                onChange={handleChange}
              />
            </Grid>
          )}

          {(model.arrival === "M" || model.arrival === "Em") && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="arrivalMean"
                label="Arrival Mean"
                value={model.arrivalMean}
                onChange={handleChange}
              />
            </Grid>
          )}
          {model.arrival === "Em" && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="arrivalK"
                label="Erlang k (Arrival Stages)"
                value={model.arrivalK}
                onChange={handleChange}
              />
            </Grid>
          )}
        </Grid>

        {/* SERVICE SECTION */}
        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          Service Distribution
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Service Pattern"
              name="service"
              value={model.service}
              onChange={handleChange}
            >
              <MenuItem value="M">Exponential (M)</MenuItem>
              <MenuItem value="D">Deterministic (D)</MenuItem>
              <MenuItem value="Em">Erlang (Em)</MenuItem>
              <MenuItem value="G">General (G)</MenuItem>
            </TextField>
          </Grid>

          {model.service === "D" && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="serviceValue"
                label="Fixed Service Time"
                value={model.serviceValue}
                onChange={handleChange}
              />
            </Grid>
          )}

          {(model.service === "M" || model.service === "Em") && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="serviceMean"
                label="Service Mean"
                value={model.serviceMean}
                onChange={handleChange}
              />
            </Grid>
          )}

          {model.service === "Em" && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                name="serviceK"
                label="Erlang k (Service Stages)"
                value={model.serviceK}
                onChange={handleChange}
              />
            </Grid>
          )}
        </Grid>

        {/* SYSTEM SETTINGS */}
        <Typography variant="subtitle1" sx={{ mt: 4 }}>
          System Configuration
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              name="servers"
              label="Number of Servers"
              value={model.servers}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              disabled={true}
              label="Queue Discipline"
              name="queueDiscipline"
              sx={{ width: "10rem" }}
              value={model.queueDiscipline}
              onChange={handleChange}
            >
              <MenuItem value="FIFO">FIFO</MenuItem>
              <MenuItem value="LIFO">LIFO</MenuItem>
              <MenuItem value="SIRO">SIRO</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              name="capacity"
              label="System Capacity"
              value={model.capacity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              name="population"
              label="Population Size"
              value={model.population}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              type="number"
              name="customerCount"
              label="Customers to Simulate"
              value={model.customerCount}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Simulate
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default QueueInputForm;
