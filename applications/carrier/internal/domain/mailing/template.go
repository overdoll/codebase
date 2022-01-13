package mailing

type Template struct {
	bodyText string
	bodyHtml string

	subject string
}

func NewTemplate(subject, bodyHtml, bodyText string) (*Template, error) {
	return &Template{
		bodyText: bodyText,
		bodyHtml: bodyHtml,
		subject:  subject,
	}, nil
}

func (r *Template) BodyText() string {
	return r.bodyText
}

func (r *Template) BodyHtml() string {
	return r.bodyHtml
}

func (r *Template) Subject() string {
	return r.subject
}
