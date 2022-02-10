package post_audit_log

import "errors"

type PostAuditLogAction struct {
	slug string
}

var (
	PostAuditLogActionUnknown  = PostAuditLogAction{""}
	PostAuditLogActionRemoved  = PostAuditLogAction{"removed"}
	PostAuditLogActionApproved = PostAuditLogAction{"approved"}
	PostAuditLogActionDenied   = PostAuditLogAction{"denied"}
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

	return PostAuditLogActionUnknown, errors.New("unknown post audit log action: " + s)
}