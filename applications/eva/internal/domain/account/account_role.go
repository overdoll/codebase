package account

import "errors"

var (
	Unknown   = Role{""}
	Staff     = Role{"staff"}
	Moderator = Role{"moderator"}
)

type Role struct {
	slug string
}

func (r Role) String() string {
	return r.slug
}

func RoleFromString(s string) (Role, error) {
	switch s {
	case Staff.slug:
		return Staff, nil
	case Moderator.slug:
		return Moderator, nil
	}

	return Unknown, errors.New("unknown role: " + s)
}
