/// Deliberately wrong: a string literal is not a `u32`.
#[must_use]
pub fn answer() -> u32 {
    let n: u32 = "42";
    n
}
