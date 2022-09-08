package media_processing

type ImageFilters struct {
	pixelate *int
}

func NewImageFilters(pixelate *int) (*ImageFilters, error) {
	return &ImageFilters{pixelate: pixelate}, nil
}

func (i *ImageFilters) Pixelate() *int {
	return i.pixelate
}
