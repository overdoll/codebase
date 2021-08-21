package report

import (
	"time"
)

type PostReportFilters struct {
	postId    string
	dateRange []time.Time
}

func NewPostReportFilters(postId string, dateRange []int) (*PostReportFilters, error) {

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

	return &PostReportFilters{
		postId:    postId,
		dateRange: times,
	}, nil
}

func (e *PostReportFilters) PostId() string {
	return e.postId
}

func (e *PostReportFilters) DateRange() []time.Time {
	return e.dateRange
}
