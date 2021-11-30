package passport

import (
	"context"
	"encoding/json"
	"github.com/99designs/gqlgen/graphql"
)

type GraphqlResponseExtension struct{}

func (r GraphqlResponseExtension) ExtensionName() string {
	return "GraphQLResponseExtension"
}

func (r GraphqlResponseExtension) Validate(schema graphql.ExecutableSchema) error {
	return nil
}

// if passport recently mutated, put it into the body of the response to be parsed out by the gateway
func (r GraphqlResponseExtension) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {

	resp := next(ctx)

	pass := FromContext(ctx)

	if pass.hasBeenRecentlyMutated() {
		var obj map[string]interface{}

		if err := json.Unmarshal(resp.Data, &obj); err != nil {
			panic(err)
		}

		obj["passport"] = pass.SerializeToBaseString()

		b, err := json.Marshal(obj)

		if err != nil {
			panic(err)
		}

		resp.Data = b
	}

	return resp
}
