package user

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"overdoll/libraries/jwt"
)

type AuthenticatedUser struct {
	Id       string
	Username string
	Token    string
	Roles    []string
	Verified bool
}

func (user *AuthenticatedUser) IsVerified() bool {
	return user.Verified == true
}

func UserFromContext(ctx context.Context) *AuthenticatedUser {
	raw, _ := ctx.Value("UserContextKey").(*AuthenticatedUser)
	return raw
}

func CreateUserSession(gc *gin.Context, redis redis.Conn, id string) (*string, error) {
	jwtService := jwt.JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120)

	token := jwtService.GenerateToken(id, expiration.Unix())

	// Set session cookies
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: token, Expires: expiration, HttpOnly: true, Secure: true, Path: "/"})

	// Add to redis set for this user's session tokens
	// TODO: Should capture stuff like IP, location, header so we can show the user the devices that are logged in for them
	_, err := redis.Do("SADD", "session:"+id, token)

	if err != nil {
		return nil, err
	}

	return &token, nil
}
