import React, { useEffect } from "react";
import Router from "next/router";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import NoSsr from "@mui/material/NoSsr";

import { db, auth } from "../src/firebase/client-app";
import GroupBuildTable from "../src/components/GroupBuildTable";
import {
  STATUSES_SUCCESS,
  STATUSES_FAILURE,
  STATUSES_INTERNAL_ERROR,
  STATUSES_QUEUED,
  STATUSES_TIMEOUT,
  STATUSES_WORKING,
} from "../src/cloudbuildStatus";
import Loader from "../src/components/Loader";
import Error from "../src/components/Error";

export default function Home() {
  return (
    <>
      <NoSsr fallback={<Loader />}>
        <HomePage />
      </NoSsr>
    </>
  );
}

function HomePage() {
  const [user, loadingUser, errorUser] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loadingUser) {
      Router.push("/auth");
    }
  }, [user, loadingUser]);

  const [snapshot, loading, error] = useCollection(
    query(collection(db, "builds"), orderBy("startTime", "desc"), limit(500)),
    {}
  );

  if (loading || loadingUser) {
    return <Loader />;
  }

  if (error || errorUser) {
    return <Error error={error?.message || errorUser?.message} />;
  }

  const builds = snapshot.docs.map((doc) => doc.data());
  const buildsByGroupId = groupBuilds(builds);

  return <GroupBuildTable builds={buildsByGroupId} />;
}

function groupBuilds(builds) {
  return builds.reduce((acc, build) => {
    const projectGroupId = [build.projectId, build.groupId].join("-");
    const currentBuild = acc[projectGroupId] || {};

    if ([undefined, "", null, "_"].includes(build.groupId)) {
      return acc;
    }

    const isFailureStatus = [
      STATUSES_FAILURE,
      STATUSES_INTERNAL_ERROR,
      STATUSES_TIMEOUT,
    ].includes(currentBuild.status);
    const isProgressStatus = [STATUSES_QUEUED, STATUSES_WORKING].includes(
      currentBuild.status
    );

    const status = isFailureStatus
      ? currentBuild.status
      : isProgressStatus
      ? currentBuild.status
      : build.status;

    const startTime =
      currentBuild.startTime < build.startTime
        ? currentBuild.startTime
        : build.startTime;
    const finishTime =
      currentBuild.finishTime > build.finishTime
        ? currentBuild.finishTime
        : build.finishTime;

    return {
      ...acc,
      [projectGroupId]: {
        startTime,
        finishTime: isProgressStatus ? null : finishTime,
        tags: [],
        status,
        builds: [build].concat(currentBuild.builds || []),
      },
    };
  }, {});
}
