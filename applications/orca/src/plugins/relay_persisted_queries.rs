use std::env;
use std::ops::ControlFlow;

use apollo_router::{graphql, register_plugin};
use apollo_router::graphql::Error;
use apollo_router::layers::ServiceBuilderExt;
use apollo_router::plugin::{Plugin, PluginInit};
use apollo_router::services::execution::Response;
use apollo_router::services::supergraph;
use apollo_router::services::supergraph::Request;
use http::StatusCode;
use redis::aio::MultiplexedConnection;
use redis::RedisResult;
use tower::BoxError;
use tower::hedge::Future;
use tower::ServiceBuilder;
use tower::ServiceExt;

struct RelayPersistedQueries {
    conn: Option<MultiplexedConnection>,
}

// This plugin is a skeleton for doing authentication that requires a remote call.
#[async_trait::async_trait]
impl Plugin for RelayPersistedQueries {
    type Config = ();

    async fn new(_configuration: PluginInit<Self::Config>) -> Result<Self, BoxError> {
        // Create new connection to redis
        let redis_var = env::var("REDIS_HOST");

        let client = redis::Client::open(format!(
            "redis://{}/2",
            redis_var.expect("error connecting to redis")
        ))?;

        let conn = client.get_multiplexed_tokio_connection().await.unwrap();

        Ok(Self {
            conn: Option::from(conn),
        })
    }

    fn supergraph_service(&self, service: supergraph::BoxService) -> supergraph::BoxService {
        let conn: Option<MultiplexedConnection> = self.conn.clone();
        
        // let handler = move |req: supergraph::Request| async {
        //     let new_conn: Option<MultiplexedConnection> = conn.clone();
        //     let query_key = req.supergraph_request.body().extensions.get("queryId");
        // 
        //     if query_key.is_none() {
        //         return Ok(ControlFlow::Continue(req)).expect("expected to continue");
        //     }
        // 
        //     let query_key_redis = "query:".to_owned();
        //     let new_query_key = query_key.unwrap().as_str().unwrap();
        // 
        //     let result: RedisResult<Option<String>> = redis::cmd("GET")
        //         .arg(query_key_redis + new_query_key)
        //         .query_async(&mut new_conn.unwrap())
        //         .await;
        // 
        //     if result.is_err() {
        //         let res = Some(
        //             supergraph::Response::error_builder()
        //                 .error(
        //                     graphql::Error::builder()
        //                         .message(format!(
        //                             "error fetching query with id '{}'",
        //                             query_key.unwrap().to_string()
        //                         ))
        //                         .build(),
        //                 )
        //                 .status_code(StatusCode::INTERNAL_SERVER_ERROR)
        //                 .context(req.context.clone())
        //                 .build()
        //                 .expect("response is valid"),
        //         );
        // 
        //         return Ok(ControlFlow::Break(res)).expect("expected to continue");
        //     }
        // 
        //     let resulted = result.unwrap().clone();
        // 
        //     if resulted.is_none() {
        //         let res = Some(
        //             supergraph::Response::error_builder()
        //                 .error(
        //                     graphql::Error::builder()
        //                         .message(format!(
        //                             "query with id '{}' not found",
        //                             query_key.unwrap().to_string()
        //                         ))
        //                         .build(),
        //                 )
        //                 .status_code(StatusCode::BAD_REQUEST)
        //                 .context(req.context.clone())
        //                 .build()
        //                 .expect("response is valid"),
        //         );
        // 
        //         return Ok(ControlFlow::Break(res)).expect("expected to continue");
        //     }
        // 
        //     req.context
        //         .upsert(&"relay_persisted_query".to_string(), |_passport: String| {
        //             return resulted.clone().expect("result is blank");
        //         })
        //         .expect("couldn't insert relay persisted query");
        // 
        //     return ControlFlow::Continue(req);
        // };

        ServiceBuilder::new()
            .checkpoint_async(|req: supergraph::Request| async {
                Ok(ControlFlow::Continue(req))
            })
            // .map_request(move |mut req: Request| {
            //     if let Some(code) = req
            //         .context
            //         .get::<&String, String>(&"relay_persisted_query".to_string())
            //         .expect("couldn't access context")
            //     {
            //         req.supergraph_request.body_mut().query =
            //             Option::from(String::from(code).to_string())
            //     }
            //     req
            // })
            .buffer(20_000)
            .service(service)
            .boxed()
    }
}

register_plugin!("overdoll", "relay_persisted_queries", RelayPersistedQueries);
