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

	if clubMember == nil {

		clubMember, err = club.NewMemberOperator(accountId, clubId)

		if err != nil {
			return false, err
		}

		// club member is nil, create one
		if err := h.cr.CreateClubMember(ctx, clubMember); err != nil {
			return false, err
		}

		return true, nil
	}

	return false, nil
}
