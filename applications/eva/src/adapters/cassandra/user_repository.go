package cassandra

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

type User struct {
	Id       ksuid.UUID      `db:"id"`
	Username string          `db:"username"`
	Email    string          `db:"email"`
	Roles    []user.UserRole `db:"roles"`
	Verified bool            `db:"verified"`
	Avatar   string          `db:"avatar"`
}

type UserUsername struct {
	Id       ksuid.UUID `db:"user_id"`
	Username string     `db:"username"`
}

type UserEmail struct {
	UserId ksuid.UUID `db:"user_id"`
	Email  string     `db:"email"`
}

// GetUserById - Get user using the ID
func (r Repository) GetUserById(ctx context.Context, id ksuid.UUID) (*User, error) {
	userInstance := &User{
		Id: id,
	}

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(r.session).
		BindStruct(userInstance)

	if err := queryUser.Get(&userInstance); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return userInstance, nil
}

// GetUserByEmail - Get user using the email
func (r Repository) GetUserByEmail(ctx context.Context, email string) (*User, error) {

	// get authentication cookie with this ID
	userEmail := UserEmail{
		Email: email,
	}

	// check if email is in use
	queryEmail := qb.Select("users_emails").
		Where(qb.Eq("email")).
		Query(r.session).
		BindStruct(userEmail)

	if err := queryEmail.Get(&userEmail); err != nil {
		return nil, err
	}

	// Get our user using the User Id, from the user email instance
	usr, err := r.GetUserById(ctx, userEmail.UserId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// CreateUser - Ensure we create a unique user by using lightweight transactions
func (r Repository) CreateUser(ctx context.Context, instance *user.User) (*User, error) {

	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it
	usernameEmail := UserUsername{
		Id: instance.ID(),
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(instance.Username()),
	}

	insertUserEmail := qb.Insert("users_usernames").
		Columns("user_id", "username").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(usernameEmail)

	applied, err := insertUserEmail.ExecCAS()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return nil, fmt.Errorf("ExecCAS() failed: '%s", err)
	}

	if !applied {
		return nil, fmt.Errorf("username is not unique")
	}

	// At this point, we know our username is unique & captured, so we
	// now do our insert, but this time with the email
	// note: we don't do a unique check for the email first because if they're on this stage, we already
	// did the check earlier if an account exists with this specific email. however, we will still
	// do a rollback & deletion of the username if the email is already taken, just in case
	userEmail := UserEmail{
		Email:  instance.Email(),
		UserId: instance.ID(),
	}

	// Create a lookup table that will lookup the user using email
	createUserEmail := qb.Insert("users_emails").
		Columns("email", "user_id").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	applied, err = createUserEmail.ExecCAS()

	if err != nil || !applied {

		// There was an error or something, so we want to gracefully recover.
		// Delete our users_usernames entry just in case, so user can try to signup again
		deleteUserUsername := qb.Delete("users_usernames").
			Where(qb.Eq("username")).
			Query(r.session).
			BindStruct(usernameEmail)

		if err := deleteUserUsername.ExecRelease(); err != nil {
			return nil, fmt.Errorf("delete() failed: '%s", err)
		}

		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	usr := &User{
		Username: instance.Username(),
		Id:       userEmail.UserId,
		Email:    userEmail.Email,
		Verified: false,
	}

	insertUser := qb.Insert("users").
		Columns("username", "id", "email").
		Unique().
		Query(r.session).
		BindStruct(usr)

	if err := insertUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return usr, nil
}
