package account

import (
	"overdoll/libraries/errors/domainerror"
)

var (
	Unknown   = Role{""}
	Staff     = Role{"STAFF"}
	Moderator = Role{"MODERATOR"}
	Artist    = Role{"ARTIST"}
	Worker    = Role{"WORKER"}
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
	case Artist.slug:
		return Artist, nil
	case Worker.slug:
		return Worker, nil
	}

	return Unknown, domainerror.NewValidation("unknown role: " + s)
}
