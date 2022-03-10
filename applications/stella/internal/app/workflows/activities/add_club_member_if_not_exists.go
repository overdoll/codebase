package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type AddClubMemberIfNotExistsInput struct {
	ClubId    string
	AccountId string
}

func (h *Activities) AddClubMemberIfNotExists(ctx context.Context, input AddClubMemberIfNotExistsInput) (bool, error) {

	clubMember, err := h.cr.GetClubMemberByIdOperator(ctx, input.ClubId, input.AccountId)

	if err != nil && err != club.ErrClubMemberNotFound {
		return false, err
	}

	if clubMember == nil {

		clubMember, err = club.NewMemberOperator(input.AccountId, input.ClubId)

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
