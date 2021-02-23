package server

import (
	"testing"
	"time"

	"github.com/bmizerany/assert"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"
)

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
		Cookie:   uuid,
		Email:    "test@test.com",
		Redeemed: 0,
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
		Email: email,
		Session: userSession,
	})

	if err != nil {
		t.Fatal("create authentication cookie error: ", err)
	}

	// Cookie was successfully created
	assert.Equal(t, response, &eva.AuthenticationCookie{
		Email: email,
		Session: userSession,
		Redeemed: false,
		Cookie: response.Cookie,
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
		Cookie:   uuid,
		Email:    "test@test.com",
		Redeemed: 0,
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
		Email: response.Email,
		Session: response.Session,
		Redeemed: true,
		Cookie: response.Cookie,
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
		Cookie:   gocql.TimeUUID(),
		Email:    "test@test.com",
		Redeemed: 0,
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