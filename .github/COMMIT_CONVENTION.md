## Git Commit Message Convention

> Partly adapted from Angular's [commit message guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit).

### Simple explanation
All commit messages must constructed like this:
`<type>: <subject>`

### Types
- feat: A new feature
- fix: A Bugfix
- bump: Increase the version of something such as a dependency
- docs: Changes to documentation
- style: Formatting, missing semicolons etc. (No actual changes to code itself)
- refactor: Refactoring production code such as changing a variable name
- perf: Performance improvements
- workflow: Changes to deployment/commit verification workflow
- wip: Work in progress
```regex
/^(feat|fix|bump|docs|style|refactor|perf|workflow|wip): .{1,40}/;
```

### Examples
- `feat: Added auth system`
- `fix: Fixed display bug on phones`
- `bump: Bumped NuxtJS version`
- `docs: Improved build guide in readme`
- `style: Improved layout of anime page JS`
- `refactor: Fixed typos in variable names`
- `perf: Improved Performance for search`
- `workflow: Added GitHub Actions to check PRs`
- `wip: Started work on login system`

### Nothing fits
If you don't know what to pick, `feat:` is usually the way to go. Even if it's not an actual feature but just adding something to a page or changing the design a bit etc.