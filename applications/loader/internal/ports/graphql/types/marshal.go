package types

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
)

func MarshalResourceToGraphQL(ctx context.Context, res *resource.Resource) *Resource {

	var urls []*ResourceURL
	var videoUrl *ResourceURL

	for _, url := range res.FullUrls() {
		urls = append(urls, &ResourceURL{
			URL:      graphql.URI(url.FullUrl()),
			MimeType: url.MimeType(),
		})
	}

	var tp ResourceType

	if res.IsImage() {
		tp = ResourceTypeImage
	}

	if res.IsVideo() {
		tp = ResourceTypeVideo
		url := res.VideoThumbnailFullUrl()

		if url != nil {
			videoUrl = &ResourceURL{
				URL:      graphql.URI(url.FullUrl()),
				MimeType: url.MimeType(),
			}
		}
	}

	return &Resource{
		ID:             relay.NewID(Resource{}, res.ItemId(), res.ID()),
		Processed:      res.IsProcessed(),
		Type:           tp,
		Urls:           urls,
		Width:          res.Width(),
		Height:         res.Height(),
		VideoDuration:  res.VideoDuration(),
		VideoThumbnail: videoUrl,
	}
}
