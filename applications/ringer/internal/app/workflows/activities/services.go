package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/club"
)

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) (*club.Club, error)
}
