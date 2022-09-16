use std::env;
use std::ops::ControlFlow;

use apollo_router::graphql::Error;
use apollo_router::plugin::{Plugin, PluginInit};
use apollo_router::register_plugin;
use apollo_router::services::execution::Response;
use apollo_router::services::subgraph::BoxService;
use apollo_router::services::supergraph;
use apollo_router::services::supergraph::Request;
use redis::aio::MultiplexedConnection;
use redis::RedisResult;
use tower::BoxError;
use tower::ServiceBuilder;
use tower::ServiceExt;

struct Relay {}

// This plugin is a skeleton for doing authentication that requires a remote call.
#[async_trait::async_trait]
impl Plugin for Relay {
    type Config = ();

    async fn new(init: PluginInit<Self::Config>) -> Result<Self, BoxError>
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
