package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubSuspensionLogs struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubSuspensionLogsHandler struct {
	cr club.Repository
}

func NewClubSuspensionLogsHandler(cr club.Repository) ClubSuspensionLogsHandler {
	return ClubSuspensionLogsHandler{cr: cr}
}

func (h ClubSuspensionLogsHandler) Handle(ctx context.Context, query ClubSuspensionLogs) ([]*club.SuspensionLog, error) {

	results, err := h.cr.GetClubSuspensionLogs(ctx, query.Principal, query.Cursor, query.ClubId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
