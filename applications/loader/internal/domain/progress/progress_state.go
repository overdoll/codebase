package progress

type ProgressState struct {
	slug string
}

var (
	Waiting    = ProgressState{"WAITING"}
	Started    = ProgressState{"STARTED"}
	Finalizing = ProgressState{"FINALIZING"}
)

func (r ProgressState) String() string {
	return r.slug
}
