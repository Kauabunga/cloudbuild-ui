import * as React from "react";
import PropTypes from "prop-types";

import formatDistanceStrict from "date-fns/formatDistanceStrict";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default function Duration({ startTime, finishTime }) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (!startTime) {
      return null;
    }

    if (finishTime) {
      return setValue(
        formatDistanceStrict(new Date(startTime), new Date(finishTime))
      );
    }

    setValue(formatDistanceToNowStrict(new Date(startTime)));

    const intervalHandler = setInterval(() => {
      setValue(formatDistanceToNowStrict(new Date(startTime)));
    }, 1000);

    return () => clearInterval(intervalHandler);
  }, [startTime, finishTime]);

  return value;
}
