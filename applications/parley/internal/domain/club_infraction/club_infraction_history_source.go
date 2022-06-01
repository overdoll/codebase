package club_infraction

import (
	"overdoll/libraries/domainerror"
)

type ClubInfractionHistorySource struct {
	slug string
}

var (
	ClubInfractionHistorySourceUnknown                 = ClubInfractionHistorySource{""}
	ClubInfractionHistorySourceManual                  = ClubInfractionHistorySource{"MANUAL"}
	ClubInfractionHistorySourcePostModerationRejection = ClubInfractionHistorySource{"POST_MODERATION_REJECTION"}
	ClubInfractionHistorySourcePostManualRemoval       = ClubInfractionHistorySource{"POST_MANUAL_REMOVAL"}
)

func (r ClubInfractionHistorySource) String() string {
	return r.slug
}

func ClubInfractionHistorySourceFromString(s string) (ClubInfractionHistorySource, error) {
	switch s {
	case ClubInfractionHistorySourceManual.slug:
		return ClubInfractionHistorySourceManual, nil
	case ClubInfractionHistorySourcePostModerationRejection.slug:
		return ClubInfractionHistorySourcePostModerationRejection, nil
	case ClubInfractionHistorySourcePostManualRemoval.slug:
		return ClubInfractionHistorySourcePostManualRemoval, nil
	}

	return ClubInfractionHistorySourceUnknown, domainerror.NewValidation("unknown club infraction history source: " + s)
}
