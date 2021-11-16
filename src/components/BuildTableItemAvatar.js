import * as React from "react";
import PropTypes from "prop-types";
import { green, red, yellow } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

import {
  STATUSES_SUCCESS,
  STATUSES_FAILURE,
  STATUSES_INTERNAL_ERROR,
  STATUSES_QUEUED,
  STATUSES_TIMEOUT,
  STATUSES_WORKING,
} from "../cloudbuildStatus";

function BuildTableItemAvatar(props) {
  const { status } = props;

  const sx = { width: 24, height: 24 };
  const sxIcon = { fontSize: 24 };

  switch (String(status).toUpperCase()) {
    case STATUSES_SUCCESS:
      return (
        <Avatar sx={{ ...sx, bgcolor: green[500] }}>
          <CheckIcon sx={sxIcon} />
        </Avatar>
      );

    case STATUSES_QUEUED:
      return (
        <Avatar sx={{ ...sx }}>
          <HourglassFullIcon sx={sxIcon} />
        </Avatar>
      );

    case STATUSES_WORKING:
      return (
        <Avatar sx={{ ...sx }}>
          <DirectionsRunIcon sx={sxIcon} />
        </Avatar>
      );

    case STATUSES_FAILURE:
      return (
        <Avatar sx={{ ...sx, bgcolor: red[500] }}>
          <ErrorIcon sx={sxIcon} />
        </Avatar>
      );

    case STATUSES_INTERNAL_ERROR:
      return (
        <Avatar sx={{ ...sx, bgcolor: yellow[500] }}>
          <WarningIcon sx={sxIcon} />
        </Avatar>
      );

    case STATUSES_TIMEOUT:
      return (
        <Avatar sx={{ ...sx, bgcolor: red[500] }}>
          <AccessTimeIcon sx={sxIcon} />
        </Avatar>
      );

    default:
      return <Avatar sx={{ ...sx }} />;
  }
}

BuildTableItemAvatar.propTypes = {
  status: PropTypes.string.isRequired,
};

export default BuildTableItemAvatar;
