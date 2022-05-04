package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/event"
	"overdoll/libraries/principal"
)

type CancelActiveSubscriptionsForClub struct {
	Principal *principal.Principal
	ClubId    string
}

type CancelActiveSubscriptionsForClubHandler struct {
	event event.Repository
}

func NewCancelActiveSubscriptionsForClubHandler(event event.Repository) CancelActiveSubscriptionsForClubHandler {
	return CancelActiveSubscriptionsForClubHandler{event: event}
}

func (h CancelActiveSubscriptionsForClubHandler) Handle(ctx context.Context, cmd CancelActiveSubscriptionsForClub) error {

	if err := billing.CanCancelActiveSubscriptionsForClub(cmd.Principal); err != nil {
		return err
	}

	return h.event.CancelActiveSubscriptionsForClub(ctx, cmd.ClubId)
}
