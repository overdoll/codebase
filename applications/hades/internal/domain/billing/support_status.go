package billing

import (
	"overdoll/libraries/errors/domainerror"
)

type SupportStatus struct {
	slug string
}

var (
	UnknownSupportStatus = SupportStatus{""}
	Active               = SupportStatus{"ACTIVE"}
	Cancelled            = SupportStatus{"CANCELLED"}
	Expired              = SupportStatus{"EXPIRED"}
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
	case Expired.slug:
		return Expired, nil
	}

	return UnknownSupportStatus, domainerror.NewValidation("unknown support status: " + s)
}
