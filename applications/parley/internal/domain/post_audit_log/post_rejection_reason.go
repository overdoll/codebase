package post_audit_log

import (
	"errors"
	"overdoll/libraries/uuid"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrPostRejectionReasonNotFound = errors.New("post rejection reason not found")
)

type PostRejectionReason struct {
	*paging.Node

	id                     string
	reason                 *localization.Translation
	clubInfractionReasonId string
	deprecated             bool
}

func NewPostRejectionReason(requester *principal.Principal, reason string, clubInfractionReasonId string) (*PostRejectionReason, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	l, err := localization.NewDefaultTranslation(reason)
	if err != nil {
		return nil, err
	}

	return &PostRejectionReason{
		id:                     uuid.New().String(),
		reason:                 l,
		clubInfractionReasonId: clubInfractionReasonId,
		deprecated:             false,
	}, nil
}

func (m *PostRejectionReason) ID() string {
	return m.id
}

func (m *PostRejectionReason) Reason() *localization.Translation {
	return m.reason
}

func (m *PostRejectionReason) IsInfraction() bool {
	return m.clubInfractionReasonId != ""
}

func (m *PostRejectionReason) Deprecated() bool {
	return m.deprecated
}

func (m *PostRejectionReason) ClubInfractionReasonId() string {
	return m.clubInfractionReasonId
}

func (m *PostRejectionReason) UpdateReason(requester *principal.Principal, reason, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.reason.UpdateTranslation(reason, locale); err != nil {
		return err
	}

	return nil
}

func (m *PostRejectionReason) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *PostRejectionReason) UpdateClubInfractionReason(requester *principal.Principal, infractionReasonId string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.clubInfractionReasonId = infractionReasonId
	return nil
}

func (m *PostRejectionReason) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
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

func UnmarshalPostRejectionReasonFromDatabase(id string, reason map[string]string, infractionId string, deprecated bool) *PostRejectionReason {
	return &PostRejectionReason{
		id:                     id,
		reason:                 localization.UnmarshalTranslationFromDatabase(reason),
		clubInfractionReasonId: infractionId,
		deprecated:             deprecated,
	}
}
