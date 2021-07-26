package mailing

import (
	"github.com/matcornic/hermes/v2"
)

type Email struct {
	subject   string
	plainText string
	html      string
}

func NewEmail(subject, plainText, html string) (*Email, error) {
	return &Email{
		subject:   subject,
		plainText: plainText,
		html:      html,
	}, nil
}

func (r *Email) Subject() string {
	return r.subject
}

func (r *Email) PlainText() string {
	return r.plainText
}

func (r *Email) HTML() string {
	return r.html
}

func EmailFromTemplate(subject string, email hermes.Email) (*Email, error) {

	html, err := template.GenerateHTML(email)

	if err != nil {
		return nil, err
	}

	plainText, err := template.GeneratePlainText(email)

	if err != nil {
		return nil, err
	}

	return &Email{
		subject:   subject,
		plainText: plainText,
		html:      html,
	}, nil
}
