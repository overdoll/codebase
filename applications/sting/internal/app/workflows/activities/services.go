package activities

import (
	"context"
)

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}

type StellaService interface {
	CanAccountCreatePostUnderClub(context.Context, string, string) (bool, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(context.Context, string, []string) ([]string, error)
	DeleteResources(context.Context, string, []string) error
}
