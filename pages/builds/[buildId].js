import React from "react";
import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { db } from "../../src/firebase/client-app";

export default function Home() {
  const { query } = useRouter();
  const { buildId } = query;

  const [snapshot, loading, error] = useDocument(
    doc(db, "builds", buildId),
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
      <pre>{JSON.stringify(snapshot.data(), null, 2)}</pre>
    </>
  );
}
