package account

import (
	"overdoll/libraries/paging"
)

type Username struct {
	*paging.Node
	username  string
	accountId string
}

func UnmarshalUsernameFromDatabase(username, accountId string) *Username {
	return &Username{
		username:  username,
		accountId: accountId,
	}
}

func (c *Username) Username() string {
	return c.username
}

func (c *Username) AccountId() string {
	return c.accountId
}
