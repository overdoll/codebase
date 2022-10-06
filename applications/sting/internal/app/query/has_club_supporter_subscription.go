package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type HasClubSupporterSubscription struct {
	Principal *principal.Principal
	AccountId string
}

type HasClubSupporterSubscriptionHandler struct {
	cr club.Repository
}

func NewHasClubSupporterSubscriptionHandler(cr club.Repository) HasClubSupporterSubscriptionHandler {
	return HasClubSupporterSubscriptionHandler{cr: cr}
}

func (h HasClubSupporterSubscriptionHandler) Handle(ctx context.Context, query HasClubSupporterSubscription) (bool, error) {

	if err := query.Principal.BelongsToAccount(query.AccountId); err == nil {
		return len(query.Principal.ClubExtension().SupportedClubIds()) > 0, nil
	}

	if !query.Principal.IsStaff() {
		return false, principal.ErrNotAuthorized
	}

	clubExtension, err := h.cr.GetAccountClubDigestById(ctx, query.AccountId)

	if err != nil {
		return false, err
	}

	return len(clubExtension.SupportedClubIds()) > 0, nil
}
