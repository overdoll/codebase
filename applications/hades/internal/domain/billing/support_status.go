package billing

import "errors"

type SupportStatus struct {
	slug string
}

var (
	UnknownSupportStatus = SupportStatus{""}
	Active               = SupportStatus{"active"}
)

func (r SupportStatus) String() string {
	return r.slug
}

func SupportStatusFromString(s string) (SupportStatus, error) {
	switch s {
	case Active.slug:
		return Active, nil
	}

	return UnknownSupportStatus, errors.New("unknown support status: " + s)
}
