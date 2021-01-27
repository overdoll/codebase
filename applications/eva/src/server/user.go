package server

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/eva/src/models"
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

	// First, we do a unique insert into registered_usernames_emails
	// This ensures that we capture this email & username so nobody can use it
	usernameEmail := models.RegisteredUsernameEmail{
		Email:    request.Email,
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(request.Username),
	}

	insertUserEmail := qb.Insert("registered_usernames_emails").
		Columns("email", "username").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(usernameEmail)

	applied, err := insertUserEmail.ExecCAS()

	// Do our checks to make sure we got a unique username+email combo
	if err != nil {
		return nil, fmt.Errorf("ExecCAS() failed: '%s", err)
	}

	if !applied {
		return nil, fmt.Errorf("username or email is not unique")
	}

	// At this point, we know all of our entries will be unique (due to the above transaction), so we
	// do our inserts
	userEmail := models.UserEmail{
		Email:    request.Email,
		UserId:   gocql.TimeUUID(),
	}

	// Create a lookup table that will lookup the user using the ID
	createUserEmail := qb.Insert("users_emails").
		Columns("email", "user_id").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	if err := createUserEmail.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	user := models.User{
		Username: request.Username,
		Id: userEmail.UserId,
	}

	insertUser := qb.Insert("users").
		Columns("username", "id").
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
