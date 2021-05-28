package adapters_test

import (
	"context"
	"sync"
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
	"overdoll/libraries/tests"
)

func TestUserRepository_GetUser_not_exists(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	id := ksuid.New().String()

	usr, err := repo.GetUserById(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, user.ErrUserNotFound.Error())
}

func TestUserRepository_GetUserByEmail_not_exists(t *testing.T) {
	t.Parallel()

	repo := newUserRepository(t)
	ctx := context.Background()

	usr, err := repo.GetUserByEmail(ctx, "some-random-non-existent-email")

	assert.Nil(t, usr)
	assert.EqualError(t, err, user.ErrUserNotFound.Error())
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
	copyUsr, err := user.NewUser(ksuid.New().String(), usr.Username(), "test-email@test.com")

	require.NoError(t, err)

	err = repo.CreateUser(ctx, copyUsr)

	// expect that we get an error that the username isn't unique
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
	copyUsr, err := user.NewUser(ksuid.New().String(), "ghahah", usr.Email())

	require.NoError(t, err)

	err = repo.CreateUser(ctx, copyUsr)

	// expect that we get an error that the email isn't unique
	assert.Equal(t, err, user.ErrEmailNotUnique)
}

// A parallel execution that will run 20 instances of trying to create the same user, so we expect that only 1 will be created
func TestUserRepository_CreateUser_parallel(t *testing.T) {
	t.Parallel()

	workersCount := 20
	workersDone := sync.WaitGroup{}
	workersDone.Add(workersCount)

	repo := newUserRepository(t)

	// closing startWorkers will unblock all workers at once,
	// thanks to that it will be more likely to have race condition
	startWorkers := make(chan struct{})
	// if user was successfully created, number of the worker is sent to this channel
	usersCreated := make(chan int, workersCount)

	ctx := context.Background()

	// Create fake user
	usr := newFakeUser(t)

	// we are trying to do race condition, in practice only one worker should be able to finish transaction
	for worker := 0; worker < workersCount; worker++ {
		workerNum := worker

		go func() {
			defer workersDone.Done()
			<-startWorkers

			err := repo.CreateUser(ctx, usr)

			if err == nil {
				// user is only created when an error is not returned
				usersCreated <- workerNum
			}
		}()
	}

	close(startWorkers)

	// we are waiting, when all workers did the job
	workersDone.Wait()
	close(usersCreated)

	var workersCreatedUsers []int

	for workerNum := range usersCreated {
		workersCreatedUsers = append(workersCreatedUsers, workerNum)
	}

	assert.Len(t, workersCreatedUsers, 1, "only one worker should create a user")
}

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

func newFakeUser(t *testing.T) *user.User {
	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	usr, err := user.NewUser(ksuid.New().String(), fake.Username, fake.Email)

	require.NoError(t, err)

	return usr
}

func newUserRepository(t *testing.T) adapters.UserRepository {
	session := tests.CreateScyllaSession(t, "eva")

	return adapters.NewUserCassandraRepository(session)
}
