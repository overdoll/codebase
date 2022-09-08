package activities

import "overdoll/libraries/media/proto"

type ProcessMediaPayload struct {
	Media       *proto.Media
	AlreadySent bool
}
