package resource

import (
	"github.com/disintegration/gift"
	"image"
	"image/png"
	"os"
	"overdoll/libraries/errors"
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
	src, err := png.Decode(file)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode a file for filters")
	}

	// create and apply filters
	g := gift.New()

	if i.Pixelate() != nil {
		g.Add(gift.Pixelate(*i.Pixelate()))
	}

	dst := image.NewNRGBA(g.Bounds(src.Bounds()))
	g.Draw(dst, src)

	_ = file.Close()

	// create filtered version of the file
	newFile, err := os.Create("filtered-" + file.Name())

	if err != nil {
		return nil, err
	}

	// encode the file to png
	if err := png.Encode(newFile, dst); err != nil {
		return nil, errors.Wrap(err, "failed to encode png file")
	}

	return newFile, nil
}
