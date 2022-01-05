package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
)

type ClubSlugAliasesLimit struct {
	Principal *principal.Principal
	AccountId string
}

type ClubSlugAliasesLimitHandler struct {
	cr club.Repository
}

func NewClubSlugAliasesLimitHandler(cr club.Repository) ClubSlugAliasesLimitHandler {
	return ClubSlugAliasesLimitHandler{cr: cr}
}

func (h ClubSlugAliasesLimitHandler) Handle(ctx context.Context, query ClubSlugAliasesLimit) (int, error) {
	return club.ViewClubSlugLimit(query.Principal, query.AccountId)
}
