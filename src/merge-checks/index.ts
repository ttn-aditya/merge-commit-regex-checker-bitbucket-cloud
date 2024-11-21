import api, { route, storage } from "@forge/api";
import { titleSubstringKey } from "../consts"; // Assuming this is defined in consts.
import { CheckEvent, ForgeContext } from "./types";

export const checkPullRequest = async (
  event: CheckEvent,
  context: ForgeContext,
) => {
  const workspaceUuid = event.workspace.uuid;
  const repoUuid = event.repository.uuid;
  const prId = event.pullrequest.id;
  const mergeCommitMessage = event.mergeProperties.commitMessage;
  const mergeStrategy = event.mergeProperties.mergeStrategy;

  const prContext = `${workspaceUuid}/${repoUuid}/${prId}`;
  console.log(`Received pull request event: ${prContext}`);

  // Fetch the pull request details to get the destination branch
  const prDetailsUrl = route`/2.0/repositories/${workspaceUuid}/${repoUuid}/pullrequests/${prId}?fields=destination.branch.name`;
  const prDetailsResponse = await api.asApp().requestBitbucket(prDetailsUrl);
  const prDetails = await prDetailsResponse.json();
  const destinationBranch = prDetails.destination.branch.name;

  // Check if the PR destination branch is 'main', 'master', or 'boost_1.80.0'
  const allowedBranches = ["main", "master", "boost_1.80.0"];
  if (!allowedBranches.includes(destinationBranch)) {
    console.log(`Skipping check: Destination branch '${destinationBranch}' is not in [main, master, boost_1.80.0].`);
    return {
      success: true,
      message: `Skipped: No checks required for branch '${destinationBranch}'.`
    };
  }

  // If the destination branch is valid, check if merge strategy is 'squash'
  if (mergeStrategy !== "squash") {
    console.log(`Skipping check: Merge strategy is '${mergeStrategy}', not 'squash'.`);
    return {
      success: false,
      message: "Skipped: Merge strategy is not 'squash'."
    };
  }

  // Fetch the regex pattern for commit message from Forge storage.
  const commitMessageRegexString = await storage.get(titleSubstringKey);
  
  // Ensure the regex pattern for commit message is configured.
  if (!commitMessageRegexString) {
    console.log("Regex for commit message is not configured. Failing merge check.");
    return {
      success: false,
      message: "Regex for commit message is not configured",
    };
  }

  // Compile the regex pattern from the stored string value with the "i" flag for case insensitivity.
  const commitMessageRegex = new RegExp(commitMessageRegexString, "i");

  // Check if the merge commit message matches the regex pattern.
  const commitMessageCheckSuccess = commitMessageRegex.test(mergeCommitMessage);
  const commitMessageCheckMessage = commitMessageCheckSuccess
    ? `Merge commit message matches the regex: "${commitMessageRegexString}"`
    : `Merge commit message does not match the regex: "${commitMessageRegexString}"`;

  // Return the result of the commit message check.
  return {
    success: commitMessageCheckSuccess,
    message: commitMessageCheckMessage,
  };
};
