package server

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	evav1 "project01101000/codebase/applications/eva/proto"
)

func (s *Server) GetUser(ctx context.Context, request *evav1.GetUserRequest) (*evav1.User, error) {
	if request == nil || request.Username == "" {
		return nil, fmt.Errorf("username is not provided")
	}

	queryUser := qb.Select("users").Where(qb.Eq("username")).Columns("username").Query(s.session)

	// get user with this username
	user := User{
		Username: request.Username,
	}

	queryUser.BindStruct(user)

	var userItem *User

	if err := queryUser.Select(&userItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &evav1.User{Username: userItem.Username}, nil

}

func (s *Server) RegisterUser(ctx context.Context, request *evav1.RegisterUserRequest) (*evav1.RegisterUserResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	if request.Username == "" {
		return nil, fmt.Errorf("username is not provided")
	}

	userEmail := UserEmail{
		Email:    request.Email,
		Username: request.Username,
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
	}

	// Now, we actually register the user to our main users table, and set any attributes
	insertUser := qb.Insert("users").Columns("user").Unique().Query(s.session).BindStruct(user)

	if err := insertUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return &evav1.RegisterUserResponse{Username: request.Username, Email: request.Email}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *evav1.GetRegisteredEmailRequest) (*evav1.GetRegisteredEmailResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	// Check for registered user with this email
	resource := RegisteredUser{
		Email: request.Email,
	}

	// check if email is in use
	queryEmail := qb.
		Select("users_emails").
		Columns("email", "username").
		Where(qb.Eq("email")).
		Query(s.session).
		BindStruct(resource)

	var registeredItem *RegisteredUser

	if err := queryEmail.Select(&registeredItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &evav1.GetRegisteredEmailResponse{Username: registeredItem.Username}, nil

}
