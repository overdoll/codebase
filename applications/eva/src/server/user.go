package server

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"
)

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	u, err := gocql.ParseUUID(request.Id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	users := models.User{
		Id: u,
	}

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(users)

	var userItem models.User

	if err := queryUser.Get(&userItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &eva.User{Username: userItem.Username, Id: userItem.Id.String()}, nil
}

func (s *Server) RegisterUser(ctx context.Context, request *eva.RegisterUserRequest) (*eva.User, error) {

	userId := gocql.TimeUUID()

	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it
	usernameEmail := models.UserUsername{
		Id: userId,
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(request.Username),
	}

	insertUserEmail := qb.Insert("users_usernames").
		Columns("user_id", "username").
		Unique().
		Query(s.session).
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
	userEmail := models.UserEmail{
		Email:  request.Email,
		UserId: userId,
	}

	// Create a lookup table that will lookup the user using email
	createUserEmail := qb.Insert("users_emails").
		Columns("email", "user_id").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	applied, err = createUserEmail.ExecCAS()

	if err != nil || !applied {

		// There was an error or something, so we want to gracefully recover.
		// Delete our users_usernames entry just in case, so user can try to signup again

		deleteUserUsername := qb.Delete("users_usernames").
			Where(qb.Eq("username")).
			Query(s.session).
			BindStruct(usernameEmail)

		if err := deleteUserUsername.ExecRelease(); err != nil {
			return nil, fmt.Errorf("delete() failed: '%s", err)
		}

		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	user := models.User{
		Username: request.Username,
		Id:       userEmail.UserId,
		Email:    userEmail.Email,
	}

	insertUser := qb.Insert("users").
		Columns("username", "id", "email").
		Unique().
		Query(s.session).
		BindStruct(user)

	if err := insertUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return &eva.User{Username: request.Username, Id: user.Id.String()}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *eva.GetRegisteredEmailRequest) (*eva.User, error) {

	// get authentication cookie with this ID
	userEmail := models.UserEmail{
		Email: request.Email,
	}

	// check if email is in use
	queryEmail := qb.Select("users_emails").
		Where(qb.Eq("email")).
		Query(s.session).
		BindStruct(userEmail)

	var registeredItem models.UserEmail

	if err := queryEmail.Get(&registeredItem); err != nil {
		return &eva.User{Username: "", Id: ""}, nil
	}

	// Get our user using the User Id
	user, err := s.GetUser(ctx, &eva.GetUserRequest{Id: registeredItem.UserId.String()})

	if err != nil {
		return nil, err
	}

	return user, nil

}
