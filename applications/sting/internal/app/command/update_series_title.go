package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateSeriesTitle struct {
	Principal *principal.Principal
	SeriesId  string
	Title     string
	Locale    string
}

type UpdateSeriesTitleHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdateSeriesTitleHandler(pr post.Repository, pi post.IndexRepository) UpdateSeriesTitleHandler {
	return UpdateSeriesTitleHandler{pr: pr, pi: pi}
}

func (h UpdateSeriesTitleHandler) Handle(ctx context.Context, cmd UpdateSeriesTitle) (*post.Series, error) {

	ser, err := h.pr.UpdateSeriesTitle(ctx, cmd.Principal, cmd.SeriesId, func(series *post.Series) error {
		return series.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexSeries(ctx, ser); err != nil {
		return nil, err
	}

	return ser, nil
}
