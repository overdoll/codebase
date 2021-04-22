package ports

import (
	"context"
	"fmt"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/app"
)

type Server struct {
	app app.Application
}

func CreateServer(application app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	usr, err := s.app.Queries.GetUser.Handle(ctx, request.Id)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get user: %s", err))
	}

	return &eva.User{Username: usr.Username(), Id: usr.ID().String(), Roles: usr.UserRolesAsString(), Verified: usr.Verified()}, nil
}

func (s *Server) RegisterUserFromCookie(ctx context.Context, request *eva.RegisterUserRequest) (*eva.User, error) {

	usr, err := s.app.Commands.RegisterFromCookie.Handle(ctx, request.CookieId, request.Username)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to register user: %s", err))
	}

	return &eva.User{Username: usr.Username(), Id: usr.ID().String(), Roles: usr.UserRolesAsString(), Verified: usr.Verified()}, nil
}

func (s *Server) GetAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {

	cookie, err := s.app.Queries.GetCookie.Handle(ctx, request.Cookie)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get cookie: %s", err))
	}

	return &eva.AuthenticationCookie{
		Email:      cookie.Email(),
		Redeemed:   cookie.Redeemed(),
		Expiration: cookie.Expiration().String(),
		Cookie:     cookie.Cookie().String(),
		Session:    cookie.Session(),
	}, nil
}

func (s *Server) CreateAuthenticationCookie(ctx context.Context, request *eva.CreateAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {

	cookie, err := s.app.Commands.CreateCookie.Handle(ctx, request.Email, request.Session)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to create cookie: %s", err))
	}

	return &eva.AuthenticationCookie{
		Email:      cookie.Email(),
		Redeemed:   cookie.Redeemed(),
		Expiration: cookie.Expiration().String(),
		Cookie:     cookie.Cookie().String(),
		Session:    cookie.Session(),
	}, nil
}

func (s *Server) RedeemAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.RedeemCookieResponse, error) {

	cookie, err := s.app.Commands.RedeemCookie.Handle(ctx, request.Cookie)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to redeem cookie: %s", err))
	}

	return &eva.RedeemCookieResponse{
		Cookie: &eva.AuthenticationCookie{
			Cookie:     cookie.Cookie().String(),
			Redeemed:   cookie.Redeemed(),
			Expiration: cookie.Expiration().String(),
			Email:      cookie.Email(),
			Session:    cookie.Session(),
		},
		Registered: cookie.Redeemed(),
	}, nil
}
