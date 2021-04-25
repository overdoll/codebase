package adapters

import (
	"context"

	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
)

type CategoryEventRepository struct {
	commandBus *cqrs.CommandBus
	eventBus   *cqrs.EventBus
}

func NewCategoryEventRepository(commandBus *cqrs.CommandBus, eventBus *cqrs.EventBus) CategoryEventRepository {
	return CategoryEventRepository{commandBus: commandBus, eventBus: eventBus}
}

func (r CategoryEventRepository) CategoriesCreated(ctx context.Context, cats []*category.Category) error {

	var categories []*sting.Category

	for _, cat := range cats {
		categories = append(categories, &sting.Category{Id: cat.ID().String(), Title: cat.Title(), Thumbnail: cat.Thumbnail()})
	}

	if err := r.commandBus.Send(ctx, categories); err != nil {
		return err
	}

	return nil
}
