.DEFAULT_GOAL := ayce

help:
	@echo "ayce   run the whole gate"
	@echo "build  compile the workspace"
	@echo "help   this list"

.PHONY: help

GATE := build fmt lint

build:
	cargo build --workspace

fmt:
	cargo fmt --all --check

lint:
	cargo clippy --workspace --all-targets -- -D warnings

.PHONY: build fmt lint

ayce: $(GATE)
	@echo "ayce — all your code, evaluated"

.PHONY: ayce
