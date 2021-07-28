package account

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

func (c *Username) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	return nil
}

func CanViewUsernamesForAccount(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
