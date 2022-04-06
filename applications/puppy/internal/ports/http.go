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

	// we must create a custom proxy director
	// this director will always use "/" as the path for the request to orca, since orca
	// listens on the root url
	proxyDirector := func(req *http.Request) {
		req.URL.Scheme = u.Scheme
		req.URL.Host = u.Host
		req.URL.Path, req.URL.RawPath = "/", "/"
		if _, ok := req.Header["User-Agent"]; !ok {
			// explicitly disable User-Agent so it's not set to default value
			req.Header.Set("User-Agent", "")
		}
	}

	proxy := &httputil.ReverseProxy{Director: proxyDirector}
	proxy.Transport = passport.NewHttpRoundTripper(app)

	// proxy POST requests to graphql - we add our passport to payload here
	rtr.POST("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	proxy2 := &httputil.ReverseProxy{Director: proxyDirector}

	// proxy OPTIONS to the server
	rtr.OPTIONS("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy2.ServeHTTP(w, r)
	}))

	return rtr
}
