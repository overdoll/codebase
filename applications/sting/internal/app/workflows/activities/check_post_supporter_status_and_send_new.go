package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type CheckPostSupporterStatusAndSendNewInput struct {
	PostId string
}

func (h *Activities) CheckPostSupporterStatusAndSendNew(ctx context.Context, input CheckPostSupporterStatusAndSendNewInput) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	// send a notification if partial or full supporter-only status
	if pst.SupporterOnlyStatus() == post.Partial || pst.SupporterOnlyStatus() == post.Full {
		if err := h.stella.NewSupporterPost(ctx, pst.ClubId()); err != nil {
			return err
		}
	}

	return nil
}
