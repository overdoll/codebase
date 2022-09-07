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
