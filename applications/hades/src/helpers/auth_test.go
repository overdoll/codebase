package helpers

import (
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/gin-gonic/gin"
	"overdoll/applications/hades/__tests__"
)

// TestCreateUserSession - Test creating a User session
func TestCreateUserSession(t *testing.T) {
	redis := tests.Init(t)
	gc, _ := gin.CreateTestContext(httptest.NewRecorder())

	id := "123456"

	token, err := CreateUserSession(gc, redis, "123456")

	if err != nil {
		t.Fatal("error with creating user session: ", err)
	}

	existing, err := redis.Do("SISMEMBER", "session:"+id, token)

	if err != nil {
		t.Fatal("error checking if redis session key exists: ", err)
	}

	// Check to make sure our redis key exists in session
	assert.NotEqual(t, existing, 0)

	t.Cleanup(func() {

	})
}
