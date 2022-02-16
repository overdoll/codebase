package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

func (h *Activities) AddClubMemberIfNotExists(ctx context.Context, clubId, accountId string) (bool, error) {

	clubMember, err := h.cr.GetClubMemberByIdOperator(ctx, clubId, accountId)

	if err != nil && err != club.ErrClubMemberNotFound {
		return false, err
	}

	// club member is nil, create one
	if clubMember == nil {
		if err := h.cr.AddClubMemberToList(ctx, clubId, accountId); err != nil {
			return false, err
		}
	}

	return clubMember != nil, nil
}
