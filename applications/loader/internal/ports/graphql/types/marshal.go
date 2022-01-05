package types

import (
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
)

func MarshalResourcesToGraphQL(ctx context.Context, res []*resource.Resource, size *ResourceSizes) []Resource {
	var resources []Resource

	for _, r := range res {
		resources = append(resources, MarshalResourceToGraphQL(ctx, r, size))
	}

	return resources
}

func MarshalResourceToGraphQL(ctx context.Context, res *resource.Resource, size *ResourceSizes) Resource {

	var urls []*ResourceURL

	for _, url := range res.FullUrls(size.String()) {
		urls = append(urls, &ResourceURL{
			URL:      graphql.URI(url.GetFullUrl()),
			MimeType: url.GetMimeType(),
		})
	}

	if res.IsImage() {
		return &ImageResource{ID: relay.NewID(ImageResource{}, res.ID()), Urls: urls}
	}

	if res.IsVideo() {
		return &VideoResource{ID: relay.NewID(ImageResource{}, res.ID()), Urls: urls}
	}

	return nil
}

func GetResourceIdsFromResources(ctx context.Context, resources []Resource) []string {
	var resourceIds []string

	for _, r := range resources {
		resourceIds = append(resourceIds, r.(ImageResource).ID.GetID())
	}

	return resourceIds
}

func GetResourceIdFromResource(ctx context.Context, r Resource) string {
	return r.(ImageResource).ID.GetID()
}
