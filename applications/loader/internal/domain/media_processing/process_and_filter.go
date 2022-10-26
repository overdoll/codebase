package media_processing

import (
	"github.com/disintegration/gift"
	"github.com/h2non/filetype"
	"go.uber.org/zap"
	"image"
	"image/jpeg"
	"image/png"
	_ "image/png"
	"io"
	"math"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/vips"
	"strings"
)

type ErrorMediaCallbackNotFound struct{}

func newMediaCallbackNotFound() error {
	return &ErrorMediaCallbackNotFound{}
}

func (c *ErrorMediaCallbackNotFound) Error() string {
	return "media callback not found"
}

var (
	ErrFileTypeNotAllowed    = domainerror.NewValidation("filetype not allowed")
	ErrMediaCallbackNotFound = newMediaCallbackNotFound()
)

// accepted formats
var (
	imageAcceptedTypes = []string{"image/png", "image/jpeg"}
	videoAcceptedTypes = []string{"video/mp4", "video/x-m4v", "video/quicktime", "video/webm"}
)

func IsVideo(mimeType string) bool {
	for _, mime := range videoAcceptedTypes {
		if mimeType == mime {
			return true
		}
	}

	return false
}

func processImage(media *media.Media, mimeType string, file *os.File) (*ProcessResponse, error) {

	sourceFileName := file.Name()

	_, err := vips.GetImageDimensions(sourceFileName)
	if err != nil {
		if strings.Contains(err.Error(), "VipsJpeg: Corrupt JPEG data") {
			return &ProcessResponse{failed: true}, nil
		}
		return nil, err
	}

	move, err := processImageWithSizes(media, file, true)

	if err != nil {
		return nil, err
	}

	return &ProcessResponse{move: move}, nil
}

func ProcessMedia(media *media.Media, file *os.File) (*ProcessResponse, error) {

	defer os.Remove(file.Name())
	defer file.Close()

	headBuffer := make([]byte, 261)
	_, err := file.Read(headBuffer)
	if err != nil {
		return nil, err
	}

	// do a mime type check on the file to make sure its an accepted file and to get our extension
	kind, _ := filetype.Match(headBuffer)
	if kind == filetype.Unknown {
		return &ProcessResponse{failed: true}, nil
	}

	// seek file, so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

	foundImage := false
	foundVideo := false
	mimeType := kind.MIME.Value

	for _, m := range imageAcceptedTypes {
		if m == mimeType {
			foundImage = true
			break
		}
	}

	for _, m := range videoAcceptedTypes {
		if m == mimeType {
			foundVideo = true
			break
		}
	}

	var response *ProcessResponse

	if foundImage {
		response, err = processImage(media, mimeType, file)

		if err != nil {
			return nil, err
		}
	}

	if foundVideo {
		response, err = processVideo(media, file)

		if err != nil {
			return nil, err
		}
	}

	if !foundImage && !foundVideo {
		zap.S().Errorw("unknown mime type", zap.String("mimeType", mimeType))
		return &ProcessResponse{failed: true}, nil
	}

	media.RawProto().State.Processed = true
	media.RawProto().State.Failed = false

	return response, nil
}

func ApplyFilters(media *media.Media, file *os.File, filters *ImageFilters, mimeType proto.MediaMimeType) (*ProcessResponse, error) {

	defer file.Close()
	defer os.Remove(file.Name())

	var src image.Image
	var err error

	if mimeType == proto.MediaMimeType_ImagePng {
		src, err = png.Decode(file)
		if err != nil {
			return nil, errors.Wrap(err, "failed to decode png")
		}
	} else {
		src, err = jpeg.Decode(file)
		if err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}
	}

	// create and apply filters
	g := gift.New()

	if filters.Pixelate() != nil {
		pixelateAmount := *filters.Pixelate()
		// in order to have a consistent pixelation filter, regardless of how large the image is,
		// we take the total amount of pixels in the image (w * h) and multiply by the percentage
		// this will be the # of pixels left
		totalPixels := float64(src.Bounds().Dx()) * float64(pixelateAmount) / float64(100)
		pixelateValue := int(math.Floor(totalPixels))
		g.Add(gift.Pixelate(pixelateValue))
	}

	pixelatedSrc := image.NewNRGBA(g.Bounds(src.Bounds()))
	g.Draw(pixelatedSrc, src)

	newFile, err := os.Create(uuid.New().String())
	if err != nil {
		return nil, errors.Wrap(err, "failed to create temporary file")
	}

	defer newFile.Close()
	defer os.Remove(newFile.Name())

	err = jpeg.Encode(newFile, pixelatedSrc, &jpeg.Options{Quality: jpegQuality})
	if err != nil {
		return nil, errors.Wrap(err, "failed to encode pixelated jpeg")
	}

	_, _ = newFile.Seek(0, io.SeekStart)
	move, err := processImageWithSizes(media, newFile, false)

	if err != nil {
		return nil, err
	}

	media.RawProto().State.Processed = true
	media.RawProto().State.Failed = false

	return &ProcessResponse{move: move}, nil
}
