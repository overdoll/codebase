use apollo_router::graphql::Response;
use apollo_router::plugin::Plugin;
use apollo_router::services::subgraph::Request;
use apollo_router::services::{subgraph, supergraph};
use apollo_router::{graphql, register_plugin};
use futures::{Stream, TryStreamExt};
use tower::{BoxError, ServiceExt};

#[derive(Default)]
struct Passport {}

impl Plugin for Passport {
    type Config = ();

    fn new(_configuration: Self::Config) -> Result<Self, BoxError> {
        Ok(Self::default())
    }

    fn supergraph_service(&self, service: supergraph::BoxService) -> supergraph::BoxService {
        service
            .map_request(|req: supergraph::Request| {
                let passport_key = req.supergraph_request.body().extensions.get("passport");
                if !passport_key.is_none() {
                    req.context
                        .upsert(&"passport_request".to_string(), |_passport: String| {
                            return passport_key.unwrap().to_string();
                        })
                        .expect("couldn't insert passport");
                }

                req
            })
            .map_response(|mut response: supergraph::Response| {
                // Send back updated passport
                if let Some(code) = response
                    .context
                    .get::<&String, String>(&"passport_response".to_string())
                    .expect("couldn't access context")
                {
                    // if let mut body = response.response.body_mut().poll_next() {
                    //     body.extensions
                    //         .insert("passport", String::from(code).as_str().parse().unwrap());
                    // }
                }
                response
            })
            .boxed()
    }

    fn subgraph_service(
        &self,
        _subgraph_name: &str,
        service: subgraph::BoxService,
    ) -> subgraph::BoxService {
        service
            .map_request(move |mut req: Request| {
                if let Some(code) = req
                    .context
                    .get::<&String, String>(&"passport_request".to_string())
                    .expect("couldn't access context")
                {
                    req.subgraph_request
                        .body_mut()
                        .extensions
                        .insert("passport", String::from(code).as_str().parse().unwrap());
                }
                req
            })
            .map_response(move |res| {
                let passport_key = res.response.body().extensions.get("passport");

                // check response of subgraphs and see if passport was in the extensions
                // if it was, add to context
                if !passport_key.is_none() {
                    res.context
                        .upsert(&"passport_response".to_string(), |_passport: String| {
                            return passport_key.unwrap().to_string();
                        })
                        .expect("couldn't insert passport");
                }
                res
            })
            .boxed()
    }
}

// Register our passport plugin
// forwards passport from request body to downstream services, as well as
// returning passport from downstream services
register_plugin!("overdoll", "passport", Passport);
