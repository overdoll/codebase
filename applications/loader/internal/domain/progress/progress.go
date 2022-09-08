package progress

type Progress struct {
	itemId     string
	resourceId string
	progress   float64
	state      ProgressState
}

func (p *Progress) ItemId() string {
	return p.itemId
}

func (p *Progress) ResourceId() string {
	return p.resourceId
}

func (p *Progress) Progress() float64 {
	return p.progress
}

func (p *Progress) State() ProgressState {
	return p.state
}

func NewWaiting(itemId, resourceId string) *Progress {
	return &Progress{
		progress:   0,
		state:      Waiting,
		itemId:     itemId,
		resourceId: resourceId,
	}
}

func NewProgress(itemId, resourceId string, progress float64) *Progress {

	if progress == -1 {
		return &Progress{
			progress:   0,
			state:      Waiting,
			itemId:     itemId,
			resourceId: resourceId,
		}
	}

	if progress == -2 || progress == 100 {
		return &Progress{
			progress:   100,
			state:      Finalizing,
			itemId:     itemId,
			resourceId: resourceId,
		}
	}

	return &Progress{
		progress:   progress,
		state:      Started,
		itemId:     itemId,
		resourceId: resourceId,
	}
}
