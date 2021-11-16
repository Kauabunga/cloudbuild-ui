import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
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
  const cellCx = { padding: 0, paddingLeft: 2, paddingRight: 2 };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={cellCx}>
          <BuildTableItemAvatar status={build.status} />
        </TableCell>

        <TableCell sx={cellCx}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={cellCx}>{env}</TableCell>
        <TableCell sx={cellCx}>{type}</TableCell>
        <TableCell sx={cellCx}>
          {label
            .filter((item) => !String(item).startsWith("trigger-"))
            .map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                style={{ marginRight: 8 }}
              />
            ))}
        </TableCell>

        <TableCell sx={cellCx}>
          <BuildTableItemDuration
            startTime={build.startTime}
            finishTime={build.finishTime}
          />
        </TableCell>

        <TableCell sx={cellCx} align="center">
          <IconButton component="a" href={`${build.logUrl}&authuser=1`}>
            <OpenInNewIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <pre
                style={{
                  maxWidth: "100vw",
                  wordBreak: "space",
                  overflowX: "scroll",
                }}
              >
                {JSON.stringify(build, null, 2)}
              </pre>
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
