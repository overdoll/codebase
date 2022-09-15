package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type CheckPostSupporterStatusAndSendNewInput struct {
	PostId string
}

type CheckPostSupporterStatusAndSendNewPayload struct {
	IsSupporter   bool
	ClubId        string
	ClubHasBanner bool
}

func (h *Activities) CheckPostSupporterStatusAndSendNew(ctx context.Context, input CheckPostSupporterStatusAndSendNewInput) (*CheckPostSupporterStatusAndSendNewPayload, error) {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return nil, err
	}

	clb, err := h.cr.GetClubById(ctx, pst.ClubId())

	if err != nil {
		return nil, err
	}

	clubHasBanner := clb.BannerMedia() != nil

	// send a notification if partial or full supporter-only status
	if pst.SupporterOnlyStatus() == post.Partial || pst.SupporterOnlyStatus() == post.Full {
		return &CheckPostSupporterStatusAndSendNewPayload{IsSupporter: true, ClubId: pst.ClubId(), ClubHasBanner: clubHasBanner}, nil
	}

	return &CheckPostSupporterStatusAndSendNewPayload{IsSupporter: false, ClubId: pst.ClubId(), ClubHasBanner: clubHasBanner}, nil
}
