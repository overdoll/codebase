package middleware

import (
	"crypto/sha1"
	"crypto/subtle"
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Checks for a CSRF header & token
func CSRFCheck() gin.HandlerFunc {
	return func(c *gin.Context) {

		cookie, err := c.Request.Cookie("_csrf")

		// No cookie, not authorized
		if err != nil || cookie == nil {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		csrfHeader := c.Request.Header["Csrf-Token"]

		// Header doesn't exist - bailout
		if csrfHeader == nil || csrfHeader[0] == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		token := csrfHeader[0]

		string := strings.Split(token, "-")
		salt := string[0]

		expected := salt + "-" + hash(salt + "-" + cookie.Value)

		// If our CSRF token is not the same as our hashed string, then we abort
		// Time-safe comparison (https://codahale.com/a-lesson-in-timing-attacks/)
		if subtle.ConstantTimeCompare([]byte(expected), []byte(token)) != 1 {
			fmt.Println(expected)
			fmt.Println(token)
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Next()
		return
	}
}

// Hash function
func hash(str string) string {
	hasher := sha1.New()
	hasher.Write([]byte(str))
	sha := base64.RawURLEncoding.EncodeToString(hasher.Sum(nil))

	return sha
}