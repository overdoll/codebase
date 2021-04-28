package session

import (
	"errors"
	"time"

	"overdoll/applications/eva/src/domain/user"
)

type Session struct {
	identifier string
	token      string
}

func (s *Session) Identifier() string {
	return s.identifier
}

func (s *Session) Token() string {
	return s.token
}

func NewSessionFromToken(token string) (*Session, error) {

	jwtService := JWTAuthService()

	// Verify JWT token
	jwtToken, err := jwtService.ValidateToken(token)

	if err != nil || jwtToken == nil {
		return nil, errors.New("token not valid")
	}

	claims := jwtToken.Claims.(*AuthCustomClaims)

	return &Session{token: token, identifier: claims.Id}, nil
}

func NewSession(user *user.User) (*Session, error) {

	jwtService := JWTAuthService()

	expiration := time.Now().Add(time.Hour * 120)

	token := jwtService.GenerateToken(user.ID(), expiration.Unix())

	return &Session{
		token:      token,
		identifier: user.ID(),
	}, nil
}
