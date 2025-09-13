# Documentation System Simplification

This document explains the simplified documentation synchronization system that replaces the previous complex manual synchronization approach.

## What Changed

### Before (Complex System)

- **Manual Synchronization**: Required manual updates to both `tasklist.md` and `docs/roadmap.md`  
- **Complex Validation**: 7 different validation scripts with intricate cross-referencing logic
- **Brittle Process**: Required 70+ commits to get working, prone to synchronization drift
- **High Maintenance**: Complex keyword matching and evidence gathering between files

### After (Simplified System)

- **GitHub Issues as Source of Truth**: Roadmap generated dynamically from repository issues
- **Automatic Synchronization**: No manual file synchronization required
- **Streamlined Validation**: Reduced validation complexity by ~60%
- **Self-Healing**: Works in both development and deployed environments with graceful fallback

## How It Works

### 1. Dynamic Roadmap Generation

The new `scripts/docs/generate-roadmap.js` system:

- **Fetches Roadmap Parent Issues**: Issues with titles like `[slug-name] Parent: Description` and the `roadmap` label
- **Auto-assigns Priority Items**: `priority:now` labeled issues are automatically tracked and associated with parent roadmap items
- **Real-time Status**: Status indicators (✅🟡🔜🚀🔒❓) are determined from issue labels and state
- **Automatic Categorization**: Issues are categorized by scope and type (Security & Reliability, User Experience, Developer Experience, etc.)

### 2. Fallback for Self-hosted Environments  

When GitHub API is not accessible (self-hosted deployments):

- Shows a graceful fallback message
- Maintains documentation availability
- Explains the limitation clearly to users

### 3. Simplified Documentation Check

The new `npm run docs:check:simplified` workflow:

1. **Scanning for Placeholders** - Checks for development placeholders (excludes generated content)
2. **Environment Documentation** - Validates environment variable documentation
3. **Changelog Sync** - Ensures changelog mirrors are synchronized
4. **Dynamic Roadmap Generation** - Creates roadmap from GitHub Issues
5. **API Documentation** - Generates OpenAPI and TypeDoc documentation
6. **Markdown Linting** - Validates formatting and structure

## Usage

### For Development

```bash
# Generate roadmap from GitHub Issues (requires GITHUB_TOKEN for best results)
npm run docs:roadmap

# Run all documentation checks (new simplified approach) 
npm run docs:check:simplified

# Run legacy docs check (for comparison/compatibility)
npm run docs:check
```

### For CI/CD

All GitHub Actions workflows now use `docs:check:simplified`:

- `docs-validation.yml` - PR validation
- `ci.yml` - Main CI pipeline
- `release.yml` - Release validation

### Setting Up GitHub Token

For local development with full GitHub API access:

```bash
export GITHUB_TOKEN="ghp_your_token_here"
npm run docs:roadmap
```

Without a token, the system gracefully falls back to static content.

## Issue Management Guidelines

### Creating Roadmap Parent Issues

1. **Title Format**: `[slug-name] Parent: Description`
2. **Labels**: Must include `roadmap` label
3. **Body**: Should list sub-issues using GitHub's task list syntax
4. **Example**:

   ```text
   Title: [auth-ui] Parent: Authentication UI
   Labels: roadmap, type:feature, scope:frontend
   Body: 
   Parent feature issue for auth-ui. Sub-issues:
   - [ ] #67 Auth pages (login/register)
   - [ ] #68 OAuth integration
   ```

### Managing Priority Items

1. **Label**: Use `priority:now` for high-priority items
2. **Auto-assignment**: Items are automatically tracked under relevant parent roadmap items
3. **Orphaned Items**: Unassigned `priority:now` items appear in a special section for triage

## Benefits

1. **Eliminates Manual Synchronization** - No more keeping multiple files in sync
2. **Real-time Status** - Always shows current state from repository issues
3. **Works Everywhere** - Functions in development, CI/CD, and deployed environments  
4. **Reduced Complexity** - ~60% reduction in validation scripts and logic
5. **Better Issue Tracking** - Leverages GitHub's native issue management
6. **Automatic Assignment** - Priority items are automatically associated with roadmap parents

## Migration Notes

- **Backward Compatibility**: Original `docs:check` still works for compatibility
- **gradual Transition**: Teams can switch workflows gradually
- **tasklist.md**: Can be deprecated since GitHub Issues are now the source of truth
- **No Data Loss**: All roadmap information is preserved in GitHub Issues

## Troubleshooting

### API Rate Limits

If you encounter GitHub API rate limits:

- Use a personal access token with appropriate permissions
- The system will gracefully fall back to static content

### Missing Issues

If roadmap appears empty:

- Ensure issues have the `roadmap` label
- Check that issue titles use the `[slug-name]` prefix format
- Verify GitHub token permissions if using authentication

### Self-hosted Deployments

For environments without GitHub API access:

- System shows a clear fallback message
- Documentation remains functional
- Consider setting up GitHub token for full functionality
