package report

import (
	"errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrPostReportReasonNotFound = errors.New("post report reason not found")
	ErrPostReportReasonIsLink   = errors.New("cant submit a post report with a link")
)

type PostReportReason struct {
	*paging.Node

	title       *localization.Translation
	description *localization.Translation
	link        *string
	deprecated  bool
	id          string
}

func NewPostReportReason(requester *principal.Principal, title, description string, link *string) (*PostReportReason, error) {

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

	return &PostReportReason{
		id:          uuid.New().String(),
		title:       titleT,
		description: descriptionT,
		link:        link,
		deprecated:  false,
	}, nil
}

func (m *PostReportReason) ID() string {
	return m.id
}

func (m *PostReportReason) Title() *localization.Translation {
	return m.title
}

func (m *PostReportReason) Description() *localization.Translation {
	return m.title
}

func (m *PostReportReason) Link() *string {
	return m.link
}

func (m *PostReportReason) Deprecated() bool {
	return m.deprecated
}

func (m *PostReportReason) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (m *PostReportReason) UpdateDescription(requester *principal.Principal, description, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := m.description.UpdateTranslation(description, locale); err != nil {
		return err
	}

	return nil
}

func (m *PostReportReason) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *PostReportReason) UpdateLink(requester *principal.Principal, link *string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.link = link
	return nil
}

func (m *PostReportReason) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

func UnmarshalPostReportReasonFromDatabase(id string, title map[string]string, description map[string]string, link *string, deprecated bool) *PostReportReason {
	return &PostReportReason{
		id:          id,
		title:       localization.UnmarshalTranslationFromDatabase(title),
		description: localization.UnmarshalTranslationFromDatabase(description),
		link:        link,
		deprecated:  deprecated,
	}
}
