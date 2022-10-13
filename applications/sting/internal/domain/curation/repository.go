package curation

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*Profile, error)
	UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	GetCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, accountId string) (*PostsFeedData, error)
	GetCuratedPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*post.Post, error)

	DeleteProfileOperator(ctx context.Context, accountId string) error
}
