package payment

import "errors"

type Status struct {
	slug string
}

var (
	UnknownStatus = Status{""}
	Pending       = Status{"PENDING"}
	Ready         = Status{"READY"}
	Processing    = Status{"PROCESSING"}
	Completed     = Status{"COMPLETED"}
)

func (r Status) String() string {
	return r.slug
}

func StatusFromString(s string) (Status, error) {
	switch s {
	case Pending.slug:
		return Pending, nil
	case Ready.slug:
		return Ready, nil
	case Processing.slug:
		return Processing, nil
	case Completed.slug:
		return Completed, nil
	}

	return UnknownStatus, errors.New("unknown status: " + s)
}
