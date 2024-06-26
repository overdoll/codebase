package command

import (
	"context"
	"fmt"
	"os"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubOverChargebackThreshold struct {
	ClubId    string
	Threshold float64
}

type ClubOverChargebackThresholdHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewClubOverChargebackThresholdHandler(mr mailing.Repository, eva EvaService, sting StingService) ClubOverChargebackThresholdHandler {
	return ClubOverChargebackThresholdHandler{mr: mr, eva: eva, sting: sting}
}

func (h ClubOverChargebackThresholdHandler) Handle(ctx context.Context, cmd ClubOverChargebackThreshold) error {

	clubDetails, err := h.sting.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_over_chargeback_threshold",
		map[string]interface{}{
			"ClubName":  clubDetails.Name(),
			"ClubLink":  clubUrl.String(),
			"Threshold": fmt.Sprintf("%f", cmd.Threshold),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("overdoll team", os.Getenv("STAFF_ADDRESS"))

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
