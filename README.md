# Merge Commit Message Validator for Pull Requests

This repository provides a Forge app for validating merge commit messages in Bitbucket pull requests. It ensures that pull requests targeting specific branches meet configurable standards for commit message patterns and merge strategies.

For detailed documentation and usage instructions, visit:  
[Merge Commit Message Validator Documentation](https://ak2019cs.gitbook.io/aditya-kumar/merge-commit-message-validator-for-pull-requests)

---

## Features

- **Pull Request Validation**:
  - Validates pull requests targeting specific branches (`main`, `master`, `boost_1.80.0`).
  - Ensures the merge strategy is set to `squash`.
  - Checks the merge commit message against a configurable regex pattern.

- **Configurable Regex**:
  - Admins can update the regex pattern used for validating merge commit messages via a user-friendly UI.

---

## Files Overview

### **`src/merge-checks/index.ts`**

This file contains the backend logic for validating pull requests. Key functionalities include:

1. **Fetching Pull Request Details**:
   - Retrieves the destination branch and checks if it's one of the allowed branches (`main`, `master`, `boost_1.80.0`).

2. **Validation Logic**:
   - Ensures the merge strategy is set to `squash`.
   - Validates the merge commit message against a regex pattern retrieved from Forge storage.

3. **Dynamic Configuration**:
   - The regex pattern for commit messages is fetched from Forge storage, allowing it to be updated without code changes.

4. **Error and Success Handling**:
   - Logs and returns appropriate responses based on validation results.

### **`frontend/TitleSubstringForm.tsx`**

This file provides the frontend interface for configuring the regex pattern. It is built using Atlassian's UI Kit 2. Documentations at :- https://ak2019cs.gitbook.io/aditya-kumar/merge-commit-message-validator-for-pull-requests

#### Key Features:
- A **form** to set the merge commit message regex pattern.
- Validates user input to ensure the field is not empty.
- Displays success messages when changes are applied.
- Automatically saves the regex pattern to Forge storage via an `invoke` resolver.

---
