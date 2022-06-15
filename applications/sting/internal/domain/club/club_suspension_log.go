package club

import (
	"overdoll/libraries/paging"
	"time"
)

type SuspensionLog struct {
	*paging.Node

	id                  string
	clubId              string
	accountId           *string
	isSuspensionRemoval bool
	reason              *SuspensionReason
	suspendedUntil      *time.Time
}

func NewSuspensionLog(id, clubId string, accountId *string, reason SuspensionReason, suspendedUntil time.Time) (*SuspensionLog, error) {
	return &SuspensionLog{
		id:                  id,
		clubId:              clubId,
		accountId:           accountId,
		isSuspensionRemoval: false,
		reason:              &reason,
		suspendedUntil:      &suspendedUntil,
	}, nil
}

func NewSuspensionRemovalLog(id, clubId string, accountId string) (*SuspensionLog, error) {
	return &SuspensionLog{
		id:                  id,
		clubId:              clubId,
		accountId:           &accountId,
		isSuspensionRemoval: true,
		reason:              nil,
		suspendedUntil:      nil,
	}, nil
}

func UnmarshalSuspensionLogFromDatabase(id, clubId string, accountId *string, reason *string, suspendedUntil *time.Time, isRemoval bool) *SuspensionLog {

	var re *SuspensionReason

	if reason != nil {
		r, _ := SuspensionReasonFromString(*reason)
		re = &r
	}

	return &SuspensionLog{
		id:                  id,
		clubId:              clubId,
		accountId:           accountId,
		isSuspensionRemoval: isRemoval,
		reason:              re,
		suspendedUntil:      suspendedUntil,
	}
}

func (s *SuspensionLog) Id() string {
	return s.id
}

func (s *SuspensionLog) ClubId() string {
	return s.clubId
}

func (s *SuspensionLog) AccountId() *string {
	return s.accountId
}

func (s *SuspensionLog) IsSuspensionRemoval() bool {
	return s.isSuspensionRemoval
}

func (s *SuspensionLog) SuspensionReason() *SuspensionReason {
	return s.reason
}

func (s *SuspensionLog) SuspendedUntil() *time.Time {
	return s.suspendedUntil
}
