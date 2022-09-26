package media_processing

import (
	"github.com/h2non/bimg"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
)

const (
	jpegQuality = 85
)

type processImageSizes struct {
	name       string
	constraint int
	resize     bool
	mandatory  bool
}

var postContentSizes = []*processImageSizes{
	{
		name:       "hd",
		constraint: 4096,
		mandatory:  true,
	},
	{
		name:       "large",
		constraint: 2048,
	},
	{
		name:       "medium",
		constraint: 1200,
	},
	{
		name:       "small",
		constraint: 680,
	},
	{
		name:       "thumbnail",
		constraint: 150,
		resize:     true,
	},
}

var thumbnailSizes = []*processImageSizes{
	{
		name:       "icon",
		constraint: 100,
		resize:     true,
		mandatory:  true,
	},
	{
		name:       "mini",
		constraint: 50,
		resize:     true,
		mandatory:  true,
	},
}

var banner = []*processImageSizes{
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

func processImageWithSizes(target *media.Media, file *os.File) ([]*Move, error) {

	buffer, err := bimg.Read(file.Name())
	if err != nil {
		return nil, errors.Wrap(err, "failed to read image")
	}

	srcImg := bimg.NewImage(buffer)

	imgSize, err := srcImg.Size()
	if err != nil {
		return nil, errors.Wrap(err, "failed to get image")
	}

	var contentSizes []*processImageSizes

	var imageSizes []*proto.ImageDataSize
	var imageFile string

	fileName := uuid.New().String()

	_ = os.MkdirAll(fileName, os.ModePerm)

	isPortrait := imgSize.Height > imgSize.Width

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

		buffer, err := bimg.Read(file.Name())
		if err != nil {
			return nil, errors.Wrap(err, "failed to read image")
		}

		img := bimg.NewImage(buffer)
		imgSize, err := img.Size()

		shouldResizeHeight := isPortrait && imgSize.Height > size.constraint
		shouldResizeWidth := !isPortrait && imgSize.Width > size.constraint

		if !shouldResizeWidth && !shouldResizeHeight && !size.mandatory {
			continue
		}

		options := bimg.Options{}

		if size.resize {

			options.Width = size.constraint
			options.Height = size.constraint
			options.Gravity = bimg.GravitySmart

		} else {

			if shouldResizeHeight {
				options.Height = size.constraint
			} else if shouldResizeWidth {
				options.Width = size.constraint
			}

			options.Embed = true
		}

		options.StripMetadata = true
		options.Quality = jpegQuality
		options.Interlace = true
		options.Type = bimg.JPEG

		processedImage, err := img.Process(options)
		if err != nil {
			return nil, errors.Wrap(err, "failed to process image")
		}

		newImage, err := bimg.NewImage(processedImage).Size()
		if err != nil {
			return nil, errors.Wrap(err, "failed to get new image size")
		}

		//// mozjpeg parameters
		//ep := vips.NewJpegExportParams()
		//ep.StripMetadata = true
		//ep.Quality = jpegQuality
		//ep.Interlace = true
		//ep.OptimizeCoding = true
		//ep.SubsampleMode = vips.VipsForeignSubsampleAuto
		//ep.TrellisQuant = true
		//ep.OvershootDeringing = true
		//ep.OptimizeScans = true
		//ep.QuantTable = 3

		imageName := size.name + ".jpg"
		imageFileName := fileName + "/" + imageName

		if err := bimg.Write(imageFileName, processedImage); err != nil {
			return nil, errors.Wrap(err, "failed to write image")
		}

		imageSizes = append(imageSizes, &proto.ImageDataSize{
			Id:     imageName,
			Width:  uint32(newImage.Width),
			Height: uint32(newImage.Height),
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
