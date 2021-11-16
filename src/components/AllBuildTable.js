import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AllBuildTableItem from "./AllBuildTableItem";

export default function BuildTable({ builds }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>Env</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell align="center">Logs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {builds.map((build) => (
            <AllBuildTableItem key={build.id} build={build} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
