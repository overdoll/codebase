package adapters

import (
	"context"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
	"overdoll/libraries/testing/scylla"
)

func TestUserRepository_GetUser_not_exists(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	id := ksuid.New()

	usr, err := repo.GetUserById(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, user.NotFoundError{Identifier: id.String()}.Error())
}

func TestUserRepository_GetUser_email_exists(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	// Create fake user
	usr := newFakeUser(t)

	err := repo.CreateUser(ctx, usr)

	require.NoError(t, err)

	// Attempt to find user by email
	findUser, err := repo.GetUserByEmail(ctx, usr.Email())

	require.NoError(t, err)

	// expect that we found our user
	assert.Equal(t, findUser.ID(), usr.ID())
}

func TestUserRepository_CreateUser_conflicting_username(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	// Create fake user
	usr := newFakeUser(t)

	err := repo.CreateUser(ctx, usr)

	require.NoError(t, err)

	// Create another user, with the same username but different email
	copyUsr, err := user.NewUser(ksuid.New(), usr.Username(), "test-email@test.com")

	require.NoError(t, err)

	err = repo.CreateUser(ctx, copyUsr)

	// expect that we get an error that the username isnt unique
	assert.Equal(t, err, user.ErrUsernameNotUnique)
}

func TestUserRepository_CreateUser_conflicting_email(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	// Create fake user
	usr := newFakeUser(t)

	err := repo.CreateUser(ctx, usr)

	require.NoError(t, err)

	// Create another user, with the same email but different username
	copyUsr, err := user.NewUser(ksuid.New(), "ghahah", usr.Email())

	require.NoError(t, err)

	err = repo.CreateUser(ctx, copyUsr)

	// expect that we get an error that the email isn't unique
	assert.Equal(t, err, user.ErrEmailNotUnique)
}

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

func newFakeUser(t *testing.T) *user.User {
	fake := TestUser{}

	err := faker.FakeData(&fake)

	if err != nil {
		t.Fatal("error generating fake data: ", err)
	}

	usr, err := user.NewUser(ksuid.New(), fake.Username, fake.Email)

	require.NoError(t, err)

	return usr
}

func newUserRepository(t *testing.T) UserRepository {
	session := scylla.CreateScyllaSession(t, "eva")

	return NewUserRepository(session)
}
