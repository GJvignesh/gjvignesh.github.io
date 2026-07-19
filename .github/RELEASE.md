# Release Process

Releases are fully automated with [release-please](https://github.com/googleapis/release-please).

## How it works

1. Write [conventional commits](https://www.conventionalcommits.org/) on `main`:
   - `fix:` → patch release (0.4.0 → 0.4.1)
   - `feat:` → minor release (0.4.0 → 0.5.0)
   - `feat!:` or a `BREAKING CHANGE:` footer → minor while pre-1.0 (0.4.0 → 0.5.0)
   - `chore:`, `docs:`, `ci:` → no release
2. release-please keeps a **Release PR** open that accumulates the pending
   changelog. Review it whenever you like.
3. **Merge the Release PR** to release: it bumps `package.json`, updates
   `CHANGELOG.md`, tags `vX.Y.Z`, creates the GitHub Release with generated
   notes, and attaches `astro-pulsar-X.Y.Z.tar.gz` / `.zip` build archives.

## One-off overrides

- Force a specific version: add a `Release-As: 1.0.0` footer to any commit.
- Edit release notes: edit the Release PR body before merging.

No manual `npm version`, tagging, or changelog editing is needed.
