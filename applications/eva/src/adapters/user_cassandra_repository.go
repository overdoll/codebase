package adapters

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/user"
)

type User struct {
	Id          string    `db:"id"`
	Username    string    `db:"username"`
	Email       string    `db:"email"`
	Roles       []string  `db:"roles"`
	Verified    bool      `db:"verified"`
	Avatar      string    `db:"avatar"`
	LockedUntil time.Time `db:"locked_until"`
}

type UserUsername struct {
	Id       string `db:"user_id"`
	Username string `db:"username"`
}

type UserEmail struct {
	UserId string `db:"user_id"`
	Email  string `db:"email"`
}

type UserRepository struct {
	session gocqlx.Session
}

func NewUserCassandraRepository(session gocqlx.Session) UserRepository {
	return UserRepository{session: session}
}

func marshalUserToDatabase(usr *user.User) *User {

	return &User{
		Id:          usr.ID(),
		Email:       usr.Email(),
		Username:    usr.Username(),
		Roles:       usr.UserRolesAsString(),
		Avatar:      usr.Avatar(),
		Verified:    usr.Verified(),
		LockedUntil: usr.LockedUntil(),
	}
}

// GetUserById - Get user using the ID
func (r UserRepository) GetUserById(ctx context.Context, id string) (*user.User, error) {
	var userInstance User

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalOne).
		BindStruct(&User{
			Id: id,
		})

	if err := queryUser.Get(&userInstance); err != nil {

		if err == gocql.ErrNotFound {
			return nil, user.ErrUserNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return user.UnmarshalUserFromDatabase(
		userInstance.Id,
		userInstance.Username,
		userInstance.Email,
		userInstance.Roles,
		userInstance.Verified,
		userInstance.Avatar,
	), nil
}

// GetUserByEmail - Get user using the email
func (r UserRepository) GetUserByEmail(ctx context.Context, email string) (*user.User, error) {

	// get authentication cookie with this ID
	var userEmail UserEmail

	// check if email is in use
	queryEmail := qb.Select("users_emails").
		Where(qb.Eq("email")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UserEmail{
			Email: email,
		})

	if err := queryEmail.Get(&userEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, user.ErrUserNotFound
		}

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
func (r UserRepository) CreateUser(ctx context.Context, instance *user.User) error {

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
		return fmt.Errorf("ExecCAS() failed: '%s", err)
	}

	if !applied {
		return user.ErrUsernameNotUnique
	}

	email := ""

	// Only add to email table if user is not unclaimed (email is assigned)
	if !instance.IsUnclaimed() {
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
				return fmt.Errorf("delete() failed: '%s", err)
			}

			return user.ErrEmailNotUnique
		}

		email = userEmail.Email
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	usr := &User{
		Username: instance.Username(),
		Id:       instance.ID(),
		Email:    email,
		Verified: false,
	}

	insertUser := qb.Insert("users").
		Columns("username", "id", "email").
		Unique().
		Query(r.session).
		BindStruct(usr)

	if err := insertUser.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r UserRepository) UpdateUser(ctx context.Context, id string, updateFn func(usr *user.User) error) (*user.User, error) {

	currentUser, err := r.GetUserById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentUser)

	if err != nil {
		return nil, err
	}

	// update user
	updateUser := qb.Update("users").
		Set(
			"username",
			"email",
			"roles",
			"verified",
			"locked_until",
			"avatar",
		).
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalUserToDatabase(currentUser))

	if err := updateUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return currentUser, nil
}
