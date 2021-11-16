import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import NoSsr from "@mui/material/NoSsr";

import { db } from "../../src/firebase/client-app";
import BuildTable from "../../src/components/AllBuildTable";

export default function AllBuilds() {
  return (
    <NoSsr>
      <AllBuildsPage />
    </NoSsr>
  );
}

function AllBuildsPage() {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "builds"), orderBy("startTime", "desc"), limit(100)),
    {}
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      <BuildTable builds={snapshot.docs.map((build) => build.data())} />
    </>
  );
}
