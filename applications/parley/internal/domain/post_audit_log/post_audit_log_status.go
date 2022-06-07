package post_audit_log

import (
	"overdoll/libraries/errors/domainerror"
)

type PostAuditLogAction struct {
	slug string
}

var (
	PostAuditLogActionUnknown  = PostAuditLogAction{""}
	PostAuditLogActionRemoved  = PostAuditLogAction{"REMOVED"}
	PostAuditLogActionApproved = PostAuditLogAction{"APPROVED"}
	PostAuditLogActionDenied   = PostAuditLogAction{"DENIED"}
)

func (r PostAuditLogAction) String() string {
	return r.slug
}

func PostAuditLogActionFromString(s string) (PostAuditLogAction, error) {
	switch s {
	case PostAuditLogActionRemoved.slug:
		return PostAuditLogActionRemoved, nil
	case PostAuditLogActionApproved.slug:
		return PostAuditLogActionApproved, nil
	case PostAuditLogActionDenied.slug:
		return PostAuditLogActionDenied, nil
	}

	return PostAuditLogActionUnknown, domainerror.NewValidation("unknown post audit log action: " + s)
}
