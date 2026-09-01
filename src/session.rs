//! One line in, one reply out: the seam every shell drives.

use crate::greet;

/// A conversation with the greeter.
#[cfg_attr(feature = "wasm", wasm_bindgen::prelude::wasm_bindgen)]
#[derive(Debug, Default)]
pub struct Session;

#[cfg_attr(feature = "wasm", wasm_bindgen::prelude::wasm_bindgen)]
impl Session {
    /// A new conversation.
    #[cfg_attr(feature = "wasm", wasm_bindgen::prelude::wasm_bindgen(constructor))]
    #[must_use]
    pub fn new() -> Self {
        #[cfg(feature = "wasm")]
        console_error_panic_hook::set_once();
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
