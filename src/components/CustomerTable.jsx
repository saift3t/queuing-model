import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";

const CustomerTable = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography fontWeight={"bold"} variant="h5" sx={{ p: 2 }}>
        Simulation Results
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "ID",
              "Arrival Time",
              "Start Time",
              "Service Time",
              "Finish",
              "Waiting Time",
              "Time In System",
              "Server",
              "Status",
            ].map((label) => (
              <TableCell key={label} align="center">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((c) => (
            <TableRow
              key={c.id}
              sx={{ backgroundColor: c.rejected ? "#fdecea" : "inherit" }}
            >
              <TableCell align="center">{c.id}</TableCell>
              <TableCell align="center">{c.arrivalTime?.toFixed(2)}</TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.startTime.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.serviceTime.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.finishTime.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.waitingTime.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.timeInSystem.toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {c.rejected ? "-" : c.serverId}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={c.rejected ? "Rejected" : "Served"}
                  color={c.rejected ? "error" : "success"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
