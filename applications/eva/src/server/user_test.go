package server

import (
	"strings"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"
)

// TestRegisterUser_Accepted - Test user registration with a valid email & username
func TestRegisterUser_Accepted(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	email := "test1@test.com"
	username := "IAmUser1"

	response, err := server.RegisterUser(ctx, &eva.RegisterUserRequest{
		Email: email,
		Username: username,
	})

	if err != nil {
		t.Fatal("register user error: ", err)
	}

	assert.Equal(t, response, &eva.User{Username: username, Id: response.Id})
}

// TestRegisterUser_Declined_Username - Test user registration with a failure because the username is taken
func TestRegisterUser_Declined_Username(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	username := "IAmUser2"

	userId := gocql.TimeUUID()

	userUsername := models.UserUsername{
		Id: userId,
		// This table stores usernames as lowercase so we should have it this way
		Username: strings.ToLower(username),
	}

	// First, we insert a username that is already taken
	insertUserUsername := qb.
		Insert("users_usernames").
		Columns("user_id", "username").
		Query(session).
		BindStruct(userUsername)

	if err := insertUserUsername.ExecRelease(); err != nil {
		t.Fatal("ExecRelease() failed:", err)
	}

	// Now, we do the actual insertion
	_, err := server.RegisterUser(ctx, &eva.RegisterUserRequest{
		Email: "test2@test.com",
		Username: username,
	})

	// We should have received an error
	assert.NotEqual(t, err, nil)
}

// TestRegisterUser_Declined_Email - Test user registration with a failure because the email is taken
func TestRegisterUser_Declined_Email(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	email := "test3@test.com"

	userId := gocql.TimeUUID()

	userEmail := models.UserEmail{
		UserId: userId,
		Email: email,
	}

	// First, we insert a username that is already taken
	insertUserEmail := qb.
		Insert("users_emails").
		Columns("user_id", "email").
		Query(session).
		BindStruct(userEmail)

	if err := insertUserEmail.ExecRelease(); err != nil {
		t.Fatal("ExecRelease() failed:", err)
	}

	// Now, we do the actual insertion
	_, err := server.RegisterUser(ctx, &eva.RegisterUserRequest{
		Email: email,
		Username: "IAmUser3",
	})

	// We should have received an error, since the email is already in-use
	assert.NotEqual(t, err, nil)
}