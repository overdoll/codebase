package mailing

import (
	"bytes"
	"embed"
	"fmt"
	htmlTemplate "html/template"
	"jaytaylor.com/html2text"
	textTemplate "text/template"
)

//go:embed views/support/*.gohtml views/templates/**/*.gohtml
var htmlTmplFS embed.FS

//go:embed views/templates/**/*.gotmpl
var textTmplFS embed.FS

type Template struct {
	bodyText string
	bodyHtml string

	subject string
}

func NewTemplate(template string, args interface{}) (*Template, error) {

	htmlTemplatedResult, err := htmlTemplate.New("email.gohtml").ParseFS(htmlTmplFS, "views/templates/"+template+"/email.gohtml")
	if err != nil {
		return nil, fmt.Errorf("failed to parse html templates: %s", err)
	}

	textTemplatedSubjectResult, err := textTemplate.New("subject.gotmpl").ParseFS(textTmplFS, "views/templates/"+template+"/subject.gotmpl")
	if err != nil {
		return nil, fmt.Errorf("failed to parse subject templates: %s", err)
	}

	var htmlBody bytes.Buffer
	var subjectRaw bytes.Buffer

	if err := htmlTemplatedResult.Execute(&htmlBody, args); err != nil {
		return nil, fmt.Errorf("failed to execute html body template: %s", err)
	}
	if err := textTemplatedSubjectResult.Execute(&subjectRaw, args); err != nil {
		return nil, fmt.Errorf("failed to execute subject template: %s", err)
	}

	text, err := html2text.FromString(htmlBody.String(), html2text.Options{PrettyTables: true})
	if err != nil {
		return nil, fmt.Errorf("failed to convert html to string: %s", err)
	}

	return &Template{
		bodyText: text,
		bodyHtml: htmlBody.String(),
		subject:  subjectRaw.String(),
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
