package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	sting "overdoll/applications/sting/proto"

	"overdoll/libraries/principal"
)

type PrincipalByIdHandler struct {
	eva EvaService
	cr  club.Repository
}

func NewPrincipalByIdHandler(eva EvaService, cr club.Repository) PrincipalByIdHandler {
	return PrincipalByIdHandler{eva: eva, cr: cr}
}

func (h PrincipalByIdHandler) Handle(ctx context.Context, id string) (*principal.Principal, error) {

	result, err := h.eva.GetAccount(ctx, id)

	if err != nil {
		return nil, err
	}

	clubExtension, err := h.cr.GetAccountClubDigestById(ctx, id)

	if err != nil {
		return nil, err
	}

	extension, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  clubExtension.SupportedClubIds(),
		ClubMembershipIds: clubExtension.ClubMembershipIds(),
		OwnerClubIds:      clubExtension.OwnerClubIds(),
	})

	if err != nil {
		return nil, err
	}

	if err := result.ExtendWithClubExtension(extension); err != nil {
		return nil, err
	}

	return result, nil
}
