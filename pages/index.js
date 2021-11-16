import React from "react";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../src/firebase/client-app";
import GroupBuildTable from "../src/components/GroupBuildTable";
import {
  STATUSES_SUCCESS,
  STATUSES_FAILURE,
  STATUSES_INTERNAL_ERROR,
  STATUSES_QUEUED,
  STATUSES_TIMEOUT,
  STATUSES_WORKING,
} from "../src/cloudbuildStatus";

export default function Home() {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "builds"), orderBy("startTime", "desc"), limit(250)),
    {}
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const builds = snapshot.docs.map((doc) => doc.data());
  const buildsByGroupId = builds.reduce((acc, build) => {
    const currentBuild = acc[build.groupId] || {};

    const status = [
      STATUSES_FAILURE,
      STATUSES_INTERNAL_ERROR,
      STATUSES_TIMEOUT,
    ].includes(currentBuild.status)
      ? currentBuild.status
      : [STATUSES_QUEUED, STATUSES_WORKING].includes(currentBuild.status)
      ? currentBuild.status
      : build.status;

    return {
      ...acc,
      [build.groupId]: {
        startTime:
          currentBuild.startTime < build.startTime
            ? currentBuild.startTime
            : build.startTime,
        finishTime:
          currentBuild.finishTime > build.finishTime
            ? currentBuild.finishTime
            : build.finishTime,
        tags: [],
        status,
        builds: [build].concat(currentBuild.builds || []),
      },
    };
  }, {});

  return (
    <>
      <GroupBuildTable builds={buildsByGroupId} />
    </>
  );
}
