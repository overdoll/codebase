package account

import "errors"

type LockReason struct {
	slug string
}

var (
	Unlocked       = LockReason{""}
	PostInfraction = LockReason{"POST_INFRACTION"}
)

func (r LockReason) String() string {
	return r.slug
}

func LockReasonFromString(s string) (LockReason, error) {
	switch s {
	case PostInfraction.slug:
		return PostInfraction, nil
	}

	return Unlocked, errors.New("unknown lock reason: " + s)
}
