package personalization

import (
	"context"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*Profile, error)
	UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
	UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *Profile) error) (*Profile, error)
}
