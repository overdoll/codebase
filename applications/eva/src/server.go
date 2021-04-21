package src

import (
	"context"
	"fmt"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/adapters/cassandra"
	cookie2 "overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

type Server struct {
	db cassandra.Repository
}

func CreateServer(db cassandra.Repository) *Server {
	return &Server{
		db: db,
	}
}

func UserRoleToString(roles []user.UserRole) []string {
	var n []string

	for _, role := range roles {
		n = append(n, string(role))
	}

	return n
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	u, err := ksuid.Parse(request.Id)

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("uuid is not valid: %s", request.Id))
	}

	usr, err := s.db.GetUserById(ctx, u)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get user: %s", err))
	}

	return &eva.User{Username: usr.Username, Id: usr.Id.String(), Roles: UserRoleToString(usr.Roles), Verified: usr.Verified}, nil
}

func (s *Server) RegisterUser(ctx context.Context, request *eva.RegisterUserRequest) (*eva.User, error) {

	instance, err := user.NewUser(ksuid.New(), request.Username, request.Email)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to create user: %s", err))
	}

	usr, err := s.db.CreateUser(ctx, instance)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to register user: %s", err))
	}

	return &eva.User{Username: usr.Username, Id: usr.Id.String(), Roles: UserRoleToString(usr.Roles), Verified: usr.Verified}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *eva.GetRegisteredEmailRequest) (*eva.User, error) {

	usr, err := s.db.GetUserByEmail(ctx, request.Email)

	if err != nil {
		// If we get an error here, it's assumed that the user doesn't exist for this email
		return &eva.User{Username: "", Id: ""}, nil
	}

	return &eva.User{Username: usr.Username, Id: usr.Id.String(), Roles: UserRoleToString(usr.Roles), Verified: usr.Verified}, nil
}

func (s *Server) DeleteAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.DeleteAuthenticationCookieResponse, error) {
	u, err := ksuid.Parse(request.Cookie)

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("uuid is not valid: %s", request.Cookie))
	}

	err = s.db.DeleteCookieById(ctx, u)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to delete cookie: %s", err))
	}

	return &eva.DeleteAuthenticationCookieResponse{Success: "true"}, nil
}

func (s *Server) GetAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	u, err := ksuid.Parse(request.Cookie)

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("uuid is not valid: %s", request.Cookie))
	}

	cookie, err := s.db.GetCookieById(ctx, u)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get cookie: %s", err))
	}

	return &eva.AuthenticationCookie{
		Email:      cookie.Email,
		Redeemed:   cookie.Redeemed != 0,
		Expiration: cookie.Expiration.String(),
		Cookie:     cookie.Cookie.String(),
		Session:    cookie.Session,
	}, nil
}

func (s *Server) CreateAuthenticationCookie(ctx context.Context, request *eva.CreateAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {

	ck, err := cookie2.NewCookie(ksuid.New(), request.Email, time.Time{})

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to create cookie: %s", err))
	}

	ck.SetSession(request.Session)

	authCookie, err := s.db.CreateCookie(ctx, ck)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to insert cookie: %s", err))
	}

	return &eva.AuthenticationCookie{
		Email:      authCookie.Email,
		Redeemed:   authCookie.Redeemed != 0,
		Expiration: authCookie.Expiration.String(),
		Cookie:     authCookie.Cookie.String(),
		Session:    authCookie.Session,
	}, nil
}

func (s *Server) RedeemAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	u, err := ksuid.Parse(request.Cookie)

	if err != nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("uuid is not valid: %s", request.Cookie))
	}

	cookie, err := s.db.GetCookieById(ctx, u)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get cookie: %s", err))
	}

	i, err := cookie2.NewCookie(u, cookie.Email, cookie.Expiration)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to set cookie: %s", err))
	}

	err = s.db.UpdateCookieRedeemed(ctx, i)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to redeem cookie: %s", err))
	}

	return &eva.AuthenticationCookie{
		Cookie:     cookie.Cookie.String(),
		Redeemed:   true,
		Expiration: cookie.Expiration.String(),
		Email:      cookie.Email,
		Session:    cookie.Session,
	}, nil
}
