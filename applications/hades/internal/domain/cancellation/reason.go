package cancellation

import (
	"errors"
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

var (
	ErrReasonNotFound   = errors.New("cancellation reason not found")
	ErrReasonDeprecated = errors.New("cancellation reason is deprecated")
)

type Reason struct {
	*paging.Node

	deprecated bool
	id         string
	title      *localization.Translation
}

func NewReason(requester *principal.Principal, title string) (*Reason, error) {

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

	return &Reason{
		id:         uuid.New().String(),
		title:      titleT,
		deprecated: false,
	}, nil
}

func (m *Reason) ID() string {
	return m.id
}

func (m *Reason) Title() *localization.Translation {
	return m.title
}

func (m *Reason) Deprecated() bool {
	return m.deprecated
}

func (m *Reason) UpdateTitle(requester *principal.Principal, title, locale string) error {

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

func (m *Reason) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *Reason) canUpdate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	return nil
}

func validateTitle(title string) error {

	err := validator.New().Var(title, "required,max=25")

	if err != nil {
		return err
	}

	return nil
}

func UnmarshalReasonFromDatabase(id string, title map[string]string, deprecated bool) *Reason {
	return &Reason{
		id:         id,
		title:      localization.UnmarshalTranslationFromDatabase(title),
		deprecated: deprecated,
	}
}
