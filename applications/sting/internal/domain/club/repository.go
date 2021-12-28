package club

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetClubById(ctx context.Context, requester *principal.Principal, brandId string) (*Club, error)
	GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Club, error)
	CreateClub(ctx context.Context, requester *principal.Principal, club *Club) error

	UpdateClubName(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSlugAliases(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSlug(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)
}

type IndexRepository interface {
	IndexAllClubs(ctx context.Context) error
	IndexClub(ctx context.Context, club *Club) error
	DeleteClubsIndex(ctx context.Context) error
	SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Club, error)
}
