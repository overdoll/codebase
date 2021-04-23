package adapters

import (
	"overdoll/libraries/ksuid"
	"overdoll/libraries/types"
)

type Artist struct {
	Id       ksuid.UUID   `db:"user_id"`
	Username string       `db:"user_username"`
	Avatar   types.Avatar `db:"user_avatar"`
}
