package queries

import (
	"context"

	"overdoll/applications/hades/src/models"
)

func (r *QueryResolver) Characters(ctx context.Context, data *models.CharacterSearchInput) ([]*models.Character, error) {
	panic("implement me")
}

func (r *QueryResolver) Categories(ctx context.Context, data *models.CategorySearchInput) ([]*models.Category, error) {
	panic("implement me")
}
