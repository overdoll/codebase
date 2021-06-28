package account_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/uuid"
)

func TestAccount_creates_properly(t *testing.T) {
	t.Parallel()

	roles := []string{"test-role", "test-role-2"}
	email := "test-email@test-email.com"
	avatar := "test-avatar"

	ck := account.UnmarshalAccountFromDatabase(uuid.New().String(), "test-username", email, roles, false, avatar, false, 0, "")

	assert.Equal(t, ck.RolesAsString(), roles)
	assert.Equal(t, ck.Email(), email)
	assert.Equal(t, ck.Avatar(), "/avatars/"+avatar)
}
