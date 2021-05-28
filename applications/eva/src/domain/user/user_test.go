package user_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

func TestUser_creates_properly(t *testing.T) {
	t.Parallel()

	roles := []string{"test-role", "test-role-2"}
	email := "test-email@test-email.com"
	avatar := "test-avatar"

	ck := user.UnmarshalUserFromDatabase(ksuid.New().String(), "test-username", email, roles, false, avatar)

	assert.Equal(t, ck.UserRolesAsString(), roles)
	assert.Equal(t, ck.Email(), email)
	assert.Equal(t, ck.Avatar(), "/avatars/"+avatar)
}
