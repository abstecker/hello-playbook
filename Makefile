.DEFAULT_GOAL := ayce

help:
	@echo "ayce   run the whole gate"
	@echo "build  compile the workspace"
	@echo "help   this list"

.PHONY: help

GATE := build

build:
	cargo build --workspace

.PHONY: build

ayce: $(GATE)
	@echo "ayce — all your code, evaluated"

.PHONY: ayce
