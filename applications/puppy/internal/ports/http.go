package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/passport"
	"overdoll/libraries/router"
)

func NewHttpServer(ctx context.Context, app *app.Application) http.Handler {

	rtr := router.NewRawGinRouter()

	u, err := url.Parse(os.Getenv("ORCA_SERVICE"))
	if err != nil {
		panic(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(u)
	proxy.Transport = passport.NewHttpRoundTripper(app)

	// proxy POST requests to graphql - we add our passport to payload here
	rtr.POST("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	proxy2 := httputil.NewSingleHostReverseProxy(u)

	// proxy OPTIONS to the server
	rtr.OPTIONS("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy2.ServeHTTP(w, r)
	}))

	return rtr
}
