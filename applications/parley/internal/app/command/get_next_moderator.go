package command

import (
	"context"
	"sort"

	"overdoll/applications/parley/internal/domain/moderator"
)

type GetNextModeratorHandler struct {
	mr moderator.Repository
}

func NewGetNextModeratorHandler(mr moderator.Repository) GetNextModeratorHandler {
	return GetNextModeratorHandler{mr: mr}
}

func (h GetNextModeratorHandler) Handle(ctx context.Context) (*moderator.Moderator, error) {

	mods, err := h.mr.GetModeratorsOperator(ctx)

	if err != nil {
		return nil, err
	}

	// sort by LastSelected - the moderators who were not selected recently will be at the top
	// that way we have a nice and sorted list of people
	sort.Slice(mods, func(i, j int) bool {
		return mods[i].LastSelected().Before(mods[j].LastSelected())
	})

	if len(mods) == 0 {
		return nil, err
	}

	// get first moderator on the list, and call "select"
	first := mods[0]
	m, err := h.mr.UpdateModeratorOperator(ctx, first.ID(), func(m *moderator.Moderator) error {
		m.Select()
		return nil
	})

	if err != nil {
		return nil, err
	}

	return m, nil
}
