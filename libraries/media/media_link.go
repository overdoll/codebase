package media

import "overdoll/libraries/media/proto"

type Link struct {
	source *proto.MediaLink
}

func NewPostContentMediaLink(postId string) *Link {
	return &Link{}
}

func NewClubBannerMediaLink(clubId string) *Link {
	return &Link{}
}

func NewClubThumbnailMediaLink(clubId string) *Link {
	return &Link{}
}

func NewSeriesThumbnailMediaLink(clubId string) *Link {
	return &Link{}
}

func NewTopicBannerMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewAudienceBannerMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewAudienceThumbnailMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewCategoryThumbnailMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewCategoryBannerMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewCharacterThumbnailMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewCharacterBannerMediaLink(audienceId string) *Link {
	return &Link{}
}

func NewSeriesBannerMediaLink(audienceId string) *Link {
	return &Link{}
}

func (l *Link) RawProto() *proto.MediaLink {
	return l.source
}
