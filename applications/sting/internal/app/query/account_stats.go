package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/applications/sting/internal/domain/post"
)

type AccountStats struct {
	AccountIds []string
}

type AccountStatsHandler struct {
	pr post.Repository
	cr curation.Repository
	gr games.Repository
}

func NewAccountStatsHandler(pr post.Repository, cr curation.Repository, gr games.Repository) AccountStatsHandler {
	return AccountStatsHandler{pr: pr, cr: cr, gr: gr}
}

func (h AccountStatsHandler) Handle(ctx context.Context, query AccountStats) ([]*post.AccountStats, error) {

	var stats []*post.AccountStats

	for _, accId := range query.AccountIds {

		result, err := h.pr.GetStatsByAccountId(ctx, accId)

		if err != nil {
			return nil, err
		}

		stats = append(stats, result)
	}

	return stats, nil
}
