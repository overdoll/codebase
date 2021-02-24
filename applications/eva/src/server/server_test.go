package server

import (
	"context"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/bmizerany/assert"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"
	"overdoll/libraries/testing/scylla"
)

// Init - Create a database session to use for testing, and create a keyspace
func Init(t *testing.T) (gocqlx.Session, context.Context, *Server) {
	session := scylla.CreateScyllaSession(t, os.Getenv("SCYLLA_DATABASE"), "eva")

	ctx := context.Background()

	srv, err := NewServer(ctx, session)

	if err != nil {
		t.Fatal("server error: ", err)
	}

	err = session.ExecStmt(`CREATE KEYSPACE IF NOT EXISTS eva WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`)

	if err != nil {
		t.Fatal("create keyspace:", err)
	}

	return session, ctx, srv
}

// TestRegisterUser_Accepted - Test user registration with a valid email & username
func TestRegisterUser_Accepted(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	email := "test1@test.com"
	username := "IAmUser1"

	response, err := server.RegisterUser(ctx, &eva.RegisterUserRequest{
		Email:    email,
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
		Email:    "test2@test.com",
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
		Email:  email,
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
		Email:    email,
		Username: "IAmUser3",
	})

	// We should have received an error, since the email is already in-use
	assert.NotEqual(t, err, nil)
}

// TestDeleteAuthenticationCookie_Exists - Delete an authentication cookie when one already exists
func TestDeleteAuthenticationCookie_Exists(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	uuid := gocql.TimeUUID()

	// Seed a value into authentication_cookies that will be deleted
	insertCookie := qb.
		Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration", "session").
		Query(session)

	insertCookie.BindStruct(models.AuthenticationCookie{
		Cookie:     uuid,
		Email:      "test@test.com",
		Redeemed:   0,
		Expiration: time.Now().Add(time.Minute * 5),
		Session:    "",
	})

	if err := insertCookie.ExecRelease(); err != nil {
		t.Fatal("ExecRelease() failed:", err)
	}

	response, err := server.DeleteAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{
		Cookie: uuid.String(),
	})

	if err != nil {
		t.Fatal("delete authentication cookie error: ", err)
	}

	// Cookie was successfully deleted
	assert.Equal(t, response, &eva.DeleteAuthenticationCookieResponse{Success: "true"})
}

// TestCreateNewAuthenticationCookie_New - Create a new authentication cookie
func TestCreateNewAuthenticationCookie_New(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	email := "tester@tester.com"
	userSession := "{}"

	response, err := server.CreateAuthenticationCookie(ctx, &eva.CreateAuthenticationCookieRequest{
		Email:   email,
		Session: userSession,
	})

	if err != nil {
		t.Fatal("create authentication cookie error: ", err)
	}

	// Cookie was successfully created
	assert.Equal(t, response, &eva.AuthenticationCookie{
		Email:      email,
		Session:    userSession,
		Redeemed:   false,
		Cookie:     response.Cookie,
		Expiration: response.Expiration,
	})
}

// TestRedeemAuthenticationCookie_Not_Expired - Test redeeming a non-expired cookie
func TestRedeemAuthenticationCookie_Not_Expired(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	uuid := gocql.TimeUUID()

	// Seed a value into authentication_cookies that will be redeemed
	insertCookie := qb.
		Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration", "session").
		Query(session)

	insertCookie.BindStruct(models.AuthenticationCookie{
		Cookie:     uuid,
		Email:      "test@test.com",
		Redeemed:   0,
		Expiration: time.Now().Add(time.Minute * 5),
		Session:    "",
	})

	if err := insertCookie.ExecRelease(); err != nil {
		t.Fatal("ExecRelease() failed:", err)
	}

	response, err := server.RedeemAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{
		Cookie: uuid.String(),
	})

	if err != nil {
		t.Fatal("redeem authentication cookie error: ", err)
	}

	// Cookie was successfully redeemed
	assert.Equal(t, response, &eva.AuthenticationCookie{
		Email:      response.Email,
		Session:    response.Session,
		Redeemed:   true,
		Cookie:     response.Cookie,
		Expiration: response.Expiration,
	})
}

// TestRedeemAuthenticationCookie_Expired - Test attempting to redeem an expired authentication cookie
func TestRedeemAuthenticationCookie_Expired(t *testing.T) {
	session, ctx, server := Init(t)

	defer session.Close()

	uuid := gocql.TimeUUID()

	// Seed a value into authentication_cookies that will be redeemed
	insertCookie := qb.
		Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration", "session").
		Query(session)

	insertCookie.BindStruct(models.AuthenticationCookie{
		Cookie:     gocql.TimeUUID(),
		Email:      "test@test.com",
		Redeemed:   0,
		Expiration: time.Now().Add(-time.Minute * 5),
		Session:    "",
	})

	if err := insertCookie.ExecRelease(); err != nil {
		t.Fatal("ExecRelease() failed:", err)
	}

	_, err := server.RedeemAuthenticationCookie(ctx, &eva.GetAuthenticationCookieRequest{
		Cookie: uuid.String(),
	})

	// We should have received an error for redeeming an expired auth cookie
	assert.NotEqual(t, err, nil)
}
