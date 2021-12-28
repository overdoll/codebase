package club

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetClubById(ctx context.Context, requester *principal.Principal, clubId string) (*Club, error)
	GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Club, error)
	CreateClub(ctx context.Context, requester *principal.Principal, club *Club) error

	UpdateClubName(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSlugAliases(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSlug(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(cl *Club) error) (*Club, error)

	GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*Member, error)
	CreateClubMember(ctx context.Context, requester *principal.Principal, member *Member) error
	DeleteClubMember(ctx context.Context, requester *principal.Principal, clubId string) error

	GetAccountClubMemberships(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*Member, error)
	GetMembersForClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*Member, error)
}

type IndexRepository interface {
	IndexAllClubs(ctx context.Context) error
	IndexClub(ctx context.Context, club *Club) error
	DeleteClubsIndex(ctx context.Context) error
	SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Club, error)
}
