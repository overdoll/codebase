package club_infraction

import (
	"errors"
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
	reason               *ClubInfractionReason
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

func newClubInfraction(requester *principal.Principal, source ClubInfractionHistorySource, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, reason *ClubInfractionReason, customLength time.Time) (*ClubInfractionHistory, error) {

	if !(requester.IsStaff() || requester.IsModerator()) {
		return nil, principal.ErrNotAuthorized
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
			reason:               reason,
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
		reason:               reason,
		source:               source,
		issuedAt:             time.Now(),
		expiresAt:            expiration,
		clubSuspensionLength: clubSuspensionLength,
	}, nil
}

func IssueClubInfractionHistoryManual(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, reason *ClubInfractionReason) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourceManual, clubId, pastClubInfractionHistory, reason, time.Time{})
}

func IssueClubInfractionHistoryManualWithCustomLength(requester *principal.Principal, clubId string, reason *ClubInfractionReason, until time.Time) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourceManual, clubId, nil, reason, until)
}

func IssueClubInfractionHistoryFromPostModeration(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, reason *ClubInfractionReason) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourcePostModerationRejection, clubId, pastClubInfractionHistory, reason, time.Time{})
}

func IssueClubInfractionHistoryFromPostManualRemoval(requester *principal.Principal, clubId string, pastClubInfractionHistory []*ClubInfractionHistory, reason *ClubInfractionReason) (*ClubInfractionHistory, error) {
	return newClubInfraction(requester, ClubInfractionHistorySourcePostManualRemoval, clubId, pastClubInfractionHistory, reason, time.Time{})
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

func (m *ClubInfractionHistory) Reason() *ClubInfractionReason {
	return m.reason
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

func UnmarshalClubInfractionHistoryFromDatabase(id, clubId, issuerAccountId, source string, reason *ClubInfractionReason, issuedAt, expiresAt time.Time, clubSuspensionLength int64) *ClubInfractionHistory {
	st, _ := ClubInfractionHistorySourceFromString(source)
	return &ClubInfractionHistory{
		id:                   id,
		clubId:               clubId,
		issuerAccountId:      issuerAccountId,
		source:               st,
		reason:               reason,
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
