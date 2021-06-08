package command

import (
	"context"
	"errors"
	"sort"

	"go.uber.org/zap"
	"overdoll/applications/parley/src/domain/moderator"
)

var (
	ErrFailedNextModerator = errors.New("get moderator failed")
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
		return nil, ErrFailedNextModerator
	}

	// sort by LastSelected - the moderators who were not selected recently will be at the top
	// that way we have a nice and sorted list of people
	sort.Slice(mods, func(i, j int) bool {
		return mods[i].LastSelected().Before(mods[j].LastSelected())
	})

	first := mods[0]

	// get first moderator on the list, and call "select"
	m, err := h.mr.UpdateModerator(ctx, first.ID(), func(m *moderator.Moderator) error {
		m.Select()
		return nil
	})

	return m, nil
}
