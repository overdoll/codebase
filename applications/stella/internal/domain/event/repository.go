package event

import (
	"context"
)

type Repository interface {
	AddClubMember(ctx context.Context, clubId, accountId string) error
	RemoveClubMember(ctx context.Context, clubId, accountId string) error
}
