package club

import (
	"overdoll/libraries/errors/domainerror"
)

type SuspensionReason struct {
	slug string
}

var (
	UnknownStatus       = SuspensionReason{""}
	PostModerationQueue = SuspensionReason{"POST_MODERATION_QUEUE"}
	PostRemoval         = SuspensionReason{"POST_REMOVAL"}
	Manual              = SuspensionReason{"MANUAL"}
)

func (r SuspensionReason) String() string {
	return r.slug
}

func SuspensionReasonFromString(s string) (SuspensionReason, error) {
	switch s {
	case PostModerationQueue.slug:
		return PostModerationQueue, nil
	case PostRemoval.slug:
		return PostRemoval, nil
	case Manual.slug:
		return Manual, nil
	}

	return UnknownStatus, domainerror.NewValidation("unknown suspension reason: " + s)
}
