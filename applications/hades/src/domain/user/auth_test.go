package user

import (
	"net/http/httptest"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/assert"
	"github.com/gin-gonic/gin"
	"overdoll/applications/hades/__tests__"
)

type TestSession struct {
	Id string `faker:"uuid_digit"`
}

// TestCreateUserSession - Test creating a User session
func TestCreateUserSession(t *testing.T) {
	redis := tests.Init(t)
	gc, _ := gin.CreateTestContext(httptest.NewRecorder())

	session := TestSession{}

	err := faker.FakeData(&session)

	if err != nil {
		t.Fatal("error generating fake data: ", err)
	}

	token, err := CreateUserSession(gc, redis, session.Id)

	if err != nil {
		t.Fatal("error with creating user session: ", err)
	}

	existing, err := redis.Do("SISMEMBER", "session:"+session.Id, token)

	if err != nil {
		t.Fatal("error checking if redis session key exists: ", err)
	}

	// Check to make sure our redis key exists in session
	assert.NotEqual(t, existing, 0)
}
