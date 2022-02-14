package post

import "errors"

type SupporterOnlyStatus struct {
	slug string
}

var (
	UnknownSupporterOnly = SupporterOnlyStatus{""}
	Partial              = SupporterOnlyStatus{"partial"}
	Full                 = SupporterOnlyStatus{"full"}
	None                 = SupporterOnlyStatus{"none"}
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

	return UnknownSupporterOnly, errors.New("unknown supporter only status: " + s)
}
