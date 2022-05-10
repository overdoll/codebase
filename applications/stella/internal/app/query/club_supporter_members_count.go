package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type ClubSupporterMembersCount struct {
	Principal *principal.Principal
	ClubId    string
}

type ClubSupporterMembersCountHandler struct {
	cr club.Repository
}

func NewClubSupporterMembersCountHandler(cr club.Repository) ClubSupporterMembersCountHandler {
	return ClubSupporterMembersCountHandler{cr: cr}
}

func (h ClubSupporterMembersCountHandler) Handle(ctx context.Context, query ClubSupporterMembersCount) (int64, error) {

	results, err := h.cr.GetClubSupporterMembershipsCount(ctx, query.Principal, query.ClubId)

	if err != nil {
		return 0, err
	}

	return results, nil
}
