package infraction

import "errors"

type PostAuditLogStatus struct {
	slug string
}

var (
	PostAuditLogStatusUnknown  = PostAuditLogStatus{""}
	PostAuditLogStatusRemoved  = PostAuditLogStatus{"removed"}
	PostAuditLogStatusApproved = PostAuditLogStatus{"approved"}
	PostAuditLogStatusDenied   = PostAuditLogStatus{"denied"}
)

func (r PostAuditLogStatus) String() string {
	return r.slug
}

func PostAuditLogStatusFromString(s string) (PostAuditLogStatus, error) {
	switch s {
	case PostAuditLogStatusRemoved.slug:
		return PostAuditLogStatusRemoved, nil
	case PostAuditLogStatusApproved.slug:
		return PostAuditLogStatusApproved, nil
	case PostAuditLogStatusDenied.slug:
		return PostAuditLogStatusDenied, nil
	}

	return PostAuditLogStatusUnknown, errors.New("unknown post audit log status: " + s)
}
