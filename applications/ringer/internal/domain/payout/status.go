package payout

import "errors"

type Status struct {
	slug string
}

var (
	UnknownStatus = Status{""}
	Queued        = Status{"QUEUED"}
	Failed        = Status{"FAILED"}
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
	}

	return UnknownStatus, errors.New("unknown status: " + s)
}
