package infraction

import (
	"errors"
	"time"
)

type PostAuditLogFilters struct {
	moderatorId *string
	postId      *string
	dateRange   []time.Time
}

func NewPostAuditLogFilters(moderatorId, postId *string, dateRange []int) (*PostAuditLogFilters, error) {

	// DateRange will be UTC unix timestamps, so we check for that here
	// if no date range is provided, we take the current time
	var times []time.Time

	if len(dateRange) == 0 {
		times = append(times, time.Now())
	} else {
		for _, item := range dateRange {
			times = append(times, time.Unix(int64(item), 0))
		}
	}

	if postId == nil && moderatorId == nil {
		return nil, errors.New("must select at least post or moderator")
	}

	return &PostAuditLogFilters{
		moderatorId: moderatorId,
		postId:      postId,
		dateRange:   times,
	}, nil
}

func (e *PostAuditLogFilters) ModeratorId() *string {
	return e.moderatorId
}

func (e *PostAuditLogFilters) PostId() *string {
	return e.postId
}

func (e *PostAuditLogFilters) DateRange() []time.Time {
	return e.dateRange
}
