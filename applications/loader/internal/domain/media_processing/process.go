package media_processing

import (
	"bufio"
	bytes2 "bytes"
	"encoding/json"
	"fmt"
	"github.com/EdlinOrg/prominentcolor"
	"github.com/disintegration/gift"
	"github.com/h2non/filetype"
	"github.com/nfnt/resize"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"go.uber.org/zap"
	"image"
	"image/jpeg"
	"image/png"
	_ "image/png"
	"io"
	"io/ioutil"
	"log"
	"math"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"strconv"
	"strings"
	"time"
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

func init() {
	// not ideal but we need to disable the log messages from ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

func createPreviewFromFile(r io.Reader, isPng bool) ([]*proto.ColorPalette, image.Image, error) {

	var img image.Image
	var err error

	if isPng {
		img, err = png.Decode(r)

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode png for preview")
		}
	} else {
		img, err = jpeg.Decode(r)

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode jpeg for preview")
		}
	}

	var cols []prominentcolor.ColorItem

	cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)

	if err != nil {
		return nil, nil, err
	}

	var palettes []*proto.ColorPalette

	for i, col := range cols {

		if i == 3 {
			break
		}

		palettes = append(palettes, &proto.ColorPalette{
			Percent: float64(col.Cnt / len(cols)),
			Red:     int32(col.Color.R),
			Green:   int32(col.Color.G),
			Blue:    int32(col.Color.B),
		})
	}

	return palettes, img, nil
}

