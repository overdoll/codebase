use std::env;
use std::ops::ControlFlow;

use apollo_router_core::{
    plugin_utils, register_plugin, Plugin, RouterRequest, RouterResponse, ServiceBuilderExt,
};
use http::StatusCode;
use redis::aio::MultiplexedConnection;
use redis::RedisResult;
use tower::{util::BoxService, BoxError, ServiceBuilder, ServiceExt};

struct RelayPersistedQueries {
    conn: Option<MultiplexedConnection>,
}

#[async_trait::async_trait]
impl Plugin for RelayPersistedQueries {
    type Config = ();

    fn new(_configuration: Self::Config) -> Result<Self, BoxError> {
        Ok(Self { conn: None })
    }

    async fn startup(&mut self) -> Result<(), BoxError> {
        // Create new connection to redis
        let redis_var = env::var("REDIS_HOST");

        let client = redis::Client::open(format!(
            "redis://{}/2",
            redis_var.expect("error connecting to redis")
        ))?;

        let conn = client.get_multiplexed_tokio_connection().await.unwrap();

        self.conn = Option::from(conn);

        Ok(())
    }

    fn router_service(
        &mut self,
        service: BoxService<RouterRequest, RouterResponse, BoxError>,
    ) -> BoxService<RouterRequest, RouterResponse, BoxError> {
        let conn: Option<MultiplexedConnection> = self.conn.clone();
        ServiceBuilder::new()
            .async_checkpoint(move |req: RouterRequest| {
                let new_conn: Option<MultiplexedConnection> = conn.clone();
                return Box::pin(async move {
                    let query_key = req.context.request.body().extensions.get("queryId");

                    if query_key.is_none() {
                        return Ok(ControlFlow::Continue(req));
                    }

                    let query_key_redis = "query:".to_owned();
                    let new_query_key = query_key.unwrap().as_str().unwrap();

                    let result: RedisResult<Option<String>> = redis::cmd("GET")
                        .arg(query_key_redis + new_query_key)
                        .query_async(&mut new_conn.unwrap())
                        .await;

                    if result.is_err() {
                        let res = plugin_utils::RouterResponse::builder()
                            .errors(vec![apollo_router_core::Error {
                                message: format!(
                                    "error fetching query with id '{}'",
                                    query_key.unwrap().to_string()
                                ),
                                ..Default::default()
                            }])
                            .build()
                            .with_status(StatusCode::BAD_REQUEST);

                        return Ok(ControlFlow::Break(res));
                    }

                    let resulted = result.unwrap().clone();

                    if resulted.is_none() {
                        let res = plugin_utils::RouterResponse::builder()
                            .errors(vec![apollo_router_core::Error {
                                message: format!(
                                    "query with id '{}' not found",
                                    query_key.unwrap().to_string()
                                ),
                                ..Default::default()
                            }])
                            .build()
                            .with_status(StatusCode::BAD_REQUEST);

                        return Ok(ControlFlow::Break(res));
                    }

                    req.context
                        .upsert(
                            &"relay_persisted_query".to_string(),
                            |_passport: String| {
                                return resulted.clone().expect("result is blank");
                            },
                            || "".to_string(),
                        )
                        .expect("couldn't insert relay persisted query");

                    return Ok(ControlFlow::Continue(req));
                });
            })
            .map_request(move |mut req: RouterRequest| {
                if let Some(code) = req
                    .context
                    .get::<&String, String>(&"relay_persisted_query".to_string())
                    .expect("couldn't access context")
                {
                    req.context.request.body_mut().query =
                        Option::from(String::from(code).to_string())
                }
                req
            })
            .buffer(20_000)
            .service(service)
            .boxed()
    }
}

// Register our relay persisted queries plugin
register_plugin!("overdoll", "relay_persisted_queries", RelayPersistedQueries);
