package mailing

import (
	"bytes"
	"embed"
	"fmt"
	htmlTemplate "html/template"
	textTemplate "text/template"
)

//go:embed views/support/*.gohtml views/templates/**/*.gohtml
var htmlTmplFS embed.FS
var htmlTemplates *htmlTemplate.Template

//go:embed views/templates/**/*.gotmpl
var textTmplFS embed.FS

type Template struct {
	bodyText string
	bodyHtml string

	subject string
}

func init() {
	htmlTemplates = htmlTemplate.Must(htmlTemplate.New("layouts").ParseFS(htmlTmplFS, "views/support/*.gohtml"))
}

func NewTemplate(template string, args interface{}) (*Template, error) {

	htmlTemplateClone, err := htmlTemplates.Clone()
	if err != nil {
		return nil, fmt.Errorf("failed to clone templates: %s", err)
	}

	htmlTemplatedResult, err := htmlTemplateClone.New("email.gohtml").ParseFS(htmlTmplFS, "views/templates/"+template+"/email.gohtml")
	if err != nil {
		return nil, fmt.Errorf("failed to parse html templates: %s", err)
	}

	textTemplatedResult, err := textTemplate.New("plaintext.gotmpl").ParseFS(textTmplFS, "views/templates/"+template+"/plaintext.gotmpl")
	if err != nil {
		return nil, fmt.Errorf("failed to parse plaintext templates: %s", err)
	}

	textTemplatedSubjectResult, err := textTemplate.New("subject.gotmpl").ParseFS(textTmplFS, "views/templates/"+template+"/subject.gotmpl")
	if err != nil {
		return nil, fmt.Errorf("failed to parse subject templates: %s", err)
	}

	var htmlBody bytes.Buffer
	var textBody bytes.Buffer
	var subjectRaw bytes.Buffer

	if err := htmlTemplatedResult.Execute(&htmlBody, args); err != nil {
		return nil, fmt.Errorf("failed to execute html body template: %s", err)
	}
	if err := textTemplatedResult.Execute(&textBody, args); err != nil {
		return nil, fmt.Errorf("failed to execute plaintext body template: %s", err)
	}
	if err := textTemplatedSubjectResult.Execute(&subjectRaw, args); err != nil {
		return nil, fmt.Errorf("failed to execute subject template: %s", err)
	}

	return &Template{
		bodyText: textBody.String(),
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
