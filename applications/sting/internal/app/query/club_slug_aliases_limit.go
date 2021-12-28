package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type ClubSlugAliasesLimit struct {
	Principal *principal.Principal
	AccountId string
}

type ClubSlugAliasesLimitHandler struct {
	pr post.Repository
}

func NewClubSlugAliasesLimitHandler(pr post.Repository) ClubSlugAliasesLimitHandler {
	return ClubSlugAliasesLimitHandler{pr: pr}
}

func (h ClubSlugAliasesLimitHandler) Handle(ctx context.Context, query ClubSlugAliasesLimit) (int, error) {
	return post.ViewClubSlugLimit(query.Principal, query.AccountId)
}
