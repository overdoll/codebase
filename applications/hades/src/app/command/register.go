package command

import (
	"context"
	"net/http"

	"overdoll/applications/hades/src/domain/user"
	"overdoll/libraries/helpers"
)

type RegisterHandler struct{}

func NewRegisterHandler() RegisterHandler {
	return RegisterHandler{}
}

func (h RegisterHandler) Handle(ctx context.Context, username string) (bool, error) {
	// Log user out from session by removing token from redis and cookie from browser
	gc := helpers.GinContextFromContext(ctx)

	user := user.FromContext(ctx)

	// remove session from redis
	val, err := r.Redis.Do("SREM", "session:"+user.Username, user.Token)

	if val == nil || err != nil {
		return false, err
	}

	// clear session cookie
	http.SetCookie(gc.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})

	return true, nil
}
