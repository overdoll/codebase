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

	accountId      string
	isSupporter    bool
	clubId         string
	joinedAt       time.Time
	supporterSince *time.Time
}

func NewMemberOperator(accountId, clubId string) (*Member, error) {
	return &Member{
		accountId: accountId,
		clubId:    clubId,
		joinedAt:  time.Now(),
	}, nil
}

func NewMember(requester *principal.Principal, club *Club, currentClubIds []*Member) (*Member, error) {

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	if club.ownerAccountId == requester.AccountId() {
		return nil, errors.New("owner cannot become member of own club")
	}

	res, err := IsAccountClubMembershipReached(requester, requester.AccountId(), currentClubIds)

	if err != nil {
		return nil, err
	}

	if res {
		return nil, ErrAccountMemberTooManyClubs
	}

	return &Member{
		accountId: requester.AccountId(),
		clubId:    club.ID(),
		joinedAt:  time.Now(),
	}, nil
}

func UnmarshalMemberFromDatabase(accountId, clubId string, joinedAt time.Time, isSupporter bool, supporterSince *time.Time) *Member {
	return &Member{
		accountId:      accountId,
		clubId:         clubId,
		joinedAt:       joinedAt,
		isSupporter:    isSupporter,
		supporterSince: supporterSince,
	}
}

func (m *Member) AccountId() string {
	return m.accountId
}

func (m *Member) ClubId() string {
	return m.clubId
}

func (m *Member) IsSupporter() bool {
	return m.isSupporter
}

func (m *Member) SupporterSince() *time.Time {
	return m.supporterSince
}

func (m *Member) JoinedAt() time.Time {
	return m.joinedAt
}

func (m *Member) MakeSupporter(time time.Time) error {
	m.isSupporter = true
	m.supporterSince = &time
	return nil
}

func (m *Member) UnMakeSupporter() error {
	m.isSupporter = false
	m.supporterSince = nil
	return nil
}

func (m *Member) CanRevokeClubMembership(requester *principal.Principal, club *Club) error {

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	if err := requester.BelongsToAccount(m.accountId); err != nil {
		return err
	}

	if m.accountId == club.ownerAccountId {
		return errors.New("club owner cannot leave club")
	}

	if m.isSupporter {
		return errors.New("cannot leave club while supporter. cancel subscription and wait until supporter benefits expire")
	}

	return nil
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
