package ports

import (
	"context"
	"crypto/subtle"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/crypt"
	"overdoll/libraries/errors/graphql"
	"overdoll/libraries/passport"
	"overdoll/libraries/router"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
)

// Custom middleware that will ensure our security cookie + header is present
// Essentially, this is CSRF protection
func secureRequest() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "GET" {
			if len(c.Request.URL.RawQuery) == 0 && support.IsDebug() {
				return
			}
		}

		ck, err := c.Request.Cookie("od.security")

		if err != nil {

			if err == http.ErrNoCookie {
				c.AbortWithStatusJSON(http.StatusOK, graphql.NewErrorResponse("missing security cookie"))
				return
			}

			zap.S().Errorw("failed to read security cookie", zap.Error(err))
			c.AbortWithStatusJSON(http.StatusOK, graphql.InternalServerError)
			return
		}

		securityHeader := c.Request.Header.Get("X-overdoll-Security")

		if securityHeader == "" {
			c.AbortWithStatusJSON(http.StatusOK, graphql.NewErrorResponse("missing security header"))
			return
		}

		decrypted, err := crypt.DecryptWithCustomPassphrase(ck.Value, os.Getenv("SECURITY_SECRET"))

		if err != nil {
			zap.S().Errorw("could not decrypt cookie", zap.Error(err))
			c.AbortWithStatusJSON(http.StatusOK, graphql.NewErrorResponse("invalid security cookie"))
			return
		}

		if subtle.ConstantTimeCompare([]byte(decrypted), []byte(c.Request.Header.Get("X-overdoll-Security"))) != 1 {
			c.AbortWithStatusJSON(http.StatusOK, graphql.NewErrorResponse("security header and cookie mismatch"))
			return
		}

		c.Next()
	}
}

func proxyErrorHandler(res http.ResponseWriter, req *http.Request, err error) {

	sentry_support.CaptureException(req.Context(), err)

	zap.S().Errorw("failed to proxy http", zap.Error(err))

	bytes, _ := json.Marshal(graphql.InternalServerError)
	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(http.StatusOK)
	res.Write(bytes)
}

func NewHttpServer(ctx context.Context, app *app.Application) http.Handler {

	rtr := router.NewRawGinRouter()

	u, err := url.Parse(os.Getenv("ORCA_SERVICE"))
	if err != nil {
		zap.S().Fatalw("failed to parse orca URL", zap.Error(err))
	}

	// we must create a custom proxy director
	// this director will always use "/" as the path for the request to orca, since orca
	// listens on the root url
	proxyDirector := func(req *http.Request) {
		req.URL.Scheme = u.Scheme
		req.URL.Host = u.Host
		req.URL.Path, req.URL.RawPath = "/api/graphql", "/api/graphql"
		if _, ok := req.Header["User-Agent"]; !ok {
			req.Header.Set("User-Agent", "")
		}
	}

	proxy := &httputil.ReverseProxy{Director: proxyDirector}
	proxy.Transport = passport.NewHttpRoundTripper(app)
	proxy.ErrorHandler = proxyErrorHandler

	// proxy POST requests to graphql - we add our passport to payload here
	rtr.POST("/api/graphql", secureRequest(), gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	// proxy GET to the server
	rtr.GET("/api/graphql", secureRequest(), gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	return rtr
}
