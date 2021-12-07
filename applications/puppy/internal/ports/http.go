package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/router"
)

// ProxyRequestHandler handles the http request using proxy
func proxyRequestHandler(proxy *httputil.ReverseProxy, app app.Application) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := app.HandleRequest(w, r); err != nil {
			panic(err)
		}
		proxy.ServeHTTP(w, r)
	}
}

func NewHttpServer(ctx context.Context, app app.Application) http.Handler {

	rtr := router.NewRawGinRouter()

	u, err := url.Parse(os.Getenv("MEDUSA_SERVICE"))
	if err != nil {
		panic(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(u)
	proxy.ModifyResponse = app.HandleResponse()

	// proxy POST requests to graphql - we add our passport to payload here
	rtr.POST("/api/graphql", gin.WrapF(proxyRequestHandler(proxy, app)))

	// GET requests proxy directly back to the actual thing
	rtr.GET("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	return rtr
}
