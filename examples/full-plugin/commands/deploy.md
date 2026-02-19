---
description: Deploy the project to the specified environment.
---

# Deploy

Deploy the project to the environment specified in $ARGUMENTS (default: staging).

## Steps

1. Confirm the target environment with the user
2. Run the test suite — abort if tests fail
3. Build the project
4. Run the deploy command for the target environment
5. Verify the deployment succeeded
6. Report the result

## Safety

- Never deploy to production without explicit user confirmation
- Always run tests before deploying
- If any step fails, stop and report the error
