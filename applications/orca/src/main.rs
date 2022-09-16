extern crate dotenv;

use std::env;

use anyhow::Result;

mod plugins;

fn main() -> Result<()> {
    let my_path = env::current_dir()?;
    let s = format!("{}/applications/orca/.env", my_path.display());

    dotenv::from_path(s).ok();
    apollo_router::main()
}
