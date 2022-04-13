package query

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/principal"
)

type PlatformFeeByClubId struct {
	Principal *principal.Principal
	ClubId    string
}

type PlatformFeeByClubIdHandler struct {
	pr payment.Repository
}

func NewPlatformFeeByClubIdHandler(pr payment.Repository) PlatformFeeByClubIdHandler {
	return PlatformFeeByClubIdHandler{pr: pr}
}

func (h PlatformFeeByClubIdHandler) Handle(ctx context.Context, query PlatformFeeByClubId) (*payment.PlatformFee, error) {

	result, err := h.pr.GetPlatformFeeForClub(ctx, query.Principal, query.ClubId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
