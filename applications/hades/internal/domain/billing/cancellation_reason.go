package billing

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type CancellationReason struct {
	*paging.Node

	deprecated bool
	id         string
	title      *localization.Translation
}

func NewCancellationReason(requester *principal.Principal, title string) (*CancellationReason, error) {

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	titleT, err := localization.NewDefaultTranslation(title)
	if err != nil {
		return nil, err
	}

	if err := validateTitle(title); err != nil {
		return nil, err
	}

	return &CancellationReason{
		id:         uuid.New().String(),
		title:      titleT,
		deprecated: false,
	}, nil
}

func (m *CancellationReason) ID() string {
	return m.id
}

func (m *CancellationReason) Title() *localization.Translation {
	return m.title
}

func (m *CancellationReason) Deprecated() bool {
	return m.deprecated
}

func (m *CancellationReason) UpdateTitle(requester *principal.Principal, title, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := validateTitle(title); err != nil {
		return err
	}

	if err := m.title.UpdateTranslation(title, locale); err != nil {
		return err
	}

	return nil
}

func (m *CancellationReason) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *CancellationReason) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func validateTitle(title string) error {

	err := validator.New().Var(title, "required,max=75")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func UnmarshalCancellationReasonFromDatabase(id string, title map[string]string, deprecated bool) *CancellationReason {
	return &CancellationReason{
		id:         id,
		title:      localization.UnmarshalTranslationFromDatabase(title),
		deprecated: deprecated,
	}
}