type ffmpegProbeStream struct {
	Streams []struct {
		Width              int    `json:"width"`
		Height             int    `json:"height"`
		Duration           string `json:"duration"`
		DisplayAspectRatio string `json:"display_aspect_ratio"`
		NBReadPackets      string `json:"nb_read_packets"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
		BitRate  string `json:"bit_rate"`
	} `json:"format"`
}

func processVideo(media *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()

	videoNoAudio := true

	newVideoFileName := fileName + "/playlist/master.m3u8"

	defaultArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
	}

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	// first, check integrity of mp4 file before proceeding to process the video
	if err := ffmpeg_go.Input(file.Name(), defaultArgs).
		Output("pipe:", ffmpeg_go.KwArgs{
			"format": "rawvideo",
		}).
		WithOutput(ioutil.Discard).
		WithErrorOutput(ffmpegLogger).
		Run(); err != nil && len(ffmpegLogger.Output) > 0 {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return &ProcessResponse{failed: true}, nil
	}

	// probe for audio streams
	str, err := ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"select_streams": "a",
		"show_streams":   "",
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe for audio stream")
	}

	var audioStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &audioStreamProbeResult); err != nil {
		return nil, err
	}

	if len(audioStreamProbeResult.Streams) > 0 {
		bytes := bytes2.NewBuffer(nil)
		// found audio streams - get first audio stream and check if it's silent
		if err := ffmpeg_go.Input(file.Name(), ffmpeg_go.KwArgs{"loglevel": "error"}).
			Output("-", ffmpeg_go.KwArgs{"map": "0:a:0", "af": "astats=metadata=1:reset=0,ametadata=print:file=-:key=lavfi.astats.Overall.RMS_level", "f": "null"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(bytes).
			Run(); err != nil {
			return nil, errors.Wrap(err, string(ffmpegLogger.Output))
		}

		var buffLine []byte

		reader := bufio.NewReader(bytes)

		// from our ffmpeg output, read all lines until we are at the end
		for {
			line, _, err := reader.ReadLine()

			if err == io.EOF {
				break
			}

			buffLine = line
		}

		hasSilentAudioStream := false

		// now, check our final line
		if buffLine != nil {
			result := strings.Split(string(buffLine), "=")
			if len(result) > 1 {
				// if on our final line, the overall RMS_level is -inf, then the audio stream is silent
				if result[1] == "-inf" {
					hasSilentAudioStream = true
				}
			}
		}

		// silent audio stream, remove it
		if hasSilentAudioStream {
			videoNoAudio = true
		}
	} else {
		// no audio streams are on this audio track, add a flag to remove it just in case
		videoNoAudio = true
	}

	// probe for video streams
	str, err = ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"select_streams": "v:0",
		"show_entries":   "stream=width,height",
		"show_format":    "",
	})

	if err != nil {
		return nil, err
	}

	var videoStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &videoStreamProbeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream")
	}

	parsedDuration, err := strconv.ParseFloat(videoStreamProbeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse duration")
	}

	firstStream := videoStreamProbeResult.Streams[0]
	isLandscape := firstStream.Width > firstStream.Height
	isPortrait := firstStream.Width < firstStream.Height

	thumbnailFileName := uuid.New().String()
	var palettes []*proto.ColorPalette
	var img image.Image

	lastFrame := 5
	foundFrame := false

	// keep looking for frames that are not all black (we can successfully generate a preview
	for start := time.Now(); time.Since(start) < time.Second*10; {

		fileThumbnail, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := ffmpeg_go.Input(file.Name(), defaultArgs).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", lastFrame)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			return nil, errors.Wrap(err, string(ffmpegLogger.Output))
		}

		_, _ = fileThumbnail.Seek(0, io.SeekStart)
		palettes, img, err = createPreviewFromFile(fileThumbnail, false)

		if err != nil {
			// fully black image - we want to find a different one
			if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {
				_ = os.Remove(fileThumbnail.Name())
				lastFrame += 30
				continue
			}

			return nil, err
		}

		_ = fileThumbnail.Close()
		foundFrame = true

		break
	}

	if !foundFrame {
		return nil, errors.New("failed to find a frame thumbnail in time")
	}

	requiresResizing := false

	if isPortrait {
		if img.Bounds().Dx() > 1080 {
			requiresResizing = true
		}
	} else {
		if img.Bounds().Dy() > 1080 {
			requiresResizing = true
		}
	}

	// make sure to resize our thumbnail if needed (since we look at the source video for the thumbnail)
	if requiresResizing {
		_ = os.Remove(thumbnailFileName)

		resizeWidth := 1920
		resizeHeight := 1080

		if isLandscape {
			resizeWidth = 1080
			resizeHeight = 1920
		}

		src := resize.Resize(uint(resizeWidth), uint(resizeHeight), img, resize.Lanczos3)

		jpegFile, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := jpeg.Encode(jpegFile, src, &jpeg.Options{Quality: 90}); err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}

		_ = jpegFile.Close()
	}

	encodingArgs := ffmpeg_go.KwArgs{
		"c:v":          "libx264",
		"preset":       "medium",
		"map_metadata": "-1",
		"sn":           "",
		"map":          []string{"0:v:0"},
	}

	hlsArgs := ffmpeg_go.KwArgs{
		"sc_threshold":       "0",
		"hls_time":           "3",
		"force_key_frames:v": "expr:gte(t,n_forced*1)",
		"hls_playlist_type":  "vod",
		"hls_segment_type":   "fmp4",
		"master_pl_name":     newVideoFileName,
	}

	if videoNoAudio {
		encodingArgs["an"] = ""
	} else {
		encodingArgs["map"] = append(encodingArgs["map"].([]string), "0:a:0")
		encodingArgs["c:a"] = "aac"
		encodingArgs["ar"] = "48000"
	}

	socket, err, done := createFFMPEGTempSocket(media.RawProto().Id, parsedDuration)

	if err != nil {
		return nil, err
	}

	// make sure to call this function or socket won't close correctly
	defer done()

	input := ffmpeg_go.Input(file.Name(), map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + socket,
	}).Split()

	var streams []*ffmpeg_go.Stream

	hasDefaultResolution := false
	hasFullHd := false

	if isLandscape {
		// 720+ video detected
		if firstStream.Height >= 720 && firstStream.Width >= 1280 {
			hasDefaultResolution = true
		}

		if firstStream.Height >= 1080 && firstStream.Width >= 1920 {
			hasFullHd = true
		}

	} else if isPortrait {
		if firstStream.Width >= 720 && firstStream.Height >= 1280 {
			hasDefaultResolution = true
		}

		if firstStream.Width >= 1080 && firstStream.Height >= 1920 {
			hasFullHd = true
		}
	}

	if !hasDefaultResolution && !hasFullHd {

		width := strconv.Itoa(firstStream.Width)
		height := strconv.Itoa(firstStream.Width)
		firstPrefix := width + "x" + height

		// add a regular stream
		input.Get("0").Filter("scale", ffmpeg_go.Args{"w=" + width + ":h=" + height + ":force_original_aspect_ratio=decrease"}).Output(fileName+"/playlist/"+firstPrefix+"/original.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
			"crf":                  "22",
			"hls_segment_filename": fileName + "/segment/" + firstPrefix + "/original_%03d.ts",
		}))
	}

	if hasDefaultResolution {

		firstResolution := "w=640:h=-2"
		firstPrefix := "640x360"
		secondResolution := "w=1280:h=-2"
		secondPrefix := "1280x720"
		ThirdResolution := "w=852:h=-2"
		ThirdPrefix := "852x480"
		if isPortrait {
			firstPrefix = "360x640"
			firstResolution = "w=360:h=-2"
			secondResolution = "w=720:h=-2"
			secondPrefix = "720x1280"
			ThirdResolution = "w=480:h=-2"
			ThirdPrefix = "480x852"
		}

		firstSegmentDirectory := fileName + "/segment/" + firstPrefix
		_ = os.MkdirAll(firstSegmentDirectory, os.ModePerm)
		firstPlaylistDirectory := fileName + "/playlist/" + firstPrefix
		_ = os.MkdirAll(firstPlaylistDirectory, os.ModePerm)

		secondSegmentDirectory := fileName + "/segment/" + ThirdPrefix
		_ = os.MkdirAll(secondSegmentDirectory, os.ModePerm)
		secondPlaylistDirectory := fileName + "/playlist/" + ThirdPrefix
		_ = os.MkdirAll(secondPlaylistDirectory, os.ModePerm)

		thirdSegmentDirectory := fileName + "/segment/" + secondPrefix
		_ = os.MkdirAll(thirdSegmentDirectory, os.ModePerm)
		thirdPlaylistDirectory := fileName + "/playlist/" + secondPrefix + "/720p.m3u8"
		_ = os.MkdirAll(thirdPlaylistDirectory, os.ModePerm)

		streams = append(streams,
			// add 360p stream
			input.Get("0").Filter("scale", ffmpeg_go.Args{firstResolution}).Output(firstPlaylistDirectory+"/360p.m3u8", mergeArgs(encodingArgs, mergeArgs(hlsArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "800k",
				//"bufsize":              "1200k",
				//"maxrate":              "856k",
				//"b:a":                  "96k",
				"crf":                  "20",
				"hls_segment_filename": firstSegmentDirectory + "/360p_%03d.ts",
			}))),

			// add a 480p stream
			input.Get("2").Filter("scale", ffmpeg_go.Args{ThirdResolution}).Output(secondPlaylistDirectory+"/480p.m3u8", mergeArgs(encodingArgs, mergeArgs(hlsArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "2800k",
				//"bufsize":              "4200k",
				//"maxrate":              "2996k",
				//"b:a":                  "128k",
				"crf":                  "20",
				"hls_segment_filename": secondSegmentDirectory + "/480p_%03d.ts",
			}))),

			// add a 720p stream
			input.Get("3").Filter("scale", ffmpeg_go.Args{secondResolution}).Output(thirdPlaylistDirectory+"/720p.m3u8", mergeArgs(encodingArgs, mergeArgs(hlsArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "2800k",
				//"bufsize":              "4200k",
				//"maxrate":              "2996k",
				//"b:a":                  "128k",
				"crf":                  "23",
				"hls_segment_filename": thirdSegmentDirectory + "/720p_%03d.ts",
			}))),
		)
	}

	if hasFullHd {
		firstResolution := "w=1920:h=-2"
		firstPrefix := "1920x1080"
		if isPortrait {
			firstResolution = "w=1080:h=-2"
			firstPrefix = "1080x1920"
		}

		firstSegmentDirectory := fileName + "/segment/" + firstPrefix
		_ = os.MkdirAll(firstSegmentDirectory, os.ModePerm)
		firstPlaylistDirectory := fileName + "/playlist/" + firstPrefix
		_ = os.MkdirAll(firstPlaylistDirectory, os.ModePerm)

		streams = append(streams,
			// add 1080p stream
			input.Get("4").Filter("scale", ffmpeg_go.Args{firstResolution}).Output(firstPlaylistDirectory+"/1080p.m3u8", mergeArgs(encodingArgs, mergeArgs(hlsArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "5000k",
				//"maxrate":              "5350k",
				//"bufsize":              "7500k",
				//"b:a":                  "192k",
				"crf":                  "23",
				"hls_segment_filename": firstSegmentDirectory + "/1080p_%03d.ts",
			}))),
		)
	}

	finalStream := input.Get("5")

	// finally, we generate a video file that is 720p with crf of 23. this will be useful in case we can't support streaming
	if isPortrait {
		if firstStream.Width > 720 || firstStream.Height > 1280 {
			finalStream.Filter("scale", ffmpeg_go.Args{"720:-2"})
		}
	} else {
		if firstStream.Height > 720 || firstStream.Width > 1280 {
			finalStream.Filter("scale", ffmpeg_go.Args{"1280:-2"})
		}
	}

	mp4RawDirectory := fileName + "/raw"
	_ = os.MkdirAll(mp4RawDirectory, os.ModePerm)

	mp4FileName := mp4RawDirectory + "/720p.mp4"

	streams = append(streams,
		finalStream.Output(mp4FileName, mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
			"movflags": "+faststart",
			"crf":      "23",
		})),
	)

	if err := ffmpeg_go.MergeOutputs(streams...).
		OverWriteOutput().
		WithErrorOutput(ffmpegLogger).
		Run(); err != nil {
		return nil, errors.Wrap(err, string(ffmpegLogger.Output))
	}

	str, err = ffmpeg_go.Probe(newVideoFileName, defaultArgs)

	if err != nil {
		return nil, err
	}

	var probeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream #2")
	}

	bitRate, err := strconv.ParseInt(probeResult.Format.BitRate, 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse bit rate")
	}

	s, err := strconv.ParseFloat(probeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse probe duration")
	}

	aspectRatioSplit := strings.Split(probeResult.Streams[0].DisplayAspectRatio, ":")

	widthAspect, err := strconv.ParseInt(aspectRatioSplit[0], 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse aspect ratio split width")
	}

	heightAspect, err := strconv.ParseInt(aspectRatioSplit[1], 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse aspect ratio split height")
	}

	// update the source image data - this is used for the thumbnail
	media.RawProto().ImageData = &proto.ImageData{
		Id:       thumbnailFileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    int64(probeResult.Streams[0].Width),
		Height:   int64(probeResult.Streams[0].Height),
		Palettes: palettes,
	}

	media.RawProto().VideoData = &proto.VideoData{
		Containers: []*proto.VideoContainer{
			{
				Id:       newVideoFileName,
				MimeType: proto.MediaMimeType_VideoMpegUrl,
			},
			{
				Id:       mp4FileName,
				MimeType: proto.MediaMimeType_VideoMp4,
				Bitrate:  bitRate,
			},
		},
		AspectRatio: &proto.VideoAspectRatio{
			Width:  widthAspect,
			Height: heightAspect,
		},
		DurationMilliseconds: int64(math.Round(s * 1000)),
		HasAudio:             !videoNoAudio,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: thumbnailFileName,
			isImage:  true,
		},
		{
			directory: fileName,
		},
	}}, nil
}

func mergeArgs(target ffmpeg_go.KwArgs, destination ffmpeg_go.KwArgs) ffmpeg_go.KwArgs {
	for k, v := range target {
		destination[k] = v
	}

	return destination
}

func processImage(media *media.Media, mimeType string, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()

	var src image.Image
	var err error

	if mimeType == "image/png" {
		src, err = png.Decode(file)
		// check for png format error
		var formatError png.FormatError
		if errors.As(err, &formatError) {
			zap.S().Errorw("failed to decode png", zap.Error(err))
			return &ProcessResponse{failed: true}, nil
		}
	} else {
		src, err = jpeg.Decode(file)
		// check for jpeg format error
		var formatError jpeg.FormatError
		if errors.As(err, &formatError) {
			zap.S().Errorw("failed to decode jpeg", zap.Error(err))
			return &ProcessResponse{failed: true}, nil
		}
	}

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode image")
	}

	imageFile, err := os.Create(fileName)
	if err != nil {
		return nil, err
	}

	var finalMimeType proto.MediaMimeType

	if mimeType == "image/png" {
		finalMimeType = proto.MediaMimeType_ImagePng
		if err := png.Encode(imageFile, src); err != nil {
			return nil, errors.Wrap(err, "failed to encode png")
		}
	} else {
		finalMimeType = proto.MediaMimeType_ImageJpeg
		if err := jpeg.Encode(imageFile, src, &jpeg.Options{Quality: 100}); err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}
	}

	_, _ = imageFile.Seek(0, io.SeekStart)
	palettes, _, err := createPreviewFromFile(imageFile, mimeType == "image/png")

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: finalMimeType,
		Width:    int64(src.Bounds().Dx()),
		Height:   int64(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: fileName,
			isImage:  true,
		},
	}}, nil
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

	finalFileName := uuid.New().String()

	targetFile, err := os.Create(finalFileName)
	if err != nil {
		return nil, err
	}

	// when filters are applied, this is usually to an existing JPEG, so it has already been compressed
	// we want to avoid compressing it twice, so we set the quality to 100
	if err := jpeg.Encode(targetFile, pixelatedSrc, &jpeg.Options{Quality: 100}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	_, _ = targetFile.Seek(0, io.SeekStart)
	palettes, _, err := createPreviewFromFile(targetFile, false)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       finalFileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    int64(src.Bounds().Dx()),
		Height:   int64(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: finalFileName,
			isImage:  true,
		},
	}}, nil
}
