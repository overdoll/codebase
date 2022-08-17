package club

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetClubsByIds(ctx context.Context, clubIds []string) ([]*Club, error)
	GetClubById(ctx context.Context, clubId string) (*Club, error)
	GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Club, error)

	CreateClub(ctx context.Context, club *Club) error

	ReserveSlugForClub(ctx context.Context, club *Club) error
	DeleteReservedSlugForClub(ctx context.Context, club *Club) error

	UpdateClubThumbnail(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubBanner(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubMembersCount(ctx context.Context, clubId string, updateFn func(cl *Club) error) error

	UpdateClubOwner(ctx context.Context, clubId, accountId string) error

	UpdateClubName(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSupporterOnlyPostsDisabled(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)

	UpdateClubCharacters(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	GetClubCharactersCount(ctx context.Context, requester *principal.Principal, clubId string) (int, error)

	UpdateClubSlugAliases(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSlug(ctx context.Context, clubId string, updateFn func(cl *Club) error) (*Club, error)
	UpdateClubSuspensionStatus(ctx context.Context, clubId string, updateFn func(club *Club) error) (*Club, error)
	UpdateClubNextSupporterPostTime(ctx context.Context, clubId string, updateFn func(club *Club) error) (*Club, error)
	UpdateClubTerminationStatus(ctx context.Context, clubId string, updateFn func(club *Club) error) (*Club, error)

	GetAccountClubsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error)
	GetAccountClubsCountOperator(ctx context.Context, accountId string) (int, error)
	GetClubSupporterMembershipsCount(ctx context.Context, requester *principal.Principal, clubId string) (int64, error)

	GetClubMemberByIdOperator(ctx context.Context, clubId, accountId string) (*Member, error)

	GetClubMemberById(ctx context.Context, requester *principal.Principal, clubId, accountId string) (*Member, error)
	CreateClubMember(ctx context.Context, member *Member) error
	DeleteClubMember(ctx context.Context, member *Member) error

	UpdateClubMemberIsSupporter(ctx context.Context, clubId, accountId string, updateFn func(member *Member) error) (*Member, error)

	GetAccountClubMembershipsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error)

	SearchClubMembers(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *MemberFilters) ([]*Member, error)

	GetClubSuspensionLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*SuspensionLog, error)

	SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Club, error)
	DiscoverClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*Club, error)

	CreateClubSuspensionLog(ctx context.Context, suspensionLog *SuspensionLog) error

	GetAccountClubDigestById(ctx context.Context, accountId string) (*AccountClubDigest, error)

	DeleteAccountData(ctx context.Context, accountId string) error
	HasNonTerminatedClubs(ctx context.Context, requester *principal.Principal, accountId string) (bool, error)

	UpdateClubTotalPostsCount(ctx context.Context, clubId string, updateFn func(club *Club) error) (*Club, error)
	UpdateClubTotalLikesCount(ctx context.Context, clubId string, updateFn func(club *Club) error) (*Club, error)
}
