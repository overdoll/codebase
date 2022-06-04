package post_audit_log

import (
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type PostAuditLog struct {
	*paging.Node

	id     string
	postId string

	moderatorId   string
	contributorId string

	notes *string

	action PostAuditLogAction

	ruleId *string

	createdAt time.Time
}

func CanRemovePost(requester *principal.Principal, ruleInstance *rule.Rule) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if ruleInstance.Deprecated() {
		return rule.ErrRuleDeprecated
	}

	return nil
}

func NewRemovePostAuditLog(id, accountId string, postId string, ruleId string, notes *string, createdAt time.Time) (*PostAuditLog, error) {
	return &PostAuditLog{
		id:          id,
		postId:      postId,
		moderatorId: accountId,
		action:      PostAuditLogActionRemoved,
		ruleId:      &ruleId,
		notes:       notes,
		createdAt:   createdAt,
	}, nil
}

func NewApprovePostAuditLog(id, accountId, postId string, createdAt time.Time) (*PostAuditLog, error) {
	return &PostAuditLog{
		id:          id,
		postId:      postId,
		moderatorId: accountId,
		action:      PostAuditLogActionApproved,
		ruleId:      nil,
		notes:       nil,
		createdAt:   createdAt,
	}, nil
}

func NewRejectPostAuditLog(id, moderatorId, postId, ruleId string, notes *string, createdAt time.Time) (*PostAuditLog, error) {

	rl := ruleId

	return &PostAuditLog{
		id:          id,
		postId:      postId,
		moderatorId: moderatorId,
		action:      PostAuditLogActionDenied,
		ruleId:      &rl,
		notes:       notes,
		createdAt:   createdAt,
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, status string, ruleId, notes *string, createdAt time.Time) *PostAuditLog {

	st, _ := PostAuditLogActionFromString(status)

	return &PostAuditLog{
		id:          id,
		postId:      postId,
		moderatorId: moderatorId,
		action:      st,
		ruleId:      ruleId,
		notes:       notes,
		createdAt:   createdAt,
	}
}

func (m *PostAuditLog) ID() string {
	return m.id
}

func (m *PostAuditLog) PostId() string {
	return m.postId
}

func (m *PostAuditLog) RuleId() *string {
	return m.ruleId
}

func (m *PostAuditLog) Action() PostAuditLogAction {
	return m.action
}

func (m *PostAuditLog) Notes() *string {
	return m.notes
}

func (m *PostAuditLog) ModeratorId() string {
	return m.moderatorId
}

func (m *PostAuditLog) CreatedAt() time.Time {
	return m.createdAt
}

func (m *PostAuditLog) IsApproved() bool {
	return m.action == PostAuditLogActionApproved
}

func (m *PostAuditLog) IsRemoved() bool {
	return m.action == PostAuditLogActionRemoved
}

func (m *PostAuditLog) IsDenied() bool {
	return m.action == PostAuditLogActionDenied
}

func (m *PostAuditLog) CanView(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(m.moderatorId)
}

func CanViewWithFilters(requester *principal.Principal, filter *PostAuditLogFilters) error {
	// filtering by moderator
	if filter.ModeratorId() != nil {

		if requester.IsStaff() {
			return nil
		}

		return requester.BelongsToAccount(*filter.ModeratorId())
	}

	return nil
}
