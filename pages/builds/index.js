import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import NoSsr from "@mui/material/NoSsr";

import { db } from "../../src/firebase/client-app";
import BuildTable from "../../src/components/AllBuildTable";
import Loader from "../../src/components/Loader";
import Error from "../../src/components/Error";

export default function AllBuilds() {
  return (
    <NoSsr fallback={<Loader />}>
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
    return <Loader />;
  }

  if (error) {
    return <Error error={error?.message} />;
  }

  return (
    <>
      <BuildTable builds={snapshot.docs.map((build) => build.data())} />
    </>
  );
}
