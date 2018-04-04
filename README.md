### Preface

This repository demonstrates bad code that was previously used in Taskworld. The ultimate goal of this web is allowing users to delete their account, but before doing so, we force users to transfer their ownership to another user and do our exit survey. To confirm the account deletion, users need to type their emails, and tick the acknowledgment check-box. After deleting accounts, users will be redirected to `www.example.com`.

You can bring up the web by running `npm install` and `npm run client` respectively, then open http://localhost:1234/ in your browser.

### Specifications

You are logged in as _Ross Lynch_, the owner of the workspace _Lightning strike_.

Initially, the web needs to download the workspace data that belong to you from `/api/fetch-related-workspaces`.

Once the web has the workspace data, the web prompts you to transfer your tasks, projects, and admin rights to another person. Every time you assign a user, the web tries checking if the assigned user presents in the workspace (dry-run) by calling `/api/check-transfer-ownership`. Note that the ownership transfer operation will actually happen once you finish the email confirmation (the last step).

Moving on, you are forced to do the exit survey. Marking one or multiple answers allow you to proceed to the final step. Your answers and comments will be sent to [SurveyMonkey®](https://www.surveymonkey.com/) via its REST API for further analysis.

Finally, you need to confirm the account deletion by typing your email, hard-coded as `ross@example.com`, and mark the acknowledgment check-box. After that, calling `/api/terminate-account` will tell the server to transfer the ownership that is previously chosen in the first step, delete your account, and the web will redirect you to http://www.example.com.

You can go back and forth through the steps anytime, but the whole process is considered complete when clicking **Delete my account** button.

### Instructions

- You are instructed to refactor mainly JavaScript files (`*.js`) inside `src` directory, except `index.js`.
- You may amend, move, or delete some of the existing functionality even it breaks the specifications as long as you see fit.
- You may add new functionality in addition to the specifications as you see fit.
- You may rename the files and React components as you see fit.
- You must be able to explain the reasons behind your code changes along with its trade-off.
- You must be able to run `npm run client` against your code successfully and open http://localhost:1234/ to perform the intended tasks according to the specifications.
- You will not be judged by the appearance of the web, which means you may leave `index.css` and every `style={{ ... }}` prop untouched.
- You should add no more third-party library.

### Expectations

You will be judged by the following criteria.
- Functionality is correct with respect to the specifications, while breaking changes are acceptable only if rational.
- Functional programming paradigm is preferable.
- Functions do only one thing.
- Identifiers are named meaningfully.
- High coupling code blocks are adjacent to each other.
- Possible errors are handled and exposed to users beautifully.
- Good choice of data structure is used.
- Consistent indentation and formatting are followed.
- Indirection is minimized as much as possible, while still maintaining flexibility.
- Comments are presented where only needed.
