package payment

import "errors"

type Status struct {
	slug string
}

var (
	UnknownStatus = Status{""}
	Pending       = Status{"PENDING"}
	Ready         = Status{"READY"}
	Complete      = Status{"COMPLETE"}
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
	case Complete.slug:
		return Complete, nil
	}

	return UnknownStatus, errors.New("unknown status: " + s)
}
