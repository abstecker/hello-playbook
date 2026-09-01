.DEFAULT_GOAL := ayce


GATE := build

build:
	cargo build --workspace

.PHONY: build

ayce: $(GATE)
	@echo "ayce — all your code, evaluated"

.PHONY: ayce
