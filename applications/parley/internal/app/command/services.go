package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/post"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StingService interface {
	GetPost(context.Context, string) (*post.Post, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	RemovePost(context.Context, string) error
	GetClubById(ctx context.Context, clubId string) error
	SuspendClub(ctx context.Context, clubId string, endTime int64, isModerationQueue bool, isPostRemoval bool) error
}
