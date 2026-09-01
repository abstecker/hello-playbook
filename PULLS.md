# Pull requests

Declared by the book *hello-playbook*. Each is a branch in this repository,
and its state is the book's, not a forge's.

| Branch | State | Title | Head | Merged by |
|---|---|---|---|---|
| `try/shout` | open | Shout the greeting | `step-021-shout` | — |
| `feat/greet-many` | merged | Greet many names at once | `step-023-greet-many-test` | `step-025-merge-greet-many` |

## Shout the greeting

`try/shout` — open

Louder is not better when the tests pin the exact words. Left open, on
purpose: this is the attempt that did not work.

## Greet many names at once

`feat/greet-many` — merged

Adds `greet_all`: one greeting per name, in the order given. Merged into
`main` by a merge commit of its own.
