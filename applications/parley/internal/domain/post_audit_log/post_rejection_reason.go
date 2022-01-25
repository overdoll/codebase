package post_audit_log

import (
	"errors"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrPostRejectionReasonNotFound = errors.New("post rejection reason not found")
)

type PostRejectionReason struct {
	*paging.Node

	id           string
	reason       *localization.Translation
	infractionId string
}

func (m *PostRejectionReason) ID() string {
	return m.id
}

func (m *PostRejectionReason) Reason() *localization.Translation {
	return m.reason
}

func (m *PostRejectionReason) IsInfraction() bool {
	return m.infractionId != ""
}

func (m *PostRejectionReason) InfractionId() string {
	return m.infractionId
}

func (m *PostRejectionReason) CanView(requester *principal.Principal) error {
	return CanViewRejectionReasons(requester)
}

func CanViewRejectionReasons(requester *principal.Principal) error {
	if !(requester.IsModerator() || requester.IsStaff()) {
		return principal.ErrNotAuthorized
	}

	return nil
}

func UnmarshalPostRejectionReasonFromDatabase(id string, reason map[string]string, infractionId string) *PostRejectionReason {
	return &PostRejectionReason{
		id:           id,
		reason:       localization.UnmarshalTranslationFromDatabase(reason),
		infractionId: infractionId,
	}
}
