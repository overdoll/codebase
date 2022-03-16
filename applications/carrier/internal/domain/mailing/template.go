package mailing

import (
	"bytes"
	"embed"
	htmlTemplate "html/template"
)

//go:embed views/*.gohtml
var htmlTmplFS embed.FS
var htmlTemplates *htmlTemplate.Template

//go:embed views/*.gotmpl
var textTmplFS embed.FS

type Template struct {
	bodyText string
	bodyHtml string

	subject string
}

func init() {
	htmlTemplates = htmlTemplate.Must(htmlTemplate.New("").ParseFS(htmlTmplFS, "views/*.gohtml"))
}

func NewTemplate(template string, args interface{}) (*Template, error) {

	htmlTemplateClone, err := htmlTemplates.Clone()
	if err != nil {
		return nil, err
	}

	htmlTemplatedResult, err := htmlTemplateClone.ParseFS(htmlTmplFS, "views/templates/"+template+"/email.gohtml")
	if err != nil {
		return nil, err
	}

	textTemplatedResult, err := htmlTemplate.New(template).ParseFS(textTmplFS, "views/templates/"+template+"/plaintext.gotmpl")
	if err != nil {
		return nil, err
	}

	textTemplatedSubjectResult, err := htmlTemplate.New(template).ParseFS(textTmplFS, "views/templates/"+template+"/subject.gotmpl")
	if err != nil {
		return nil, err
	}

	var htmlBody bytes.Buffer
	var textBody bytes.Buffer
	var subjectRaw bytes.Buffer

	if err := htmlTemplatedResult.Execute(&htmlBody, args); err != nil {
		return nil, err
	}
	if err := textTemplatedResult.Execute(&textBody, args); err != nil {
		return nil, err
	}
	if err := textTemplatedSubjectResult.Execute(&subjectRaw, args); err != nil {
		return nil, err
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
