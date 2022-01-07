package account

type EmailStatus struct {
	slug string
}

var (
	EmailConfirmed = EmailStatus{"CONFIRMED"}
	EmailPrimary   = EmailStatus{"PRIMARY"}
)

func (r EmailStatus) String() string {
	return r.slug
}
