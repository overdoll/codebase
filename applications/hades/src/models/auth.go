package models

type AuthenticatedUser struct {
	Id 	 	 string
	Username string
	Token    string
	Roles    []string
	Verified bool
}

func (user *AuthenticatedUser) IsVerified() bool {
	return user.Verified == true
}