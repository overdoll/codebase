package middleware

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"net/http"
	evav1 "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/hades/src/authentication"
	"project01101000/codebase/applications/hades/src/helpers"
	"project01101000/codebase/applications/hades/src/models"
	"project01101000/codebase/applications/hades/src/services"
)

// Middleware decodes the share session cookie and packs the session into context
func AuthenticationMiddleware(services services.Services, redis redis.Conn) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Request.Cookie("session")

		// Allow unauthenticated users in
		if err != nil || cookie == nil {
			c.Next()
			return
		}

		jwtService := authentication.JWTAuthService()

		// Verify JWT token
		jwtToken, err := jwtService.ValidateToken(cookie.Value)

		if err != nil || jwtToken == nil {
			// If token invalid, remove it
			// c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			c.Next()
			return
		}

		claims := jwtToken.Claims.(*authentication.AuthCustomClaims)

		// make sure our session token also exists in the Redis Set
		existing, err := redis.Do("SISMEMBER", "session:"+claims.Username, cookie.Value)

		// If it doesn't exist in Redis, we remove it
		if err != nil || existing == 0 {
			// Instead of a 403 abort, we just remove this invalid session cookie
			//c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			c.Next()
			return
		}

		// Verify user exists with this token by grabbing the user
		user, err := services.Eva().GetUser(c, &evav1.GetUserRequest{Username: claims.Username})

		if err != nil {
			// No user - we just remove this token from our set
			// c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			redis.Do("SREM", "session:"+claims.Username, cookie.Value)
			c.Next()
			return
		}

		_, err = helpers.CreateUserSession(c, redis, claims.Username)

		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// remove old token since its not valid anymore (we "expired" it)
		existing, err = redis.Do("SREM", "session:"+claims.Username, cookie.Value)

		// Redis error
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// put it in context
		ctx := context.WithValue(c.Request.Context(), "UserContextKey", &models.AuthenticatedUser{Username: user.Username, Token: jwtToken.Raw})

		// and call the next with our new context
		c.Request = c.Request.WithContext(ctx)
		c.Next()
		return
	}
}
