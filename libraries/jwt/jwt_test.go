package jwt

import (
	"testing"
	"time"
	"github.com/stretchr/testify/assert"

)

func JWTTestService() JWTService {
	return &jwtServices{
		secretKey: "test",
	}
}

// TestJWTToken_Generation - Test JWT tokens - Generation
func TestJWTToken_Generation(t *testing.T) {
	// Just make sure it doesn't panic
	JWTTestService().GenerateToken("123456", time.Now().Add(time.Hour * 120).Unix())
}

// TestJWTToken_Generation - Test JWT tokens - Validation
func TestJWTToken_Validation(t *testing.T) {
	expectedToken := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImV4cCI6MTYxNDc5NTQ2MywiaWF0IjoxNjE0MzYzNDYzfQ.1sSXxPktMFfOpleXNboCcW6H5m4kzRhf6eYErAyX8qM"

	token, err := JWTTestService().ValidateToken(expectedToken)

	assert.Equal(t, err, nil)
	assert.Equal(t, token.Raw, expectedToken)
}