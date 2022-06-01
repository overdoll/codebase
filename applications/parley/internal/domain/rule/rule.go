package rule

import (
	"bytes"
	"github.com/go-playground/validator/v10"
	"github.com/yuin/goldmark"
	"overdoll/libraries/domainerror"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"

	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var (
	ErrRuleNotFound   = domainerror.NewValidation("rule not found")
	ErrRuleDeprecated = domainerror.NewValidation("rule not found")
)

type Rule struct {
	*paging.Node

	deprecated  bool
	infraction  bool
	id          string
	title       *localization.Translation
	description *localization.Translation
}

func NewRule(requester *principal.Principal, title, description string, infraction bool) (*Rule, error) {

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

	descriptionT, err := localization.NewDefaultTranslation(description)
	if err != nil {
		return nil, err
	}

	if err := validateTitle(title); err != nil {
		return nil, err
	}

	if err := validateDescription(description); err != nil {
		return nil, err
	}

	return &Rule{
		id:          uuid.New().String(),
		title:       titleT,
		description: descriptionT,
		infraction:  infraction,
		deprecated:  false,
	}, nil
}

func (m *Rule) ID() string {
	return m.id
}

func (m *Rule) Title() *localization.Translation {
	return m.title
}

func (m *Rule) Description() *localization.Translation {
	return m.description
}

func (m *Rule) Deprecated() bool {
	return m.deprecated
}

func (m *Rule) Infraction() bool {
	return m.infraction
}

func (m *Rule) UpdateTitle(requester *principal.Principal, title, locale string) error {

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

func (m *Rule) UpdateDescription(requester *principal.Principal, description, locale string) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	if err := validateDescription(description); err != nil {
		return err
	}

	if err := m.description.UpdateTranslation(description, locale); err != nil {
		return err
	}

	return nil
}

func (m *Rule) UpdateDeprecated(requester *principal.Principal, deprecated bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.deprecated = deprecated
	return nil
}

func (m *Rule) UpdateInfraction(requester *principal.Principal, infraction bool) error {

	if err := m.canUpdate(requester); err != nil {
		return err
	}

	m.infraction = infraction
	return nil
}

func (m *Rule) canUpdate(requester *principal.Principal) error {

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
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func validateDescription(description string) error {

	if description == "" {
		return nil
	}

	// attempt markdown conversion
	var buf bytes.Buffer
	if err := goldmark.Convert([]byte(description), &buf); err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func UnmarshalRuleFromDatabase(id string, title map[string]string, description map[string]string, infraction, deprecated bool) *Rule {
	return &Rule{
		id:          id,
		title:       localization.UnmarshalTranslationFromDatabase(title),
		description: localization.UnmarshalTranslationFromDatabase(description),
		infraction:  infraction,
		deprecated:  deprecated,
	}
}
