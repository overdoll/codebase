extern crate dotenv;

use std::env;

use anyhow::Result;

mod plugins;

fn main() -> Result<()> {
    let my_path = env::current_dir()?;
    let s = format!("{}/applications/orca/.env", my_path.display());

    dotenv::from_path(s).ok();

    let sentry_dsn = env::var("SENTRY_DSN");

    if sentry_dsn.is_ok() {
        let _guard = sentry::init((
            sentry_dsn.unwrap(),
            sentry::ClientOptions {
                release: sentry::release_name!(),
                ..Default::default()
            },
        ));
    }

    apollo_router::main()
}
