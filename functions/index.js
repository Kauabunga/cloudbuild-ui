const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const store = admin.firestore();

exports.helloWorld = functions
  .region("australia-southeast1")
  .https.onRequest((request, response) => {
    // Get tag or branch + commit sha
    const build = request.body;
    functions.logger.info("Processing ci event", build);

    const tag = build?.substitutions?.TAG_NAME;
    const branch = build?.substitutions?.BRANCH_NAME;
    const sha = build?.substitutions?.COMMIT_SHA;
    const groupId = tag ? tag : [branch, sha].join("_");

    return store
      .collection("builds")
      .doc(build.id)
      .set({
        groupId,

        tag: tag || null,
        branch: branch || null,
        sha: sha || null,

        ...build,
      })
      .then(() => response.send(JSON.stringify({ complete: true })))
      .catch((err) => response.send(JSON.stringify({ error: err.message })));
  });
