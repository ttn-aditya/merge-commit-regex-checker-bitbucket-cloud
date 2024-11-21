/**
 * This file is responsible for rendering the configuration page with a simple form to
 * configure the title substring used to validate the pull request title.
 */

import { invoke } from "@forge/bridge";
import ForgeReconciler, { Inline, Spinner, Text } from "@forge/react";
import React, { useEffect, useState } from "react";
import { getTitleSubstring } from "../resolvers";
import { TitleSubstringForm } from "./TitleSubstringForm";

const App = () => {
  const [titleSubstring, setTitleSubstring] = useState<string | undefined>();

  useEffect(() => {
    // Fetch the current title substring from the getTitleSubstring resolver we defined in
    // src/resolvers/index.ts.
    // https://developer.atlassian.com/platform/forge/ui-kit-2/api-requests/
    invoke<string>(getTitleSubstring).then((substring) => {
      setTitleSubstring(substring);
    });
  }, []);

  // We render the page using the UI Kit 2 components.
  // https://developer.atlassian.com/platform/forge/ui-kit/components/
  return (
    <>
      {titleSubstring === undefined ? (
        <Inline alignInline="center">
          <Spinner size="large" />
        </Inline>
      ) : (
        <>
          <Text>Configure the required Regex in PR Commit Message</Text>
          <TitleSubstringForm defaultValues={{ titleSubstring }} />
        </>
      )}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
