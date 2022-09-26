package media_processing

import (
	"github.com/EdlinOrg/prominentcolor"
	"github.com/pixiv/go-libjpeg/jpeg"
	"image"
	"image/png"
	"io"
	"math"
	"overdoll/libraries/errors"
	"overdoll/libraries/media/proto"
)

func createPreviewFromFile(r io.Reader, isPng bool) ([]*proto.ColorPalette, image.Image, error) {

	var img image.Image
	var err error

	if isPng {
		img, err = png.Decode(r)

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode png for preview")
		}
	} else {
		img, err = jpeg.Decode(r, &jpeg.DecoderOptions{})

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode jpeg for preview")
		}
	}

	var cols []prominentcolor.ColorItem

	cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)

	if err != nil {
		return nil, nil, err
	}

	totalPixels := 0

	for _, c := range cols {
		totalPixels += c.Cnt
	}

	var palettes []*proto.ColorPalette

	for i, col := range cols {

		if i == 3 {
			break
		}

		palettes = append(palettes, &proto.ColorPalette{
			Percent: math.Round(100*(float64(col.Cnt)/float64(totalPixels)*float64(100))) / 100,
			Red:     col.Color.R,
			Green:   col.Color.G,
			Blue:    col.Color.B,
		})
	}

	return palettes, img, nil
}
