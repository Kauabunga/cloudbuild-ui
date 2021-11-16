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

import AllBuildTable from "./AllBuildTable";
import BuildTableItemAvatar from "./BuildTableItemAvatar";
import BuildTableItemDuration from "./BuildTableItemDuration";

function GroupBuildTableItem(props) {
  const { groupId, group } = props;
  const [open, setOpen] = React.useState(false);
  // const [env, type, ...label] = build.tags;

  const env = "";
  const type = "";
  const label = [];
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <BuildTableItemAvatar status={group.status} />
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
          {groupId}
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
            startTime={group.startTime}
            finishTime={group.finishTime}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Builds
              </Typography>
              <AllBuildTable
                builds={group.builds.sort((a, b) =>
                  a.startTime > b.startTime ? -1 : 1
                )}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

GroupBuildTableItem.propTypes = {
  group: PropTypes.shape({
    // history: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     customerId: PropTypes.string.isRequired,
    //     date: PropTypes.string.isRequired,
    //   })
    // ).isRequired,
  }).isRequired,
};

export default GroupBuildTableItem;
