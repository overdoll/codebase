package club

import (
	"errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

const (
	maxAccountClubMembershipLimit = 500
)

var (
	ErrAccountMemberTooManyClubs = errors.New("account is member of too many clubs")
	ErrClubMemberNotFound        = errors.New("club member not found")
)

type Member struct {
	*paging.Node

	accountId string
	clubId    string
	joinedAt  time.Time
}

func NewMember(acc *principal.Principal, club *Club, currentClubIds []*Member) (*Member, error) {

	res, err := IsAccountClubMembershipReached(acc, acc.AccountId(), currentClubIds)

	if err != nil {
		return nil, err
	}

	if res {
		return nil, ErrAccountMemberTooManyClubs
	}

	return &Member{
		accountId: acc.AccountId(),
		clubId:    club.ID(),
		joinedAt:  time.Now(),
	}, nil
}

func UnmarshalMemberFromDatabase(accountId, clubId string, joinedAt time.Time) *Member {
	return &Member{
		accountId: accountId,
		clubId:    clubId,
		joinedAt:  joinedAt,
	}
}

func (m *Member) AccountId() string {
	return m.accountId
}

func (m *Member) ClubId() string {
	return m.clubId
}

func (m *Member) JoinedAt() time.Time {
	return m.joinedAt
}

func IsAccountClubMembershipReached(requester *principal.Principal, accountId string, currentClubIds []*Member) (bool, error) {

	lim, err := ViewAccountClubMembershipsLimit(requester, accountId)

	if err != nil {
		return false, err
	}

	if len(currentClubIds) >= lim {
		return true, nil
	}

	return false, nil
}

func ViewAccountClubMembershipsLimit(requester *principal.Principal, accountId string) (int, error) {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	return maxAccountClubMembershipLimit, nil
}

func CanViewAccountClubMemberships(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
