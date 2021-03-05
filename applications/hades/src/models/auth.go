package models

type AuthenticatedUser struct {
	Username string
	Token    string
	Roles    []string
	Verified bool
}
