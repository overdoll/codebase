package media_processing

type ProcessResponse struct {
	move   []*Move
	failed bool
}

func (p *ProcessResponse) Failed() bool {
	return p.failed
}
