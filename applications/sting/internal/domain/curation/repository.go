package curation

import (
	"context"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*Profile, error)
	UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	GetCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, accountId string) (*PostsFeedData, error)
	GetCuratedPostsFeedDataOperator(ctx context.Context, accountId string) (*PostsFeedData, error)

	UpdateCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, postsFeedData *PostsFeedData) error
	UpdateCuratedPostsFeedDataOperator(ctx context.Context, postsFeedData *PostsFeedData) error
	DeleteProfileOperator(ctx context.Context, accountId string) error
}
