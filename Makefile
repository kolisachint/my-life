SHELL := /bin/sh
.PHONY: help setup brief review doctor pub docx commit

help:
	@echo "make setup   - install todoist + dbxcli, write configs from .env"
	@echo "make brief   - refresh data/brief.md from Todoist filters"
	@echo "make review  - brief + standing decisions + memory (the Sunday ritual)"
	@echo "make doctor  - verify tools, tokens, connectivity, PDF engine"
	@echo "make docx    - rebuild + validate the editable Word career documents"
	@echo "make commit  - commit the refreshed brief and memory"
	@echo
	@echo "publish:  ./bin/pub FILE [--pdf] [--dir SUB] [--tmp]"

setup:
	@./bin/setup

brief:
	@./bin/brief

review: brief
	@echo; cat state/decisions.md; echo; cat memory/learned.txt

doctor:
	@./bin/doctor

docx:
	@./bin/docx --check

commit:
	@git add -A data memory state && git commit -q -m "sync: $$(date +%F)" || echo "nothing to commit"
