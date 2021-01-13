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

	userEmail := models.UserEmail{
		Email:    request.Email,
		UserId:   gocql.TimeUUID(),
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(request.Username),
	}

	// First, we do a unique insert into users_emails
	// This ensures that we capture this email & username so nobody can use it
	insertUserEmail := qb.Insert("users_emails").
		Columns("email", "username", "user_id").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	// TODO: should error out if user already exists (it doesn't)
	if err := insertUserEmail.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	user := models.User{
		Username: request.Username,
		Id: userEmail.UserId,
	}

	// Now, we actually register the user to our main users table, and set any attributes
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
