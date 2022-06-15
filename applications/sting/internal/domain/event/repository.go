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
	NewSupporterPost(ctx context.Context, clubId string) error

	WaitForClubToBeReady(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	CreateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error

	TerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
	UnTerminateClub(ctx context.Context, requester *principal.Principal, clb *club.Club) error
}
