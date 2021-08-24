package report

import (
	"errors"
	"time"
)

type PostReportFilters struct {
	postId string
	from   time.Time
	to     time.Time
}

func NewPostReportFilters(postId string, from, to time.Time) (*PostReportFilters, error) {

	if to.Before(from) {
		return nil, errors.New("to must be after from")
	}

	return &PostReportFilters{
		postId: postId,
		from:   from,
		to:     to,
	}, nil
}

func (e *PostReportFilters) PostId() string {
	return e.postId
}

func (e *PostReportFilters) From() time.Time {
	return e.from
}

func (e *PostReportFilters) To() time.Time {
	return e.to
}
