use std::env;
use std::{ops::ControlFlow, path::PathBuf};

use apollo_router_core::{
    plugin_utils, register_plugin, Plugin, QueryPlannerRequest, QueryPlannerResponse, ResponseBody,
    RouterRequest, RouterResponse, ServiceBuilderExt, SubgraphRequest, SubgraphResponse,
};
use http::StatusCode;
use redis::aio::{Connection, ConnectionLike, MultiplexedConnection};
use redis::{RedisError, RedisResult};
use tower::{util::BoxService, BoxError, ServiceBuilder, ServiceExt};

struct RelayPersistedQueries {
    conn: Option<MultiplexedConnection>,
}

impl Plugin for RelayPersistedQueries {
    type Config = ();

    fn new(_configuration: Self::Config) -> Result<Self, BoxError> {
        // Create new connection to redis
        let redis_var = env::var("REDIS_HOST").is_err();
        let client = redis::Client::open(format!("redis://{}/", redis_var))?;

        let rt = tokio::runtime::Runtime::new().unwrap();

        let conn = rt
            .block_on(client.get_multiplexed_tokio_connection())
            .unwrap();

        Ok(Self { conn: Some(conn) })
    }

    fn router_service(
        &mut self,
        service: BoxService<RouterRequest, RouterResponse, BoxError>,
    ) -> BoxService<RouterRequest, RouterResponse, BoxError> {
        let conn = self.conn.clone();
        ServiceBuilder::new()
            .async_checkpoint(move |req: RouterRequest| {
                return Box::pin(async move {
                    let query_key = req.context.request.body().extensions.get("queryId");
                    let new_conn: &mut MultiplexedConnection = conn.as_ref().as_mut().unwrap();

                    if query_key.is_none() {
                        return Ok(ControlFlow::Continue(req));
                    }

                    let result: RedisResult<String> = redis::cmd("GET")
                        .arg(query_key.unwrap().to_string())
                        .query_async(new_conn)
                        .await;

                    if result.is_err() {
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
                                return result.unwrap();
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
