package club_infraction

import (
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type ClubInfractionReason struct {
	*paging.Node

	id         string
	reason     *localization.Translation
	deprecated bool
}

func NewClubInfractionReason(requester *principal.Principal, reason string) (*ClubInfractionReason, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	l, err := localization.NewDefaultTranslation(reason)
	if err != nil {
		return nil, err
	}

	return &ClubInfractionReason{
		id:         uuid.New().String(),
		reason:     l,
		deprecated: false,
	}, nil
}

func (m *ClubInfractionReason) ID() string {
	return m.id
}

func (m *ClubInfractionReason) Reason() *localization.Translation {
	return m.reason
}

func (m *ClubInfractionReason) UpdateReason(requester *principal.Principal, reason, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.reason.UpdateTranslation(reason, locale); err != nil {
		return err
	}

	return nil
}

func (m *ClubInfractionReason) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *ClubInfractionReason) Deprecated() bool {
	return m.deprecated
}

func (m *ClubInfractionReason) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

func UnmarshalClubInfractionReasonFromDatabase(id string, reason map[string]string, deprecated bool) *ClubInfractionReason {
	return &ClubInfractionReason{
		id:         id,
		reason:     localization.UnmarshalTranslationFromDatabase(reason),
		deprecated: deprecated,
	}
}
