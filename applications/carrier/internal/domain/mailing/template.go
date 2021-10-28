package mailing

type Template struct {
	templateId string
	variables  map[string]interface{}
}

func NewTemplate(templateId string, variables map[string]interface{}) (*Template, error) {
	return &Template{
		templateId: templateId,
		variables:  variables,
	}, nil
}

func (r *Template) TemplateId() string {
	return r.templateId
}

func (r *Template) Variables() map[string]interface{} {
	return r.variables
}
