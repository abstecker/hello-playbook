//! A greeting, and nothing else.

/// Build a greeting for `name`, ignoring stray whitespace.
#[must_use]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name.trim())
}

/// One greeting per name, in order.
#[must_use]
pub fn greet_all(names: &[&str]) -> Vec<String> {
    names.iter().copied().map(greet).collect()
}

#[cfg(test)]
mod tests {
    use super::{greet, greet_all};

    #[test]
    fn greet_uses_the_name() {
        assert_eq!(greet("world"), "Hello, world!");
    }

    #[test]
    fn greet_ignores_stray_whitespace() {
        assert_eq!(greet("  world  "), "Hello, world!");
    }

    #[test]
    fn greet_all_keeps_the_order() {
        assert_eq!(greet_all(&["a", "b"]), ["Hello, a!", "Hello, b!"]);
    }
}
