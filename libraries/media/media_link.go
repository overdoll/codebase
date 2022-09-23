package media

import "overdoll/libraries/media/proto"

type Link struct {
	proto *proto.MediaLink
}

func NewPostContentMediaLink(postId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   postId,
			Type: proto.MediaLinkType_POST_CONTENT,
		},
	}
}

func NewClubBannerMediaLink(clubId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   clubId,
			Type: proto.MediaLinkType_CLUB_BANNER,
		},
	}
}

func NewClubThumbnailMediaLink(clubId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   clubId,
			Type: proto.MediaLinkType_CLUB_THUMBNAIL,
		},
	}
}

func NewTopicBannerMediaLink(topicId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   topicId,
			Type: proto.MediaLinkType_TOPIC_BANNER,
		},
	}
}

func NewAudienceBannerMediaLink(audienceId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   audienceId,
			Type: proto.MediaLinkType_AUDIENCE_BANNER,
		},
	}
}

func NewCategoryBannerMediaLink(categoryId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   categoryId,
			Type: proto.MediaLinkType_CATEGORY_BANNER,
		},
	}
}

func NewCharacterBannerMediaLink(characterId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   characterId,
			Type: proto.MediaLinkType_CHARACTER_BANNER,
		},
	}
}

func NewSeriesBannerMediaLink(seriesId string) *Link {
	return &Link{
		proto: &proto.MediaLink{
			Id:   seriesId,
			Type: proto.MediaLinkType_SERIES_BANNER,
		},
	}
}

func (l *Link) LinkedId() string {
	return l.proto.Id
}

func (l *Link) RawProto() *proto.MediaLink {
	return l.proto
}

func LinkFromProto(p *proto.MediaLink) *Link {
	return &Link{proto: p}
}
