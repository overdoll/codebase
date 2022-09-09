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
	source *proto.Media
}

func FromProto(source *proto.Media) *Media {
	return &Media{source: source}
}

func (m *Media) ID() string {
	return m.source.Id
}

func (m *Media) RawProto() *proto.Media {
	return m.source
}

func (m *Media) Prefix() string {
	return ""
}

func (m *Media) ImageOriginalKey() string {
	return ""
}

func (m *Media) IsPrivate() bool {
	return m.source.Private
}

func (m *Media) IsLegacy() bool {
	return true
}

func (m *Media) IsProcessed() bool {
	return true
}

func (m *Media) IsLinked() bool {
	return true
}

func (m *Media) IsFailed() bool {
	return true
}

func (m *Media) LegacyResource() string {
	return ""
}

func (m *Media) SourceMediaId() string {
	return ""
}

func (m *Media) LinkedId() string {
	return ""
}

func (m *Media) SourceLinkType() proto.MediaLinkType {
	return m.source.Source.Link.Type
}

func (m *Media) IsVideo() bool {
	return true
}

func (m *Media) VideoDuration() int {
	return 0
}

func (m *Media) VideoNoAudio() bool {
	return false
}
