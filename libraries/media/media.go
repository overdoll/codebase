package media

import (
	"fmt"
	_ "image/png"
	"net/url"
	"os"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media/proto"
	"strings"
)

var (
	ErrMediaNotPresent = domainerror.NewValidation("media is not present")
)

type Media struct {
	proto  *proto.Media
	legacy string
}

func FromProto(source *proto.Media) *Media {
	return &Media{proto: source}
}

func (m *Media) ID() string {
	return m.proto.Id
}

func (m *Media) OriginalFileName() string {
	return m.proto.OriginalFileName
}

func (m *Media) RawProto() *proto.Media {
	return m.proto
}

func (m *Media) getPrefixKey() string {
	return strings.ToLower(m.proto.Link.Type.String()) + "/" + m.proto.Link.Id
}

func (m *Media) ImagePrefix() string {
	return "private/images/" + m.getPrefixKey()
}

func (m *Media) VideoPrefix() string {
	return "private/videos/" + m.getPrefixKey()
}

// ImageOriginalDownloadKey - the path for the image to download it
func (m *Media) ImageOriginalDownloadKey() string {

	if !m.proto.State.Processed {
		return ""
	}

	var largestSize *proto.ImageDataSize

	for _, size := range m.proto.ImageData.Sizes {
		if largestSize == nil {
			largestSize = size
		} else {
			if size.Width > largestSize.Width && size.Height > largestSize.Height {
				largestSize = size
			}
		}
	}

	return "private/images/" + m.getPrefixKey() + "/" + m.proto.ImageData.Id + "/" + largestSize.Id
}

func (m *Media) IsPrivate() bool {
	return m.proto.Private
}

func (m *Media) IsLegacy() bool {
	return m.legacy != ""
}

func (m *Media) LegacyImageWidth() int {

	if m.proto.ImageData != nil {
		return int(m.proto.ImageData.Sizes[0].Width)
	}

	return 0
}

func (m *Media) LegacyImageHeight() int {

	if m.proto.ImageData != nil {
		return int(m.proto.ImageData.Sizes[0].Height)
	}

	return 0
}

func (m *Media) ImageMimeType() proto.MediaMimeType {
	return m.proto.ImageData.MimeType
}

func (m *Media) IsProcessed() bool {
	return m.proto.State.Processed
}

func (m *Media) IsLinked() bool {
	return m.proto.Source != nil
}

func (m *Media) IsFailed() bool {
	return m.proto.State.Failed
}

func (m *Media) LegacyResource() string {
	return m.legacy
}

func (m *Media) SourceMediaId() string {
	return m.proto.Source.SourceMediaId
}

func (m *Media) UniqueId() string {
	return m.proto.Link.Id + "-" + m.proto.Id
}

func (m *Media) LinkedId() string {
	return m.proto.Link.Id
}

func (m *Media) LinkType() proto.MediaLinkType {
	return m.proto.Link.Type
}

func (m *Media) SourceLinkType() proto.MediaLinkType {
	return m.proto.Source.Link.Type
}

func (m *Media) IsVideo() bool {
	return m.proto.VideoData != nil
}

func (m *Media) VideoAspectRatioWidth() int {

	if m.proto.VideoData != nil {
		return int(m.proto.VideoData.AspectRatio.Width)
	}

	return 0
}

func (m *Media) VideoAspectRatioHeight() int {

	if m.proto.VideoData != nil {
		return int(m.proto.VideoData.AspectRatio.Height)
	}

	return 0
}

func (m *Media) LegacyPreview() string {

	if !m.IsProcessed() {
		return ""
	}

	if len(m.proto.ImageData.Palettes) == 0 {
		return ""
	}

	first := m.proto.ImageData.Palettes[0]

	return fmt.Sprintf("#%02x%02x%02x", first.Red, first.Green, first.Blue)
}

func (m *Media) VideoDuration() int {

	if m.proto.VideoData != nil {
		return int(m.proto.VideoData.DurationMilliseconds)
	}

	return 0
}

func (m *Media) ColorPalettes() []*ColorPalette {
	var palettes []*ColorPalette

	for _, pal := range m.proto.ImageData.Palettes {
		palettes = append(palettes, &ColorPalette{
			percent: pal.Percent,
			red:     int(pal.Red),
			green:   int(pal.Green),
			blue:    int(pal.Blue),
		})
	}

	return palettes
}

func (m *Media) HasAudio() bool {
	if m.proto.VideoData != nil {
		return m.proto.VideoData.HasAudio
	}

	return false
}

func (m *Media) VideoNoAudio() bool {
	if m.proto.VideoData != nil {
		return !m.proto.VideoData.HasAudio
	}

	return false
}

func (m *Media) VideoContainers() []*VideoContainer {

	var containers []*VideoContainer

	for _, container := range m.proto.VideoData.Containers {
		containers = append(containers, &VideoContainer{
			url:      m.generateUrlForVideo(container.Id, container.MimeType == proto.MediaMimeType_VideoMpegUrl),
			bitrate:  int(container.Bitrate),
			width:    int(container.Width),
			height:   int(container.Height),
			mimeType: container.MimeType,
			device:   container.TargetDevice,
		})
	}

	return containers
}

