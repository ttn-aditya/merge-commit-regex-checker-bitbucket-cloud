/**
 * This file contains the resolver definitions for the UI to call.
 * https://developer.atlassian.com/platform/forge/ui-kit-2/api-requests/#non-product-fetch-requests-and-the-storage-api
 */

import { storage } from "@forge/api";
import Resolver from "@forge/resolver";
import { titleSubstringKey } from "../consts";

export const getTitleSubstring = "getTitleSubstring";
export const updateTitleSubstring = "updateTitleSubstring";

const resolver = new Resolver();

resolver.define(getTitleSubstring, async (request) => {
  // We use the storage API to get the title substring from Forge storage.
  // https://developer.atlassian.com/platform/forge/runtime-reference/storage-api/
  // Default to an empty string if the title substring is not set.
  return (await storage.get(titleSubstringKey)) || "";
});

resolver.define(updateTitleSubstring, async (request) => {
  // We can also use the storage API to set the title substring in Forge storage.
  await storage.set(titleSubstringKey, request.payload.titleSubstring);
});

export const resolverHandler = resolver.getDefinitions();
