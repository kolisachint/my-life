SHELL := /bin/sh
.PHONY: help sync brief review doctor commit

help:
	@echo "make sync    - pull Todoist changes into data/ (incremental)"
	@echo "make brief   - print the agent brief from cache (no network)"
	@echo "make review  - sync, then print brief + standing decisions"
	@echo "make doctor  - check token, connectivity, cache freshness"
	@echo "make commit  - commit the refreshed cache"

sync:
	@./bin/todoist sync

brief:
	@./bin/todoist brief

review: sync
	@cat data/brief.md
	@echo
	@cat state/decisions.md

doctor:
	@./bin/todoist doctor

commit:
	@git add -A data state && git commit -q -m "sync: refresh cache $$(date +%F)" || echo "nothing to commit"
