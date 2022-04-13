package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/principal"
)

type UpdateClubPlatformFee struct {
	Principal  *principal.Principal
	ClubId     string
	FeePercent int64
}

type UpdateClubPlatformFeeHandler struct {
	pr payment.Repository
}

func NewUpdateClubPlatformFeeHandler(pr payment.Repository) UpdateClubPlatformFeeHandler {
	return UpdateClubPlatformFeeHandler{pr: pr}
}

func (h UpdateClubPlatformFeeHandler) Handle(ctx context.Context, cmd UpdateClubPlatformFee) (*payment.PlatformFee, error) {

	platformFee, err := h.pr.UpdateClubPlatformFee(ctx, cmd.Principal, cmd.ClubId, func(fee *payment.PlatformFee) error {
		return fee.UpdatePercent(cmd.FeePercent)
	})

	if err != nil {
		return nil, err
	}

	return platformFee, nil
}
