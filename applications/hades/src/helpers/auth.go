package helpers

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"net/http"
	"project01101000/codebase/applications/hades/src/authentication"
	"project01101000/codebase/applications/hades/src/models"
	"time"
)

func UserFromContext(ctx context.Context) *models.User {
	raw, _ := ctx.Value("UserContextKey").(*models.User)
	return raw
}

func CreateUserSession(gc *gin.Context, redis redis.Conn, username string) (*string, error) {
	jwtService := authentication.JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120)

	token := jwtService.GenerateToken(username, expiration.Unix())

	// Set session cookies
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: token, Expires: expiration, HttpOnly: true, Secure: true, Path: "/"})

	// Add to redis set for this user's session tokens
	// TODO: Should capture stuff like IP, location, header so we can show the user the devices that are logged in for them
	_, err := redis.Do("SADD", "session:"+username, token)

	if err != nil {
		return nil, err
	}

	return nil, nil
}
