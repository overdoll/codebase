package billing

import "errors"

type SupportStatus struct {
	slug string
}

var (
	UnknownSupportStatus = SupportStatus{""}
	Active               = SupportStatus{"active"}
	Cancelled            = SupportStatus{"cancelled"}
	Inactive             = SupportStatus{"inactive"}
)

func (r SupportStatus) String() string {
	return r.slug
}

func SupportStatusFromString(s string) (SupportStatus, error) {
	switch s {
	case Active.slug:
		return Active, nil
	case Cancelled.slug:
		return Cancelled, nil
	case Inactive.slug:
		return Inactive, nil
	}

	return UnknownSupportStatus, errors.New("unknown support status: " + s)
}
