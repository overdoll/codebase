package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/helpers"
	gen "overdoll/applications/hades/src/graphql"
	extension2 "overdoll/applications/hades/src/graphql/extensions"
	"overdoll/applications/hades/src/middleware"
	"overdoll/applications/hades/src/ports"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/jwt"
	"overdoll/libraries/search"

	"github.com/99designs/gqlgen/graphql/handler"
	"overdoll/libraries/rabbit"
)

func main() {


	srv := ports.NewGraphQLServer()

	bootstrap.InitializeHttpServer(srv, func() {})
}