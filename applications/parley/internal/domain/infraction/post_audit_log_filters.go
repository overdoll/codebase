package infraction

import (
	"errors"
	"time"
)

type PostAuditLogFilters struct {
	moderatorId *string
	postId      *string
	from        time.Time
	to          time.Time
}

func NewPostAuditLogFilters(moderatorId, postId *string, from, to time.Time) (*PostAuditLogFilters, error) {

	if postId == nil && moderatorId == nil {
		return nil, errors.New("must select at least post or moderator")
	}

	if to.Before(from) {
		return nil, errors.New("to must be after from")
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

func (e *PostAuditLogFilters) From() time.Time {
	return e.from
}

func (e *PostAuditLogFilters) To() time.Time {
	return e.to
}
