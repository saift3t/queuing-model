import React, { useState } from "react";
import { Container, Stack, Typography, Box } from "@mui/material";
import QueueInputForm from "./components/QueueInputForm";
import CustomerTable from "./components/CustomerTable";
import { simulateQueue } from "./utils/simulateQueue";

function App() {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);

  const handleSimulate = (config) => {
    const output = simulateQueue(config);
    setResults(output);

    const valid = output.filter((c) => !c.rejected);
    const avgArrival =
      valid.length > 1
        ? valid.slice(1).reduce((acc, c) => acc + c.interarrivalTime, 0) /
          (valid.length - 1)
        : 0;
    const avgService =
      valid.reduce((acc, c) => acc + c.serviceTime, 0) / valid.length;

    setStats({ avgArrival, avgService });
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} paddingY={5}>
      <Typography variant="h3" gutterBottom>
        Queuing Model Simulator
      </Typography>
      <QueueInputForm onSimulate={handleSimulate} />
      {stats && (
        <Box mt={4}>
          <Typography variant="h6">Simulation Averages</Typography>
          <Typography>
            Average Arrival Time: {stats.avgArrival.toFixed(2)}
          </Typography>
          <Typography>
            Average Service Time: {stats.avgService.toFixed(2)}
          </Typography>
        </Box>
      )}
      {results.length > 0 && <CustomerTable data={results} />}
    </Stack>
  );
}

export default App;
