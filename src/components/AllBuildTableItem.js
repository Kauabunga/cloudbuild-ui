import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import BuildTableItemAvatar from "./BuildTableItemAvatar";
import BuildTableItemDuration from "./BuildTableItemDuration";

function BuildTableItem(props) {
  const { build } = props;
  const [open, setOpen] = React.useState(false);

  const [env, type, ...label] = build.tags;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <BuildTableItemAvatar status={build.status} />
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {env}
        </TableCell>
        <TableCell component="th" scope="row">
          {type}
        </TableCell>
        <TableCell component="th" scope="row">
          {label.map((item) => (
            <Chip key={item} label={item} style={{ marginRight: 8 }} />
          ))}
        </TableCell>
        <TableCell component="th" scope="row">
          <BuildTableItemDuration
            startTime={build.startTime}
            finishTime={build.finishTime}
          />
        </TableCell>

        <TableCell align="center">
          <IconButton component="a" href={`${build.logUrl}&authuser=1`}>
            <OpenInNewIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <pre style={{ maxWidth: "100vw", overflowX: "scroll" }}>
                    {JSON.stringify(build, null, 2)}
                  </pre>

                  {(build.history || []).map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

BuildTableItem.propTypes = {
  build: PropTypes.shape({
    // history: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     customerId: PropTypes.string.isRequired,
    //     date: PropTypes.string.isRequired,
    //   })
    // ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BuildTableItem;
