package event

import (
	"context"
	club "overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	PublishPost(ctx context.Context, postId string) error
	DeletePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	ArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	UnArchivePost(ctx context.Context, requester *principal.Principal, pst *post.Post) error
	DiscardPost(ctx context.Context, postId string) error
	SubmitPost(ctx context.Context, requester *principal.Principal, pst *post.Post, postTime time.Time) error
	RemovePost(ctx context.Context, postId string) error
	AddPostLike(ctx context.Context, like *post.Like) error
	RemovePostLike(ctx context.Context, like *post.Like) error

	DeleteAccountData(ctx context.Context, postId string) error

	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
	AddClubMember(ctx context.Context, member *club.Member) error
	RemoveClubMember(ctx context.Context, member *club.Member) error
	SuspendClub(ctx context.Context, requester *principal.Principal, club *club.Club, endTime time.Time, reason string) error
	SuspendClubOperator(ctx context.Context, club *club.Club, accountId *string, endTime time.Time, reason string) error
	UnSuspendClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error

	WaitForClubToBeReady(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	CreateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error

	TerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	UnTerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error

	GenerateCharacterBanner(ctx context.Context, character *post.Character, duration time.Duration) error
	GenerateCategoryBanner(ctx context.Context, category *post.Category, duration time.Duration) error
	GenerateSeriesBanner(ctx context.Context, series *post.Series, duration time.Duration) error
	GenerateAudienceBanner(ctx context.Context, audience *post.Audience, duration time.Duration) error
	GenerateClubBannerFromPost(ctx context.Context, post *post.Post) error

	SendCompletedPixelatedResources(ctx context.Context, post *post.Post) error
}
