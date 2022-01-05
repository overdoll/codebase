package types

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
)

func MarshalResourceToGraphQL(ctx context.Context, res *resource.Resource) *Resource {

	var urls []*ResourceURL

	for _, url := range res.FullUrls() {
		urls = append(urls, &ResourceURL{
			URL:      graphql.URI(url.GetFullUrl()),
			MimeType: url.GetMimeType(),
		})
	}

	var tp ResourceType

	if res.IsImage() {
		tp = ResourceTypeImage
	}

	if res.IsVideo() {
		tp = ResourceTypeVideo
	}

	return &Resource{
		ID:        relay.NewID(Resource{}, res.ItemId(), res.ID()),
		Processed: res.IsProcessed(),
		Type:      tp,
		Urls:      urls,
	}
}
