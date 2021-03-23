package middleware

import (
	"context"
	"net/http"

	"overdoll/libraries/jwt"
)

func Authenticate(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")

		// unauthenticated users are not allowed
		if err != nil || cookie == nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		jwtService := jwt.JWTAuthService()

		// Verify JWT token
		jwtToken, err := jwtService.ValidateToken(cookie.Value)

		if err != nil || jwtToken == nil {
			// If token invalid, remove it
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		claims := jwtToken.Claims.(*jwt.AuthCustomClaims)

		ctx := context.WithValue(r.Context(), "user", claims.Id)

		h.ServeHTTP(w, r.WithContext(ctx))
	})
}
