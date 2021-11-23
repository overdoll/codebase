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
	current   bool
}

var (
	ErrMaxUsernamesLimitReached = errors.New("reached maximum usernames limit. delete a username to add more")
)

const (
	MaxUsernamesLimit = 5
)

func UnmarshalUsernameFromDatabase(username, accountId string, current bool) *Username {
	return &Username{
		username:  username,
		accountId: accountId,
		current:   current,
	}
}

func (c *Username) Username() string {
	return c.username
}

func (c *Username) AccountId() string {
	return c.accountId
}

func (c *Username) IsCurrent() bool {
	return c.current
}

func (c *Username) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	return nil
}

func ViewUsernamesLimit(requester *principal.Principal, accountId string) (int, error) {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	return MaxUsernamesLimit, nil
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

			if em.IsCurrent() {
				return errors.New("cannot delete username that is your current one")
			}

			break
		}
	}

	if !foundUsername {
		return errors.New("username does not belong to account")
	}

	return nil
}
