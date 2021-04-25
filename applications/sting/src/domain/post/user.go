package post

import (
	"overdoll/libraries/ksuid"
)

type User struct {
	Id       ksuid.UUID
	Username string
	Avatar   string
	Roles    []string
	Verified bool
}