func (m *Media) generateUrlForVideo(id string, usePrefix bool) string {

	if m.IsLegacy() {
		signed, _ := serializer.createSignedUrl(SerializerPolicy{
			URI: os.Getenv("PRIVATE_RESOURCES_URL") + "/" + m.proto.Link.Id + "/" + id,
		})
		return signed
	}

	finalUrl := url.URL{}

	finalUrl.Host = os.Getenv("MEDIA_HOST")
	finalUrl.Path = m.VideoPrefix() + "/" + m.proto.VideoData.Id + "/" + id
	finalUrl.Scheme = "https"

	// for video signed urls, we add a prefix so that it can be passed down without needing to sign playlists each time
	signed, _ := serializer.createSignedUrl(SerializerPolicy{
		URI:                 finalUrl.String(),
		UseWildcardCacheKey: "https://" + finalUrl.Host + "/" + m.VideoPrefix() + "/" + m.proto.VideoData.Id + "/*",
		UsePrefix:           usePrefix,
	})

	return signed
}

func (m *Media) generateUrlForImage(optimalSizes []int) *ImageMediaAccess {

	if m.IsLegacy() {
		return m.LegacyImageMediaAccess()
	}

	var lastSize *proto.ImageDataSize

	for _, size := range m.proto.ImageData.Sizes {

		if len(optimalSizes) == 0 {
			lastSize = size
			break
		}

		isPortrait := size.Height > size.Width

		var targetSize int

		if isPortrait {
			targetSize = int(size.Height)
		} else {
			targetSize = int(size.Width)
		}

	out:
		for _, optimalSize := range optimalSizes {
			if optimalSize == targetSize {
				lastSize = size
				break out
			} else if optimalSize > targetSize {
				if lastSize == nil {
					lastSize = size
				} else {
					var sourceTargetSize int

					if isPortrait {
						sourceTargetSize = int(lastSize.Height)
					} else {
						sourceTargetSize = int(lastSize.Width)
					}

					if targetSize > sourceTargetSize {
						lastSize = size
					}
				}
			}
		}

	}

	if lastSize == nil {
		lastSize = m.proto.ImageData.Sizes[0]
	}

	finalUrl := url.URL{}

	finalUrl.RawQuery = url.Values{}.Encode()
	finalUrl.Host = os.Getenv("MEDIA_HOST")
	finalUrl.Scheme = "https"
	finalUrl.Path = m.ImagePrefix() + "/" + m.proto.ImageData.Id + "/" + lastSize.Id

	signed, _ := serializer.createSignedUrl(SerializerPolicy{
		URI:                 finalUrl.String(),
		UseWildcardCacheKey: "https://" + finalUrl.Host + "/" + m.ImagePrefix() + "/" + m.proto.ImageData.Id + "/*",
	})

	return &ImageMediaAccess{
		url:    signed,
		width:  int(lastSize.Width),
		height: int(lastSize.Height),
	}
}

func (m *Media) generateUrlForLegacyImage(webp bool) *ImageMediaAccess {

	var finalUrl string

	key := "/" + m.proto.Link.Id + "/" + m.proto.ImageData.Id

	if m.IsLegacy() {
		if m.proto.ImageData.MimeType == proto.MediaMimeType_ImageJpeg {
			if webp {
				key += ".webp"
			} else {
				key += ".jpg"
			}
		} else if m.proto.ImageData.MimeType == proto.MediaMimeType_ImagePng {
			key += ".png"
		}
	} else {
		key += "/" + m.proto.ImageData.Sizes[0].Id
	}

	if m.proto.Private {

		signedURL, _ := serializer.createSignedUrl(SerializerPolicy{URI: os.Getenv("PRIVATE_RESOURCES_URL") + key})

		finalUrl = signedURL

	} else {
		finalUrl = os.Getenv("RESOURCES_URL") + key
	}

	return &ImageMediaAccess{
		url:    finalUrl,
		width:  int(m.proto.ImageData.Sizes[0].Width),
		height: int(m.proto.ImageData.Sizes[0].Height),
	}
}

func (m *Media) LegacyWebpMediaAccess() *ImageMediaAccess {
	return m.generateUrlForLegacyImage(true)
}

func (m *Media) LegacyImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForLegacyImage(false)
}

// OriginalImageMediaAccess original image is always max of 4096
func (m *Media) OriginalImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{})
}

func (m *Media) HdImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{4096})
}

func (m *Media) MiniImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{100})
}

func (m *Media) IconImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{200})
}

func (m *Media) AvatarImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{400})
}

func (m *Media) ThumbnailImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{300})
}

func (m *Media) SmallImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{720})
}

func (m *Media) MediumImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{1200})
}

func (m *Media) LargeImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{2048})
}

func (m *Media) BannerImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{720})
}

func (m *Media) SmallBannerImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage([]int{360})
}
