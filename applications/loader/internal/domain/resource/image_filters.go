package resource

import (
	"github.com/disintegration/gift"
	"image"
	"image/png"
	"os"
)

type ImageFilters struct {
	pixelate *int
}

func NewImageFilters(pixelate *int) (*ImageFilters, error) {
	return &ImageFilters{pixelate: pixelate}, nil
}

func (i *ImageFilters) Pixelate() *int {
	return i.pixelate
}

// ApplyFilters - apply filters to a file. only outputs a PNG image for now
func (i *ImageFilters) ApplyFilters(file *os.File) (*os.File, error) {
	// decode image file
	src, _, err := image.Decode(file)

	// create and apply filters
	g := gift.New()

	if i.Pixelate() != nil {
		g.Add(gift.Pixelate(*i.Pixelate()))
	}

	dst := image.NewNRGBA(g.Bounds(src.Bounds()))
	g.Draw(dst, src)

	// create filtered version of the file
	newFile, err := os.Create("filtered-" + file.Name())

	if err != nil {
		return nil, err
	}

	// encode the file to png
	if err = png.Encode(newFile, dst); err != nil {
		return nil, err
	}

	return newFile, nil
}
