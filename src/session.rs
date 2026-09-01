//! One line in, one reply out: the seam every shell drives.

use crate::greet;

/// A conversation with the greeter.
#[derive(Debug, Default)]
pub struct Session;

impl Session {
    /// A new conversation.
    #[must_use]
    pub fn new() -> Self {
        Self
    }

    /// Answer one line: greet the name on it, or the world if it is blank.
    pub fn eval(&mut self, line: &str) -> String {
        let name = line.trim();
        greet(if name.is_empty() { "world" } else { name })
    }
}

#[cfg(test)]
mod tests {
    use super::Session;

    #[test]
    fn a_name_is_greeted() {
        assert_eq!(Session::new().eval("Ada"), "Hello, Ada!");
    }

    #[test]
    fn a_blank_line_greets_the_world() {
        assert_eq!(Session::new().eval("  "), "Hello, world!");
    }
}
