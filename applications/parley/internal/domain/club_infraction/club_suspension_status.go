package club_infraction

import (
	"overdoll/libraries/paging"
	"time"
)

type ClubSuspensionStatus struct {
	*paging.Node

	clubId         string
	suspended      bool
	suspendedUntil time.Time
}

func (m *ClubSuspensionStatus) ClubId() string {
	return m.clubId
}

func (m *ClubSuspensionStatus) Suspended() bool {
	return m.suspended
}

func (m *ClubSuspensionStatus) SuspendedUntil() time.Time {
	return m.suspendedUntil
}

func UnmarshalClubSuspensionStatusFromDatabase(clubId string, suspended bool, suspendedUntil time.Time) *ClubSuspensionStatus {
	return &ClubSuspensionStatus{
		clubId:         clubId,
		suspended:      suspended,
		suspendedUntil: suspendedUntil,
	}
}
