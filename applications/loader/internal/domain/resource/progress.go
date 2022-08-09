package resource

type Progress struct {
	progress float64
	state    ProgressState
}

func (p *Progress) Progress() float64 {
	return p.progress
}

func (p *Progress) State() ProgressState {
	return p.state
}

func NewWaiting() *Progress {
	return &Progress{
		progress: 0,
		state:    Waiting,
	}
}

func NewProgress(progress float64) *Progress {

	if progress == -1 {
		return &Progress{
			progress: 0,
			state:    Waiting,
		}
	}

	if progress == -2 || progress == 100 {
		return &Progress{
			progress: 100,
			state:    Finalizing,
		}
	}

	return &Progress{
		progress: progress,
		state:    Started,
	}
}
