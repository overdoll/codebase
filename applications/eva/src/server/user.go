package server

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	evav1 "project01101000/codebase/applications/eva/proto"
)

func (s *Server) GetUser(ctx context.Context, request *evav1.GetUserRequest) (*evav1.User, error) {

	u, err := gocql.ParseUUID(request.Id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	users := User{
		Id: u,
	}

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(users)

	var userItem User

	if err := queryUser.Get(&userItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &evav1.User{Username: userItem.Username}, nil
}

func (s *Server) RegisterUser(ctx context.Context, request *evav1.RegisterUserRequest) (*evav1.User, error) {

	userEmail := UserEmail{
		Email:    request.Email,
		UserId:   gocql.TimeUUID(),
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(request.Username),
	}

	// First, we do a unique insert into users_emails
	// This ensures that we capture this email so nobody can use it
	insertUserEmail := qb.Insert("users_emails").
		Columns("email", "username").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	if err := insertUserEmail.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	user := User{
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

	return &evav1.User{Username: request.Username, Id: user.Id.String()}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *evav1.GetRegisteredEmailRequest) (*evav1.User, error) {

	// get authentication cookie with this ID
	userEmail := UserEmail{
		Email: request.Email,
	}

	// check if email is in use
	queryEmail := qb.Select("users_emails").
		Where(qb.Eq("email")).
		Query(s.session).
		BindStruct(userEmail)

	var registeredItem UserEmail

	if err := queryEmail.Get(&registeredItem); err != nil {
		return &evav1.User{Username: "", Id: ""}, nil
	}

	// Get our user using the User Id
	user, err := s.GetUser(ctx, &evav1.GetUserRequest{Id: registeredItem.UserId.String()})

	if err != nil {
		return nil, err
	}

	return user, nil

}
