package ports

import (
	"context"
	"crypto/subtle"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"overdoll/applications/puppy/internal/app"
	"overdoll/libraries/crypt"
	"overdoll/libraries/passport"
	"overdoll/libraries/router"
	"overdoll/libraries/sentry_support"
)

type GraphQLErrorResponse struct {
	Errors []struct {
		Message   string   `json:"message"`
		Path      []string `json:"path"`
		Locations []string `json:"locations"`
	} `json:"errors"`
}

// Custom middleware that will ensure our security cookie + header is present
// Essentially, this is CSRF protection
func secureRequest() gin.HandlerFunc {
	return func(c *gin.Context) {

		ck, err := c.Request.Cookie("od.security")

		if err != nil && err == http.ErrNoCookie {
			c.AbortWithStatusJSON(400, GraphQLErrorResponse{Errors: []struct {
				Message   string   `json:"message"`
				Path      []string `json:"path"`
				Locations []string `json:"locations"`
			}{
				{
					Message:   "missing security cookie",
					Path:      []string{},
					Locations: []string{},
				},
			}})
			return
		}

		securityHeader := c.Request.Header.Get("X-overdoll-Security")

		if securityHeader == "" {
			c.AbortWithStatusJSON(400, GraphQLErrorResponse{Errors: []struct {
				Message   string   `json:"message"`
				Path      []string `json:"path"`
				Locations []string `json:"locations"`
			}{
				{
					Message:   "missing security header",
					Path:      []string{},
					Locations: []string{},
				},
			}})
			return
		}

		decrypted, err := crypt.DecryptWithCustomPassphrase(ck.Value, os.Getenv("SECURITY_SECRET"))

		if err != nil {
			c.AbortWithStatusJSON(400, GraphQLErrorResponse{Errors: []struct {
				Message   string   `json:"message"`
				Path      []string `json:"path"`
				Locations []string `json:"locations"`
			}{
				{
					Message:   "invalid security cookie",
					Path:      []string{},
					Locations: []string{},
				},
			}})
			return
		}

		if subtle.ConstantTimeCompare([]byte(decrypted), []byte(c.Request.Header.Get("X-overdoll-Security"))) != 1 {
			c.AbortWithStatusJSON(400, GraphQLErrorResponse{Errors: []struct {
				Message   string   `json:"message"`
				Path      []string `json:"path"`
				Locations []string `json:"locations"`
			}{
				{
					Message:   "security header and cookie mismatch",
					Path:      []string{},
					Locations: []string{},
				},
			}})
			return
		}

		c.Next()
	}
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
		req.URL.Path, req.URL.RawPath = "/", "/"
		if _, ok := req.Header["User-Agent"]; !ok {
			// explicitly disable User-Agent so it's not set to default value
			req.Header.Set("User-Agent", "")
		}
	}

	proxy := &httputil.ReverseProxy{Director: proxyDirector}
	proxy.Transport = passport.NewHttpRoundTripper(app)
	proxy.ErrorHandler = sentry_support.ProxyErrorHandler

	// proxy POST requests to graphql - we add our passport to payload here
	rtr.POST("/api/graphql", secureRequest(), gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}))

	proxy2 := &httputil.ReverseProxy{Director: proxyDirector}
	proxy2.ErrorHandler = sentry_support.ProxyErrorHandler

	// proxy OPTIONS to the server
	rtr.OPTIONS("/api/graphql", gin.WrapF(func(w http.ResponseWriter, r *http.Request) {
		proxy2.ServeHTTP(w, r)
	}))

	return rtr
}
