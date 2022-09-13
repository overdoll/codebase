package media

import (
	"fmt"
	_ "image/png"
	"net/url"
	"os"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media/proto"
	"strconv"
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

	return "private/images/" + m.getPrefixKey() + "/" + m.proto.ImageData.Id
}

func (m *Media) IsPrivate() bool {
	return m.proto.Private
}

func (m *Media) IsLegacy() bool {
	return m.legacy != ""
}

func (m *Media) ImageWidth() int {

	if m.proto.ImageData != nil {
		return int(m.proto.ImageData.Width)
	}

	return 0
}

func (m *Media) ImageHeight() int {

	if m.proto.ImageData != nil {
		return int(m.proto.ImageData.Height)
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
		return fmt.Sprintf("#%02x%02x%02x", 0, 0, 0)
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
			url:      m.generateUrlForVideo(container.Id),
			bitrate:  int(container.Bitrate),
			width:    int(container.Width),
			height:   int(container.Height),
			mimeType: container.MimeType,
		})
	}

	return containers
}

func (m *Media) generateUrlForVideo(id string) string {
	finalUrl := url.URL{}

	if m.IsLegacy() {
		finalUrl.Host = os.Getenv("PRIVATE_RESOURCES_URL")
		finalUrl.Path = m.proto.Link.Id + "/" + m.proto.ImageData.Id
	} else {
		finalUrl.Host = os.Getenv("MEDIA_HOST")
		finalUrl.Path = m.VideoPrefix() + "/" + id
	}

	finalUrl.Scheme = "https"
	signed, _ := serializer.createSignedUrl(finalUrl.String())
	return signed
}

func (m *Media) generateUrlForImage(width, height int64, optimize bool) *ImageMediaAccess {

	if m.IsLegacy() {

		var finalUrl string

		key := "/" + m.proto.Link.Id + "/" + m.proto.ImageData.Id

		if m.proto.Private {

			signedURL, _ := serializer.createSignedUrl(os.Getenv("PRIVATE_RESOURCES_URL") + key)

			finalUrl = signedURL

		} else {
			finalUrl = os.Getenv("RESOURCES_URL") + key
		}

		return &ImageMediaAccess{
			url:    finalUrl,
			width:  int(m.proto.ImageData.Width),
			height: int(m.proto.ImageData.Height),
		}
	}

	if width >= m.proto.ImageData.Width {
		width = m.proto.ImageData.Width
	}

	if height >= m.proto.ImageData.Height {
		height = m.proto.ImageData.Height
	}

	var format string

	if m.proto.ImageData.MimeType == proto.MediaMimeType_ImageJpeg {
		format = "jpeg"
	}

	if m.proto.ImageData.MimeType == proto.MediaMimeType_ImagePng {
		format = "jpeg"
	}

	q := url.Values{}
	q.Add("format", format)

	if width != m.proto.ImageData.Width && width != 0 && optimize {
		q.Add("width", strconv.Itoa(int(m.proto.ImageData.Width)))
	}

	if height != m.proto.ImageData.Height && height != 0 {
		q.Add("height", strconv.Itoa(int(m.proto.ImageData.Height)))
	}

	finalUrl := url.URL{}

	finalUrl.RawQuery = q.Encode()
	finalUrl.Host = os.Getenv("MEDIA_HOST")
	finalUrl.Scheme = "https"
	finalUrl.Path = m.ImagePrefix() + "/" + m.proto.ImageData.Id

	signed, _ := serializer.createSignedUrl(finalUrl.String())

	return &ImageMediaAccess{
		url:    signed,
		width:  int(width),
		height: int(height),
	}
}

func (m *Media) OriginalImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(0, 0, false)
}

func (m *Media) HdImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(4096, 0, true)
}

func (m *Media) MiniImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(50, 50, false)
}

func (m *Media) IconImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(100, 100, false)
}

func (m *Media) ThumbnailImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(150, 150, false)
}

func (m *Media) ThumbnailHDImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(200, 200, false)
}

func (m *Media) SmallImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(768, 0, true)
}

func (m *Media) MediumImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(1366, 0, true)
}

func (m *Media) LargeImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(1920, 0, true)
}

func (m *Media) BannerImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(640, 0, true)
}

func (m *Media) Video480ImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(480, 0, true)
}

func (m *Media) Video720ImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(720, 0, true)
}

func (m *Media) Video1080ImageMediaAccess() *ImageMediaAccess {
	return m.generateUrlForImage(1080, 0, true)
}
