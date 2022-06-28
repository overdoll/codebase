package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type UpdateResourcePrivacy struct {
	ResourcePairs []struct {
		ItemId     string
		ResourceId string
	}
	IsPrivate bool
}

type UpdateResourcePrivacyHandler struct {
	rr resource.Repository
}

func NewUpdateResourcePrivacyHandler(rr resource.Repository) UpdateResourcePrivacyHandler {
	return UpdateResourcePrivacyHandler{rr: rr}
}

func (h UpdateResourcePrivacyHandler) Handle(ctx context.Context, cmd CopyResourcesAndApplyFilters) ([]*resource.Resource, error) {

	var itemIds []string
	var resourceIds []string

	for _, item := range cmd.ResourcePairs {
		itemIds = append(itemIds, item.ItemId)
		resourceIds = append(resourceIds, item.ResourceId)
	}

	resources, err := h.rr.GetResourcesByIds(ctx, itemIds, resourceIds)

	if err != nil {
		return nil, err
	}

	if err := h.rr.UpdateResourcePrivacy(ctx, resources, cmd.IsPrivate); err != nil {
		return nil, err
	}

	return resources, nil
}
