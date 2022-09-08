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

func (m *Media) Id() string {
	return m.source.Id
}

func (m *Media) UploadId() string {
	return m.source.UploadId
}

func (m *Media) Source() *proto.Media {
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
