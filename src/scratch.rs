/// Parse the text, and fall back to zero when it is not a number.
#[must_use]
pub fn answer() -> u32 {
    "42".parse().unwrap_or_default()
}
