package activities

import (
	"context"
)

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) (*string, error)
}
