use anyhow::Result;

// `cargo run -- -s ../graphql/supergraph.graphql -c ./router.yaml`
fn main() -> Result<(), E> {
    apollo_router::main()
}
