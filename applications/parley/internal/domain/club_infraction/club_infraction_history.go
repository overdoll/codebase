package club_infraction

import (
	"errors"
	"overdoll/applications/parley/internal/domain/rule"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubInfractionHistory struct {
	*paging.Node

	id                   string
	clubId               string
	issuerAccountId      string
	source               ClubInfractionHistorySource
	ruleId               string
	issuedAt             time.Time
	expiresAt            time.Time
	clubSuspensionLength int64
}

var (
	LengthPeriodSuspensions = []int64{0, 1, 3, 5, 7}
)

var (
	ErrClubInfractionHistoryNotFound = errors.New("club infraction not found")
)

func newClubInfraction(requester *principal.Principal, source ClubInfractionHistorySource, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, ruleInstance *rule.Rule, customLength time.Time) (*ClubInfractionHistory, error) {

	if ruleInstance.Deprecated() {
		return nil, rule.ErrRuleDeprecated
	}

	if !(requester.IsStaff() || requester.IsModerator()) {
		return nil, principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	var activeInfractions []*ClubInfractionHistory

	// Only get infraction if not expired yet (so we can add to the next infraction)
	for _, pastInfraction := range pastClubInfractionHistory {
		// if infraction has not expired yet, add it to our list
		if pastInfraction.ExpiresAt().After(time.Now()) {
			activeInfractions = append(activeInfractions, pastInfraction)
		}
	}

	// This will be the club's last ban (this one locks club indefinitely)
	if len(activeInfractions)+1 > len(LengthPeriodSuspensions) {
		return &ClubInfractionHistory{
			id:                   ksuid.New().String(),
			clubId:               clubId,
			ruleId:               ruleInstance.ID(),
			source:               source,
			issuedAt:             time.Now(),
			expiresAt:            time.Now(),
			issuerAccountId:      requester.AccountId(),
			clubSuspensionLength: -1,
		}, nil
	}

	index := 0

	if len(activeInfractions) > 0 {
		index = len(activeInfractions) - 1
	}

	banPeriod := LengthPeriodSuspensions[index]

	// Expiration is 4x the ban length
	expiration := time.Now().Add(time.Hour * 24 * time.Duration(banPeriod))
	// club is locked /4 of expiration
	clubSuspensionLength := time.Now().Add(time.Hour * 24 * time.Duration(banPeriod)).Unix()
	return &ClubInfractionHistory{
		id:                   ksuid.New().String(),
		clubId:               clubId,
		issuerAccountId:      requester.AccountId(),
		ruleId:               ruleInstance.ID(),
		source:               source,
		issuedAt:             time.Now(),
		expiresAt:            expiration,
		clubSuspensionLength: clubSuspensionLength,
	}, nil
}

func IssueClubInfractionHistoryManual(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, rule *rule.Rule) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourceManual, clubId, pastClubInfractionHistory, rule, time.Time{})
}

func IssueClubInfractionHistoryManualWithCustomLength(requester *principal.Principal, clubId string, rule *rule.Rule, until time.Time) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourceManual, clubId, nil, rule, until)
}

func IssueClubInfractionHistoryFromPostModeration(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, rule *rule.Rule) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourcePostModerationRejection, clubId, pastClubInfractionHistory, rule, time.Time{})
}

func IssueClubInfractionHistoryFromPostManualRemoval(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, rule *rule.Rule) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourcePostManualRemoval, clubId, pastClubInfractionHistory, rule, time.Time{})
}

func (m *ClubInfractionHistory) ID() string {
	return m.id
}

func (m *ClubInfractionHistory) ClubId() string {
	return m.clubId
}

func (m *ClubInfractionHistory) IssuerAccountId() string {
	return m.issuerAccountId
}

func (m *ClubInfractionHistory) Source() ClubInfractionHistorySource {
	return m.source
}

func (m *ClubInfractionHistory) ClubSuspensionLength() int64 {
	return m.clubSuspensionLength
}

func (m *ClubInfractionHistory) RuleId() string {
	return m.ruleId
}

func (m *ClubInfractionHistory) IssuedAt() time.Time {
	return m.issuedAt
}

func (m *ClubInfractionHistory) ExpiresAt() time.Time {
	return m.expiresAt
}

func (m *ClubInfractionHistory) CanView(requester *principal.Principal) error {
	return CanViewClubInfractionHistory(requester)
}

func (m *ClubInfractionHistory) CanDelete(requester *principal.Principal) error {
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func UnmarshalClubInfractionHistoryFromDatabase(id, clubId, issuerAccountId, source, ruleId string, issuedAt, expiresAt time.Time, clubSuspensionLength int64) *ClubInfractionHistory {
	st, _ := ClubInfractionHistorySourceFromString(source)
	return &ClubInfractionHistory{
		id:                   id,
		clubId:               clubId,
		issuerAccountId:      issuerAccountId,
		source:               st,
		ruleId:               ruleId,
		issuedAt:             issuedAt,
		expiresAt:            expiresAt,
		clubSuspensionLength: clubSuspensionLength,
	}
}

func CanViewClubInfractionHistory(requester *principal.Principal) error {

	//if !(requester.IsModerator() || requester.IsStaff()) {
	//	return principal.ErrNotAuthorized
	//}

	// TODO: get permission for club before checking this

	return nil
}
