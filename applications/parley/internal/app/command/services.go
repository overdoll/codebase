package command

import (
	"context"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type StingService interface {
	GetPost(context.Context, string) (string, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	RemovePost(context.Context, string) error
}

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) error
	SuspendClub(ctx context.Context, clubId string, endTime int64) error
}
