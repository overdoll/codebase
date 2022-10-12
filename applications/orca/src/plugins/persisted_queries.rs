use std::env;
use std::ops::ControlFlow;
use std::sync::Arc;

use apollo_router::layers::ServiceBuilderExt;
use apollo_router::plugin::{Plugin, PluginInit};
use apollo_router::services::supergraph;
use apollo_router::{graphql, register_plugin};
use http::StatusCode;
use redis::{Client, Commands, RedisResult};
use tower::BoxError;
use tower::ServiceBuilder;
use tower::ServiceExt;

struct PersistedQueries {
    conn: Arc<r2d2::Pool<Client>>,
}

// This plugin is a skeleton for doing authentication that requires a remote call.
#[async_trait::async_trait]
impl Plugin for PersistedQueries {
    type Config = ();

    async fn new(_configuration: PluginInit<Self::Config>) -> Result<Self, BoxError> {
        // Create new connection to redis
        let redis_var = env::var("REDIS_HOST");

        let client = Client::open(format!(
            "redis://{}/2",
            redis_var.expect("error connecting to redis")
        ))
        .unwrap();

        let pool = r2d2::Pool::builder().build(client).unwrap();

        Ok(Self {
            conn: Arc::new(pool),
        })
    }

    fn supergraph_service(&self, service: supergraph::BoxService) -> supergraph::BoxService {
        let cloned_conn = Arc::clone(&self.conn);
        let handler = move |req: supergraph::Request| {
            let query_key = &req.supergraph_request.body().extensions.get("queryId");
            let mut res = None;
            if !query_key.is_none() {
                let query_key_redis = "query:".to_owned();
                let new_query_key = query_key.unwrap().as_str().unwrap();
                let result: RedisResult<Option<String>> = cloned_conn
                    .get()
                    .unwrap()
                    .get(query_key_redis + new_query_key);

                if result.is_err() {
                    res = Some(
                        supergraph::Response::error_builder()
                            .error(
                                graphql::Error::builder()
                                    .message(format!(
                                        "error fetching query with id '{}'",
                                        query_key.unwrap().to_string()
                                    ))
                                    .build(),
                            )
                            .status_code(StatusCode::INTERNAL_SERVER_ERROR)
                            .context(req.context.clone())
                            .build()
                            .expect("response is valid"),
                    );
                } else {
                    let resulted = result.unwrap().clone();
                    if resulted.is_none() {
                        res = Some(
                            supergraph::Response::error_builder()
                                .error(
                                    graphql::Error::builder()
                                        .message(format!(
                                            "query with id '{}' not found",
                                            query_key.unwrap().to_string()
                                        ))
                                        .build(),
                                )
                                .status_code(StatusCode::BAD_REQUEST)
                                .context(req.context.clone())
                                .build()
                                .expect("response is valid"),
                        );
                    } else {
                        req.context
                            .insert(&"relay_persisted_query".to_string(), resulted.clone())
                            .expect("couldn't insert relay persisted query");
                    }
                }
            } else {
                if option_env!("APP_DEBUG").is_none()
                    || option_env!("APP_DEBUG").unwrap() == "false"
                {
                    res = Some(
                        supergraph::Response::error_builder()
                            .error(
                                graphql::Error::builder()
                                    .message(format!("only persisted queries are permitted"))
                                    .build(),
                            )
                            .status_code(StatusCode::BAD_REQUEST)
                            .context(req.context.clone())
                            .build()
                            .expect("response is valid"),
                    );
                }
            }
            {
                // Check to see if we built a response. If we did, we need to Break.
                match res {
                    Some(res) => Ok(ControlFlow::Break(res)),
                    None => Ok(ControlFlow::Continue(req)),
                }
            }
        };

        return ServiceBuilder::new()
            .checkpoint(handler)
            .buffered()
            .map_request(move |mut req: supergraph::Request| {
                if let Some(code) = req
                    .context
                    .get::<&String, String>(&"relay_persisted_query".to_string())
                    .expect("couldn't access context")
                {
                    req.supergraph_request.body_mut().query =
                        Option::from(String::from(code).to_string())
                }
                req
            })
            .service(service)
            .boxed();
    }
}

register_plugin!("overdoll", "persisted_queries", PersistedQueries);
