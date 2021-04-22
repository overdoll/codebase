package adapters

import (
	"testing"
)

func newUserRepository(t *testing.T) UserRepository {
	userRepo := NewUserRepository(session)

}