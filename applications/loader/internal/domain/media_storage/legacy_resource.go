package media_storage

import (
	"errors"
	"overdoll/libraries/media/proto"
)

type LegacyResource struct {
	id            string
	itemId        string
	copiedFromId  string
	mediaLinkType proto.MediaLinkType
}

func (l *LegacyResource) ID() string {
	return l.id
}

func (l *LegacyResource) ItemId() string {
	return l.itemId
}

func (l *LegacyResource) MediaLinkType() proto.MediaLinkType {
	return l.mediaLinkType
}

func (l *LegacyResource) CopiedFromId() string {
	return l.copiedFromId
}

func UnmarshalLegacyResourceFromDatabase(id, itemId, resourceToken string, copiedFromId string) (*LegacyResource, error) {

	var link proto.MediaLinkType

	switch resourceToken {
	case "":
		link = proto.MediaLinkType_POST_CONTENT
		break
	case "POST":
		link = proto.MediaLinkType_POST_CONTENT
		break
	case "POST_PRIVATE_CONTENT":
		link = proto.MediaLinkType_POST_CONTENT
		break
	case "AUDIENCE_BANNER":
		link = proto.MediaLinkType_AUDIENCE_BANNER
		break
	case "CATEGORY_BANNER":
		link = proto.MediaLinkType_CATEGORY_BANNER
		break
	case "SERIES_BANNER":
		link = proto.MediaLinkType_SERIES_BANNER
		break
	case "CHARACTER_BANNER":
		link = proto.MediaLinkType_CHARACTER_BANNER
		break
	case "CLUB_BANNER":
		link = proto.MediaLinkType_CLUB_BANNER
		break
	case "CLUB":
		link = proto.MediaLinkType_CLUB_THUMBNAIL
		break
	case "TOPIC_BANNER":
		link = proto.MediaLinkType_TOPIC_BANNER
		break
	default:
		return nil, errors.New("not supported legacy resource type: " + resourceToken)
	}

	return &LegacyResource{
		id:            id,
		itemId:        itemId,
		copiedFromId:  copiedFromId,
		mediaLinkType: link,
	}, nil
}
