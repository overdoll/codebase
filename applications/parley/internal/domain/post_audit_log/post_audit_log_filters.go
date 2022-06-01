package post_audit_log

import (
	"overdoll/libraries/domainerror"
	"time"
)

type PostAuditLogFilters struct {
	moderatorId *string
	postId      *string
	from        *time.Time
	to          *time.Time
}

func NewPostAuditLogFilters(moderatorId, postId *string, from, to *time.Time) (*PostAuditLogFilters, error) {

	if postId == nil && moderatorId == nil {
		return nil, domainerror.NewValidation("must select at least post or moderator")
	}

	if to == nil && from == nil {
		if moderatorId != nil {
			return nil, domainerror.NewValidation("must select time range for audit logs when searching for moderator logs")
		}
	}

	if to != nil && from != nil {
		if to.Before(*from) {
			return nil, domainerror.NewValidation("to must be after from")
		}
	}

	return &PostAuditLogFilters{
		moderatorId: moderatorId,
		postId:      postId,
		from:        from,
		to:          to,
	}, nil
}

func (e *PostAuditLogFilters) ModeratorId() *string {
	return e.moderatorId
}

func (e *PostAuditLogFilters) PostId() *string {
	return e.postId
}

func (e *PostAuditLogFilters) From() *time.Time {
	return e.from
}

func (e *PostAuditLogFilters) To() *time.Time {
	return e.to
}
