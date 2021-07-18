// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

// Represents an account
type Actor interface {
	IsActor()
}

type Account struct {
	// Pending Post Audit Logs linked to this account
	//
	// Viewable by either the currently logged-in account or staff+
	PendingPostAuditLogs *PendingPostAuditLogConnection `json:"pendingPostAuditLogs"`
	// Infraction history for this account
	//
	// Viewable by the currently authenticated account or staff+
	Infractions *AccountInfractionHistoryConnection `json:"infractions"`
	// Moderator settings for this account
	//
	// Viewable by the currently authenticated account or staff+
	ModeratorSettings *AccountModeratorSettings `json:"moderatorSettings"`
	ID                relay.ID                  `json:"id"`
}

func (Account) IsEntity() {}

// Infraction history belonging to an account
type AccountInfractionHistory struct {
	// ID of the infraction history
	ID relay.ID `json:"id"`
	// The reason for this infraction
	Reason string `json:"reason"`
}

func (AccountInfractionHistory) IsNode()   {}
func (AccountInfractionHistory) IsEntity() {}

// Connection of the infraction history
type AccountInfractionHistoryConnection struct {
	Edges    []*AccountInfractionHistoryEdge `json:"edges"`
	PageInfo *relay.PageInfo                 `json:"pageInfo"`
}

// Edge of the infraction history
type AccountInfractionHistoryEdge struct {
	Node   *AccountInfractionHistory `json:"node"`
	Cursor string                    `json:"cursor"`
}

type AccountModeratorSettings struct {
	InQueue bool `json:"inQueue"`
}

// Moderate the pending post input
type ModeratePendingPostInput struct {
	// Pending post to take action against
	PendingPostID relay.ID `json:"pendingPostId"`
	// If rejecting a pending post, put in the ID of a rejection reason
	PendingPostRejectionReasonID *relay.ID `json:"pendingPostRejectionReasonId"`
	// Any extra notes for the moderator
	Notes string `json:"notes"`
}

// Moderate the pending post payload
type ModeratePendingPostPayload struct {
	// The audit log generated by the pending post
	PendingPostAuditLog *PendingPostAuditLog `json:"pendingPostAuditLog"`
}

// Pending post audit log
//
// Audit log is created when a moderator takes an action against a pending post
type PendingPostAuditLog struct {
	// ID of the audit log
	ID relay.ID `json:"id"`
	// The contributor that the audit log belongs to
	Contributor Actor `json:"contributor"`
	// The moderator that this log belongs to
	Moderator Actor `json:"moderator"`
	// The status or the action that was taken against the pending post
	Action PendingPostAuditLogActionEnum `json:"action"`
	// The reason the action was taken
	Reason string `json:"reason"`
	// Additional notes by the moderator
	Notes string `json:"notes"`
	// If this audit log was reverted
	Reverted bool `json:"reverted"`
	// The time until which this audit log will be revertable
	ReversibleUntil time.Time `json:"reversibleUntil"`
	// The infraction that is linked to this audit log, mainly kept here as a reference so reverting will be easier
	InfractionID *relay.ID `json:"infractionId"`
}

func (PendingPostAuditLog) IsNode()   {}
func (PendingPostAuditLog) IsEntity() {}

// Connection of the audit log
type PendingPostAuditLogConnection struct {
	Edges    []*PendingPostAuditLogEdge `json:"edges"`
	PageInfo *relay.PageInfo            `json:"pageInfo"`
}

// Edge of the audit log
type PendingPostAuditLogEdge struct {
	Node   *PendingPostAuditLog `json:"node"`
	Cursor string               `json:"cursor"`
}

// Infraction history belonging to an account
type PendingPostRejectionReason struct {
	// ID of the rejection reason
	ID relay.ID `json:"id"`
	// The reason for this rejection
	Reason string `json:"reason"`
	// If the rejection reason will count against an infraction on the account
	Infraction bool `json:"infraction"`
}

func (PendingPostRejectionReason) IsNode()   {}
func (PendingPostRejectionReason) IsEntity() {}

// Connection of the pending post rejection reason
type PendingPostRejectionReasonConnection struct {
	Edges    []*PendingPostRejectionReasonEdge `json:"edges"`
	PageInfo *relay.PageInfo                   `json:"pageInfo"`
}

// Edge of the pending post rejection reason
type PendingPostRejectionReasonEdge struct {
	Node   *PendingPostRejectionReason `json:"node"`
	Cursor string                      `json:"cursor"`
}

// Revert the pending post audit log input
type RevertPendingPostAuditLogInput struct {
	// The audit log to revert
	PendingPostAuditLogID relay.ID `json:"pendingPostAuditLogId"`
}

// Revert the pending post audit log payload
type RevertPendingPostAuditLogPayload struct {
	// The new state of the audit log
	PendingPostAuditLog *PendingPostAuditLog `json:"pendingPostAuditLog"`
}

// Toggle whether or not the moderator will be part of the queue
type ToggleModeratorSettingsInQueuePayload struct {
	// The new status of the moderator in queue
	ModeratorSettingsInQueue *bool `json:"moderatorSettingsInQueue"`
}

type PendingPostAuditLogActionEnum string

const (
	PendingPostAuditLogActionEnumApproved PendingPostAuditLogActionEnum = "Approved"
	PendingPostAuditLogActionEnumDenied   PendingPostAuditLogActionEnum = "Denied"
)

var AllPendingPostAuditLogActionEnum = []PendingPostAuditLogActionEnum{
	PendingPostAuditLogActionEnumApproved,
	PendingPostAuditLogActionEnumDenied,
}

func (e PendingPostAuditLogActionEnum) IsValid() bool {
	switch e {
	case PendingPostAuditLogActionEnumApproved, PendingPostAuditLogActionEnumDenied:
		return true
	}
	return false
}

func (e PendingPostAuditLogActionEnum) String() string {
	return string(e)
}

func (e *PendingPostAuditLogActionEnum) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = PendingPostAuditLogActionEnum(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid PendingPostAuditLogActionEnum", str)
	}
	return nil
}

func (e PendingPostAuditLogActionEnum) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
