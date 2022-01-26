package club_infraction

import (
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type ClubInfractionReason struct {
	*paging.Node

	id          string
	title       *localization.Translation
	description *localization.Translation
	deprecated  bool
}

func NewClubInfractionReason(requester *principal.Principal, title, description string) (*ClubInfractionReason, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	titleT, err := localization.NewDefaultTranslation(title)
	if err != nil {
		return nil, err
	}

	descriptionT, err := localization.NewDefaultTranslation(description)
	if err != nil {
		return nil, err
	}

	return &ClubInfractionReason{
		id:          uuid.New().String(),
		title:       titleT,
		description: descriptionT,
		deprecated:  false,
	}, nil
}

func (m *ClubInfractionReason) ID() string {
	return m.id
}

func (m *ClubInfractionReason) Title() *localization.Translation {
	return m.title
}

func (m *ClubInfractionReason) Description() *localization.Translation {
	return m.description
}

func (m *ClubInfractionReason) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (m *ClubInfractionReason) UpdateDescription(requester *principal.Principal, description, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.description.UpdateTranslation(description, locale); err != nil {
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

func UnmarshalClubInfractionReasonFromDatabase(id string, title map[string]string, description map[string]string, deprecated bool) *ClubInfractionReason {
	return &ClubInfractionReason{
		id:          id,
		title:       localization.UnmarshalTranslationFromDatabase(title),
		description: localization.UnmarshalTranslationFromDatabase(description),
		deprecated:  deprecated,
	}
}
