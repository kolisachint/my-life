# data/ — generated cache

Everything here is produced by `./bin/todoist sync` and **is committed on purpose**.
It is what lets an agent start a session for ~1.5k tokens instead of ~40k.

| File | Read it when |
| --- | --- |
| `brief.md` | Always, first. Overdue / today / next 7 days / stalled goals. |
| `tasks.tsv` | You need to search or list. One line per task, `grep`-friendly. |
| `notes/<id>.md` | You need one specific task's long description. |
| `meta.json` | You need project, section or label IDs. |
| `store.json` | **Never.** Raw merged state; exists only to regenerate the above. |

Empty until you run `make sync` once.
