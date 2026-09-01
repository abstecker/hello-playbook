# Steps

This repository is generated from the book *hello-playbook*. Do not open
pull requests here — change the book instead. Every row below is one
commit, and every tag is a permanent link to the code at that point.

| # | Tag | Expect | Subject | Source |
|---|---|---|---|---|
| 001 | `step-001-cargo-init` | pass | feat: a package that builds | [src/ch01-a-repo-that-builds.md](https://abstecker.github.io/hello-playbook/ch01-a-repo-that-builds.html#step-cargo-init) |
| 002 | `step-002-hello-runs` | pass | docs: cargo run prints the greeting | [src/ch01-a-repo-that-builds.md](https://abstecker.github.io/hello-playbook/ch01-a-repo-that-builds.html#step-hello-runs) |
| 003 | `step-003-makefile` | pass | build: one command runs everything | [src/ch02-the-gate.md](https://abstecker.github.io/hello-playbook/ch02-the-gate.html#step-makefile) |
| 004 | `step-004-make-help` | pass | build: make help lists the targets | [src/ch02-the-gate.md](https://abstecker.github.io/hello-playbook/ch02-the-gate.html#step-make-help) |
| 005 | `step-005-rustfmt` | pass | style: pin the formatter | [src/ch03-lints-and-format.md](https://abstecker.github.io/hello-playbook/ch03-lints-and-format.html#step-rustfmt) |
| 006 | `step-006-toolchain` | pass | build: pin the toolchain | [src/ch03-lints-and-format.md](https://abstecker.github.io/hello-playbook/ch03-lints-and-format.html#step-toolchain) |
| 007 | `step-007-lints` | pass | style: forbid unsafe, warn on pedantic | [src/ch03-lints-and-format.md](https://abstecker.github.io/hello-playbook/ch03-lints-and-format.html#step-lints) |
| 008 | `step-008-gate-fmt-clippy` | pass | build: fmt and clippy join the gate | [src/ch03-lints-and-format.md](https://abstecker.github.io/hello-playbook/ch03-lints-and-format.html#step-gate-fmt-clippy) |
| 009 | `step-009-greet-lib` | pass | feat: greet(), extracted into a library | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-greet-lib) |
| 010 | `step-010-greet-test` | pass | test: greet uses the name it is given | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-greet-test) |
| 011 | `step-011-test-that-fails` | test_fail | test: greet should ignore stray whitespace (failing) | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-test-that-fails) |
| 012 | `step-012-test-that-passes` | pass | fix: greet ignores stray whitespace | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-test-that-passes) |
| 013 | `step-013-wont-compile` | compile_fail | feat: scratch module (does not compile) | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-wont-compile) |
| 014 | `step-014-scratch-fixed` | pass | fix: parse the text instead of pretending it is a number | [src/ch04-tests-and-failing-on-purpose.md](https://abstecker.github.io/hello-playbook/ch04-tests-and-failing-on-purpose.html#step-scratch-fixed) |
| 015 | `step-015-deny-toml` | pass | chore: cargo-deny configuration | [src/ch05-supply-chain.md](https://abstecker.github.io/hello-playbook/ch05-supply-chain.html#step-deny-toml) |
| 016 | `step-016-security-scan` | pass | chore: one definition of the security scan | [src/ch05-supply-chain.md](https://abstecker.github.io/hello-playbook/ch05-supply-chain.html#step-security-scan) |
| 017 | `step-017-gate-test-audit` | pass | build: tests and the security scan join the gate | [src/ch05-supply-chain.md](https://abstecker.github.io/hello-playbook/ch05-supply-chain.html#step-gate-test-audit) |
| 018 | `step-018-tool-versions` | pass | chore: declare the toolchain for version managers | [src/ch06-ci.md](https://abstecker.github.io/hello-playbook/ch06-ci.html#step-tool-versions) |
| 019 | `step-019-ci-workflow` | pass | ci: run the gate on every push and pull request | [src/ch06-ci.md](https://abstecker.github.io/hello-playbook/ch06-ci.html#step-ci-workflow) |
| 020 | `step-020-drop-scratch` | pass | chore: remove the scratch module | [src/ch06-ci.md](https://abstecker.github.io/hello-playbook/ch06-ci.html#step-drop-scratch) |
