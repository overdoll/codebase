package activities

import (
	"context"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/media/proto"
)

type SendCallbackInput struct {
	Media  *proto.Media
	Source string
}

type SendCallbackPayload struct {
	NotFound bool
}

func (h *Activities) SendCallback(ctx context.Context, input SendCallbackInput) (*SendCallbackPayload, error) {

	if err := h.callback.SendCallback(ctx, input.Source, input.Media); err != nil {

		if err == media_processing.ErrMediaCallbackNotFound {
			return &SendCallbackPayload{NotFound: true}, nil
		}

		return nil, err
	}

	return &SendCallbackPayload{NotFound: false}, nil
}
