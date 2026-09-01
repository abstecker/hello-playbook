//! A greeting, and nothing else.

/// Build a greeting for `name`.
#[must_use]
pub fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

#[cfg(test)]
mod tests {
    use super::greet;

    #[test]
    fn greet_uses_the_name() {
        assert_eq!(greet("world"), "Hello, world!");
    }
}
