// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

type AuthListener struct {
	SameSession bool    `json:"sameSession"`
	Cookie      *Cookie `json:"cookie"`
}

type Authentication struct {
	Cookie *Cookie `json:"cookie"`
	User   *User   `json:"user"`
}

type AuthenticationInput struct {
	Email string `json:"email"`
}

type Cookie struct {
	SameSession bool   `json:"sameSession"`
	Registered  bool   `json:"registered"`
	Redeemed    bool   `json:"redeemed"`
	Session     string `json:"session"`
	Email       string `json:"email"`
	Invalid     bool   `json:"invalid"`
}

type RegisterInput struct {
	Username string `json:"username"`
}

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}

func (User) IsEntity() {}
