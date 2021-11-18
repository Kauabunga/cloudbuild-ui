import * as React from "react";
import formatRelative from "date-fns/formatRelative";

export default function BuildTableItemStarted({ startTime }) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (!startTime) {
      return null;
    }

    setValue(formatRelative(new Date(startTime), new Date()));

    // Update every minute
    const intervalHandler = setInterval(() => {
      setValue(formatRelative(new Date(startTime), new Date()));
    }, 60 * 1000);

    return () => clearInterval(intervalHandler);
  }, [startTime]);

  return value;
}
