package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateAudience struct {
	Principal *principal.Principal
	Slug      string
	Title     string
	Standard  bool
}

type CreateAudienceHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreateAudienceHandler(pr post.Repository, pi post.IndexRepository) CreateAudienceHandler {
	return CreateAudienceHandler{pr: pr, pi: pi}
}

func (h CreateAudienceHandler) Handle(ctx context.Context, cmd CreateAudience) (*post.Audience, error) {

	aud, err := post.NewAudience(cmd.Principal, cmd.Slug, cmd.Title, cmd.Standard)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateAudience(ctx, cmd.Principal, aud); err != nil {
		return nil, err
	}

	if err := h.pi.IndexAudience(ctx, aud); err != nil {
		return nil, err
	}

	return aud, nil
}
