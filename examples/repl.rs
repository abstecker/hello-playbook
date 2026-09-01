//! Type a name, press Enter, and the greeter answers. Ctrl-D ends it.

use hello_playbook::Session;

fn main() -> std::io::Result<()> {
    let mut session = Session::new();
    for line in std::io::stdin().lines() {
        println!("{}", session.eval(&line?));
    }
    Ok(())
}
