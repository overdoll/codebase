package account

import (
	"errors"
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

func CanDeleteAccountUsername(requester *principal.Principal, accountId string, usernames []*Username, targetUsername string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	foundUsername := false

	for _, em := range usernames {
		if em.Username() == targetUsername {
			foundUsername = true
			break
		}
	}

	if !foundUsername {
		return errors.New("username does not belong to account")
	}

	return nil
}
