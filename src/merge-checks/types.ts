type BitbucketResource = {
  uuid: string;
};


type MergeProperties = {
  commitMessage: string;
  commitMessageTruncated: boolean;
  mergeStrategy: string;
  closeSourceBranch: boolean;
};

type PullRequestEvent = {
  id: number;
};

/**
 * Merge checks are invoked by triggers.
 * https://developer.atlassian.com/platform/forge/manifest-reference/modules/bitbucket-merge-check/#triggers
 */
type Trigger = {
  type: "pre-merge" | "on-merge";
};

export type CheckEvent = {
  workspace: BitbucketResource;
  repository: BitbucketResource;
  pullrequest: PullRequestEvent;
  trigger: Trigger;
  mergeProperties?: MergeProperties;
};

export type ForgeContext = {
  installContext: string;
  workspaceId: string;
};

export type PullRequest = PullRequestEvent & {
  title: string;
};
