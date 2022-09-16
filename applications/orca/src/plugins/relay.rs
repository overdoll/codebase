use apollo_router::plugin::{Plugin, PluginInit};
use apollo_router::register_plugin;
use apollo_router::services::subgraph::BoxService;
use tower::BoxError;
use tower::ServiceBuilder;
use tower::ServiceExt;

struct Relay {}

impl Plugin for Relay {
    type Config = ();

    fn new(init: PluginInit<Self::Config>) -> Result<Self, BoxError>
    where
        Self: Sized,
    {
        Ok(Relay {})
    }

    fn subgraph_service(&self, _subgraph_name: &str, service: BoxService) -> BoxService {
        ServiceBuilder::new().service(service).boxed()
    }
}

register_plugin!("overdoll", "relay", Relay);
