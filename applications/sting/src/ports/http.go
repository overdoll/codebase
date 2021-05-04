package ports

import (
	"fmt"
	"net/http"
	"time"

	"overdoll/applications/sting/src/app"
	gen "overdoll/applications/sting/src/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app app.Application
}

func NewGraphQLServer(app app.Application) *http.Server {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return &http.Server{
		Addr:         fmt.Sprint(":8080"),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      rtr,
	}
}

