import * as React from "react";
import formatRelative from "date-fns/formatRelative";

export default function BuildTableItemStarted({ startTime }) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (!startTime) {
      return null;
    }

    return setValue(formatRelative(new Date(startTime), new Date()));
  }, [startTime]);

  return value;
}
