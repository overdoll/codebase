package payout

import "errors"

type Status struct {
	slug string
}

var (
	UnknownStatus = Status{""}
	Queued        = Status{"QUEUED"}
	Processing    = Status{"PROCESSING"}
	Failed        = Status{"FAILED"}
	Cancelled     = Status{"CANCELLED"}
	Deposited     = Status{"DEPOSITED"}
)

func (r Status) String() string {
	return r.slug
}

func StatusFromString(s string) (Status, error) {
	switch s {
	case Queued.slug:
		return Queued, nil
	case Failed.slug:
		return Failed, nil
	case Deposited.slug:
		return Deposited, nil
	case Cancelled.slug:
		return Cancelled, nil
	case Processing.slug:
		return Processing, nil
	}

	return UnknownStatus, errors.New("unknown status: " + s)
}
