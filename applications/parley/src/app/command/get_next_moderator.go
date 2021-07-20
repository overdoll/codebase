package command

import (
	"context"
	"errors"
	"sort"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/moderator"
)

var (
	errFailedNextModerator = errors.New("get moderator failed")
)

type GetNextModeratorHandler struct {
	mr moderator.Repository
}

func NewGetNextModeratorHandler(mr moderator.Repository) GetNextModeratorHandler {
	return GetNextModeratorHandler{mr: mr}
}

func (h GetNextModeratorHandler) Handle(ctx context.Context) (*moderator.Moderator, error) {

	mods, err := h.mr.GetModerators(ctx)

	if err != nil {
		zap.S().Errorf("failed to get moderators: %s", err)
		return nil, errFailedNextModerator
	}

	// sort by LastSelected - the moderators who were not selected recently will be at the top
	// that way we have a nice and sorted list of people
	sort.Slice(mods, func(i, j int) bool {
		return mods[i].LastSelected().Before(mods[j].LastSelected())
	})

	if len(mods) == 0 {
		return nil, errFailedNextModerator
	}

	// get first moderator on the list, and call "select"
	first := mods[0]
	m, err := h.mr.UpdateModerator(ctx, first.ID(), func(m *moderator.Moderator) error {
		m.Select()
		return nil
	})

	if err != nil {
		return nil, err
	}

	return m, nil
}
