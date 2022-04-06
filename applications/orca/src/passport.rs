use apollo_router_core::{
    register_plugin, Plugin, ResponseBody, RouterRequest, RouterResponse, SubgraphRequest,
    SubgraphResponse,
};
use tower::{util::BoxService, BoxError, ServiceExt};

#[derive(Default)]
struct Passport {}

impl Plugin for Passport {
    type Config = ();

    fn new(_configuration: Self::Config) -> Result<Self, BoxError> {
        Ok(Self::default())
    }

    fn router_service(
        &mut self,
        service: BoxService<RouterRequest, RouterResponse, BoxError>,
    ) -> BoxService<RouterRequest, RouterResponse, BoxError> {
        service
            .map_request(move |req: RouterRequest| {
                let passport_key = req.context.request.body().extensions.get("passport");

                if !passport_key.is_none() {
                    req.context
                        .upsert(
                            &"passport_request".to_string(),
                            |_passport: String| {
                                return passport_key.unwrap().to_string();
                            },
                            || "".to_string(),
                        )
                        .expect("couldn't insert passport");
                }

                req
            })
            .map_response(move |mut res: RouterResponse| {
                // Send back updated passport
                if let Some(code) = res
                    .context
                    .get::<&String, String>(&"passport_response".to_string())
                    .expect("couldn't access context")
                {
                    if let ResponseBody::GraphQL(body) = res.response.body_mut() {
                        body.extensions
                            .insert("passport", String::from(code).as_str().parse().unwrap());
                    }
                }
                res
            })
            .boxed()
    }

    fn subgraph_service(
        &mut self,
        _name: &str,
        service: BoxService<SubgraphRequest, SubgraphResponse, BoxError>,
    ) -> BoxService<SubgraphRequest, SubgraphResponse, BoxError> {
        service
            .map_request(move |mut req: SubgraphRequest| {
                if let Some(code) = req
                    .context
                    .get::<&String, String>(&"passport_request".to_string())
                    .expect("couldn't access context")
                {
                    req.http_request
                        .body_mut()
                        .extensions
                        .insert("passport", String::from(code).as_str().parse().unwrap());
                }
                req
            })
            .map_response(move |res| {
                let passport_key = res.response.inner.body().extensions.get("passport");

                // check response of subgraphs and see if passport was in the extensions
                // if it was, add to context
                if !passport_key.is_none() {
                    res.context
                        .upsert(
                            &"passport_response".to_string(),
                            |_passport: String| {
                                return passport_key.unwrap().to_string();
                            },
                            || "".to_string(),
                        )
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
