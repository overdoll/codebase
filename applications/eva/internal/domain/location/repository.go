package location

import (
	"context"
)

type Repository interface {
	GetLocationFromIp(ctx context.Context, ip string) (*Location, error)
}
