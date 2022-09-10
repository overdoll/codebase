package media

import (
	_ "image/png"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media/proto"
)

var (
	ErrMediaNotPresent = domainerror.NewValidation("media is not present")
)

type Media struct {
	proto  *proto.Media
	legacy string
}

func FromProto(source *proto.Media) *Media {
	return &Media{proto: source}
}

func (m *Media) ID() string {
	return m.proto.Id
}

func (m *Media) RawProto() *proto.Media {
	return m.proto
}

func (m *Media) Prefix() string {
	return ""
}

// ImageOriginalDownloadKey - the path for the image to download it
func (m *Media) ImageOriginalDownloadKey() string {
	return ""
}

func (m *Media) IsPrivate() bool {
	return m.proto.Private
}

func (m *Media) IsLegacy() bool {
	return m.legacy != ""
}

func (m *Media) IsProcessed() bool {
	return m.proto.State.Processed
}

func (m *Media) IsLinked() bool {
	return m.proto.Source != nil
}

func (m *Media) IsFailed() bool {
	return m.proto.State.Failed
}

func (m *Media) LegacyResource() string {
	return m.legacy
}

func (m *Media) SourceMediaId() string {
	return m.proto.Source.SourceMediaId
}

func (m *Media) LinkedId() string {
	return m.proto.Link.Id
}

func (m *Media) SourceLinkType() proto.MediaLinkType {
	return m.proto.Source.Link.Type
}

func (m *Media) IsVideo() bool {
	return m.proto.VideoData != nil
}

func (m *Media) VideoDuration() int {

	if m.proto.VideoData != nil {
		return int(m.proto.VideoData.DurationMilliseconds)
	}

	return 0
}

func (m *Media) VideoNoAudio() bool {
	if m.proto.VideoData != nil {
		return !m.proto.VideoData.HasAudio
	}

	return false
}
