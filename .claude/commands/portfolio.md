---
description: Refresh the open-source inventory that backs the AI half of his profile
---

Refresh the portfolio: $ARGUMENTS

```sh
bin/portfolio          # -> notes/Goals/Career/portfolio.md
bin/portfolio --list   # what is currently tracked
```

Tracked repos live in `data/portfolio-repos.txt`. Keep that list **short** — it
is the evidence a recruiter would actually open, not an archive of everything he
has ever pushed.

**To find new ones,** call the claude-code-remote `list_repos` MCP tool with
query `kolisachint`. The plain GitHub API is blocked here ("sessions are bound to
their configured repositories"), so enumeration cannot be scripted. Cloning a
public repo *does* work anonymously, which is what `bin/portfolio` relies on.

When something genuinely new and substantial appears, also fold it into
`data/career-facts.md` and say which career documents now need regenerating —
`/resume` runs that sweep.

**Read a repo before describing it.** Its README, its package layout, and
`git log --format='%an' | sort | uniq -c` for how much is actually his. Say
"extended a fork" where that is the truth — hoocode forks `pi-mono`, and a
reviewer who checks should find the framing already matches the repo.
