package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateSeries struct {
	Principal *principal.Principal
	Slug      string
	Title     string
}

type CreateSeriesHandler struct {
	pr post.Repository
}

func NewCreateSeriesHandler(pr post.Repository) CreateSeriesHandler {
	return CreateSeriesHandler{pr: pr}
}

func (h CreateSeriesHandler) Handle(ctx context.Context, cmd CreateSeries) (*post.Series, error) {

	ser, err := post.NewSeries(cmd.Principal, cmd.Slug, cmd.Title)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateSeries(ctx, ser); err != nil {
		return nil, err
	}

	return ser, nil
}
