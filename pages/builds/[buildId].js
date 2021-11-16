import React from "react";
import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import NoSsr from "@mui/material/NoSsr";

import { db } from "../../src/firebase/client-app";
import Loader from "../../src/components/Loader";
import Error from "../../src/components/Error";

export default function Build() {
  return (
    <NoSsr fallback={<Loader />}>
      <BuildPage />
    </NoSsr>
  );
}

function BuildPage() {
  const { query } = useRouter();
  const { buildId } = query;

  const [snapshot, loading, error] = useDocument(
    doc(db, "builds", buildId),
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
      <pre>{JSON.stringify(snapshot.data(), null, 2)}</pre>
    </>
  );
}
