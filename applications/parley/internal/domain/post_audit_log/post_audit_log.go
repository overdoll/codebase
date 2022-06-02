package post_audit_log

import (
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
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

func NewRemovePostAuditLog(accountId string, postId string, ruleId string, notes *string) (*PostAuditLog, error) {
	return &PostAuditLog{
		id:          uuid.New().String(),
		postId:      postId,
		moderatorId: accountId,
		action:      PostAuditLogActionRemoved,
		ruleId:      &ruleId,
		notes:       notes,
	}, nil
}

func NewApprovePostAuditLog(accountId, postId string) (*PostAuditLog, error) {
	return &PostAuditLog{
		id:          uuid.New().String(),
		postId:      postId,
		moderatorId: accountId,
		action:      PostAuditLogActionApproved,
		ruleId:      nil,
		notes:       nil,
	}, nil
}

func NewRejectPostAuditLog(moderatorId, postId, ruleId string, notes *string) (*PostAuditLog, error) {

	id := ruleId

	return &PostAuditLog{
		id:          uuid.New().String(),
		postId:      postId,
		moderatorId: moderatorId,
		action:      PostAuditLogActionDenied,
		ruleId:      &id,
		notes:       notes,
	}, nil
}

func UnmarshalPostAuditLogFromDatabase(id, postId, moderatorId, status string, ruleId, notes *string) *PostAuditLog {

	st, _ := PostAuditLogActionFromString(status)

	return &PostAuditLog{
		id:          id,
		postId:      postId,
		moderatorId: moderatorId,
		action:      st,
		ruleId:      ruleId,
		notes:       notes,
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
