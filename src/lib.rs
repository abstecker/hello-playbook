//! A greeting, and nothing else.

pub mod scratch;

/// Build a greeting for `name`, ignoring stray whitespace.
#[must_use]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name.trim())
}

#[cfg(test)]
mod tests {
    use super::greet;

    #[test]
    fn greet_uses_the_name() {
        assert_eq!(greet("world"), "Hello, world!");
    }

    #[test]
    fn greet_ignores_stray_whitespace() {
        assert_eq!(greet("  world  "), "Hello, world!");
    }
}
