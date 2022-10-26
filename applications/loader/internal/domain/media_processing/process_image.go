package media_processing

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/vips"
)

const (
	jpegQuality = 85
)

type processImageSizes struct {
	name              string
	constraint        int
	resize            bool
	mandatory         bool
	smartCrop         bool
	original          bool
	originalQuality   string
	quality           string
	alternateOriginal bool
}

var postContentSizes = []*processImageSizes{
	{
		name:            "hd",
		constraint:      4096,
		mandatory:       true,
		original:        true,
		originalQuality: "95",
		quality:         "85",
	},
	{
		name:              "large",
		constraint:        2048,
		mandatory:         true,
		alternateOriginal: true,
		quality:           "85",
	},
	{
		name:       "medium",
		constraint: 1200,
		quality:    "85",
	},
	{
		name:       "small",
		constraint: 720,
		quality:    "85",
	},
	{
		name:       "thumbnail",
		constraint: 300,
		resize:     true,
		smartCrop:  true,
		quality:    "85",
	},
}

var thumbnailSizes = []*processImageSizes{
	{
		name:       "avatar",
		constraint: 400,
		resize:     true,
		mandatory:  true,
	},
	{
		name:       "icon",
		constraint: 200,
		resize:     true,
		mandatory:  true,
	},
	{
		name:       "mini",
		constraint: 100,
		resize:     true,
		mandatory:  true,
	},
}

var banner = []*processImageSizes{
	{
		name:       "large-banner",
		constraint: 1080,
		mandatory:  true,
	},
	{
		name:       "banner",
		constraint: 720,
		mandatory:  true,
	},
	{
		name:       "small-banner",
		constraint: 360,
		mandatory:  true,
	},
}

func processImageWithSizes(target *media.Media, file *os.File, useHd bool) ([]*Move, error) {

	sourceFileName := file.Name()

	dimensions, err := vips.GetImageDimensions(sourceFileName)
	if err != nil {
		return nil, err
	}

	var contentSizes []*processImageSizes

	var imageSizes []*proto.ImageDataSize
	var imageFile string

	fileName := uuid.New().String()

	_ = os.MkdirAll(fileName, os.ModePerm)

	isPortrait := dimensions.Height > dimensions.Width

	switch target.LinkType() {
	case proto.MediaLinkType_POST_CONTENT:
		contentSizes = postContentSizes
		break
	case proto.MediaLinkType_CLUB_THUMBNAIL:
		contentSizes = thumbnailSizes
		break
	case proto.MediaLinkType_CLUB_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_SERIES_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_CATEGORY_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_CHARACTER_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_AUDIENCE_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_TOPIC_BANNER:
		contentSizes = banner
		break
	}

	for _, size := range contentSizes {

		shouldResizeHeight := isPortrait && dimensions.Height > size.constraint
		shouldResizeWidth := !isPortrait && dimensions.Width > size.constraint

		requiresHDOriginal := useHd && ((isPortrait && dimensions.Height <= 1500) || (!isPortrait && dimensions.Width <= 1500))

		// don't make "large" mandatory if we have a dimension greater than 1600px, since the hd original will be this good quality
		if useHd && !requiresHDOriginal && size.alternateOriginal && size.mandatory {
			size.mandatory = false
		}

		if !shouldResizeWidth && !shouldResizeHeight && !size.mandatory {
			continue
		}

		imageName := size.name + ".jpg"
		imageFileName := fileName + "/" + imageName

		if size.resize {
			if err := vips.Thumbnail(sourceFileName, imageFileName, size.constraint, size.smartCrop, size.quality); err != nil {
				return nil, errors.Wrap(err, "failed to create thumbnail from image")
			}
		} else {
			var targetSize int

			if shouldResizeHeight {
				targetSize = dimensions.Height
			} else if shouldResizeWidth {
				targetSize = dimensions.Width
			}

			var factor float64

			if targetSize != 0 {
				factor = float64(size.constraint) / float64(targetSize)
			} else {
				factor = 1
			}

			quality := "85"

			// set custom quality if needed
			if size.quality != "" {
				quality = size.quality
			}

			if useHd && size.original && !shouldResizeWidth && !shouldResizeHeight {
				if requiresHDOriginal {
					quality = size.originalQuality
				}
			}

			if err := vips.Resize(sourceFileName, imageFileName, factor, quality); err != nil {
				return nil, errors.Wrap(err, "failed to resize image by height")
			}
		}

		data, err := vips.GetImageDimensions(imageFileName)
		if err != nil {
			return nil, errors.Wrap(err, "failed to get image dimension")
		}

		imageSizes = append(imageSizes, &proto.ImageDataSize{
			Id:     imageName,
			Width:  uint32(data.Width),
			Height: uint32(data.Height),
		})

		if imageFile == "" {
			imageFile = imageFileName
		}
	}

	finalImageFile, err := os.Open(imageFile)
	if err != nil {
		return nil, errors.Wrap(err, "failed to open base image")
	}

	defer finalImageFile.Close()

	palettes, _, err := createPreviewFromFile(finalImageFile, false)

	if err != nil {
		return nil, err
	}

	// update the source image data
	target.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Sizes:    imageSizes,
		Palettes: palettes,
	}

	return []*Move{
		{
			directory: fileName,
			isImage:   true,
		},
	}, nil
}
