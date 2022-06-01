package post

import (
	"overdoll/libraries/domainerror"
)

type SupporterOnlyStatus struct {
	slug string
}

var (
	UnknownSupporterOnly = SupporterOnlyStatus{""}
	Partial              = SupporterOnlyStatus{"PARTIAL"}
	Full                 = SupporterOnlyStatus{"FULL"}
	None                 = SupporterOnlyStatus{"NONE"}
)

func (r SupporterOnlyStatus) String() string {
	return r.slug
}

func SupporterOnlyStatusFromString(s string) (SupporterOnlyStatus, error) {
	switch s {
	case Partial.slug:
		return Partial, nil
	case Full.slug:
		return Full, nil
	case None.slug:
		return None, nil
	}

	return UnknownSupporterOnly, domainerror.NewValidation("unknown supporter only status: " + s)
}
