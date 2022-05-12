package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/event"
	"overdoll/libraries/principal"
)

type CancelActiveSupporterSubscriptionsForClub struct {
	Principal *principal.Principal
	ClubId    string
}

type CancelActiveSupporterSubscriptionsForClubHandler struct {
	event event.Repository
}

func NewCancelActiveSubscriptionsForClubHandler(event event.Repository) CancelActiveSupporterSubscriptionsForClubHandler {
	return CancelActiveSupporterSubscriptionsForClubHandler{event: event}
}

func (h CancelActiveSupporterSubscriptionsForClubHandler) Handle(ctx context.Context, cmd CancelActiveSupporterSubscriptionsForClub) error {
	return h.event.CancelActiveSupporterSubscriptionsForClub(ctx, cmd.Principal, cmd.ClubId)
}
