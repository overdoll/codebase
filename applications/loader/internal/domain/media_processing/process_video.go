package media_processing

import (
	"bufio"
	bytes2 "bytes"
	"encoding/json"
	"fmt"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"go.uber.org/zap"
	"io"
	"io/fs"
	"io/ioutil"
	"log"
	"math"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"path/filepath"
	"strconv"
	"strings"
)

func init() {
	// not ideal but we need to disable the log messages from: ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

const (
	defaultPreset         = "slow"
	defaultIntensityLevel = "-14.0"
	defaultLoudnessRange  = "+11.0"
	defaultTruePeak       = "-1.0"
)

type ffmpegProbeStream struct {
	Streams []struct {
		Width              int    `json:"width"`
		Height             int    `json:"height"`
		Duration           string `json:"duration"`
		DisplayAspectRatio string `json:"display_aspect_ratio"`
		NBReadPackets      string `json:"nb_read_packets"`
		FrameRate          string `json:"r_frame_rate"`
		BitRate            string `json:"bit_rate"`
		CodecTagString     string `json:"codec_tag_string"`
		Profile            string `json:"profile"`
		Level              int    `json:"level"`
		CodecName          string `json:"codec_name"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
		BitRate  string `json:"bit_rate"`
	} `json:"format"`
}

type ffmpegPacket struct {
	Size         string `json:"size"`
	DurationTime string `json:"duration_time"`
	PtsTime      string `json:"pts_time"`
	Flags        string `json:"flags"`
}

type ffmpegPacketsProbe struct {
	Packets []ffmpegPacket `json:"packets"`
}

type ffmpegLoudNormData struct {
	InputI            string `json:"input_i"`
	InputTp           string `json:"input_tp"`
	InputLra          string `json:"input_lra"`
	InputThresh       string `json:"input_thresh"`
	OutputI           string `json:"output_i"`
	OutputTp          string `json:"output_tp"`
	OutputLra         string `json:"output_lra"`
	OutputThresh      string `json:"output_thresh"`
	NormalizationType string `json:"normalization_type"`
	TargetOffset      string `json:"target_offset"`
}

func Max(x, y float64) float64 {
	if x < y {
		return y
	}
	return x
}

func Min(x, y float64) float64 {
	if x > y {
		return y
	}
	return x
}

func constrain(target float64, min float64, max float64) float64 {
	return Max(Min(target, max), min)
}

func processVideo(target *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()
	targetFileName := file.Name()

	videoNoAudio := false

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	validationSocket, err, cleanupValidationSocket := createFFMPEGTempSocket(target.RawProto().Id, 0, true)

	if err != nil {
		return nil, err
	}

	//// make sure to call this function or socket won't close correctly
	defer cleanupValidationSocket()

	// first, check integrity of mp4 file before proceeding to process the video
	if err := ffmpeg_go.Input(targetFileName, map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + validationSocket,
	}).
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
		if err := ffmpeg_go.Input(targetFileName, ffmpeg_go.KwArgs{"loglevel": "error", "progress": "unix://" + validationSocket}).
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

	// if video has audio, we extract the audio, and apply a loudness normalization, to ensure an equal balance
	if !videoNoAudio {
		bytes := bytes2.NewBuffer(nil)
		if err := ffmpeg_go.Input(targetFileName, ffmpeg_go.KwArgs{"hide_banner": "", "progress": "unix://" + validationSocket}).
			Output("-", ffmpeg_go.KwArgs{"map": "0:a:0", "af": "loudnorm=I=" + defaultIntensityLevel + ":LRA=" + defaultLoudnessRange + ":tp=" + defaultTruePeak + ":print_format=json", "f": "null"}).
			WithErrorOutput(bytes).
			Run(); err != nil {
			return nil, errors.Wrap(err, "failed to first pass normalization: "+bytes.String())
		}

		var buffer []byte
		var alreadyRead bool

		reader := bufio.NewReader(bytes)

		// from our ffmpeg output, read all lines until we are at the end
		for {
			line, _, err := reader.ReadLine()

			if err == io.EOF {
				break
			}

			if string(line) == "{" && !alreadyRead {
				alreadyRead = true
			}

			if alreadyRead {
				buffer = append(buffer, line...)
			}
		}

		// read normalization datas
		var ffmpegNormalizationData *ffmpegLoudNormData

		if err := json.Unmarshal(buffer, &ffmpegNormalizationData); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal ffmpeg normalization data")
		}

		//fmt.Println(string(buffer))

		// if these are infinite, we need to ignore - usually means that there is no audio for this video
		if ffmpegNormalizationData.InputI != "-inf" && ffmpegNormalizationData.TargetOffset != "inf" {

			parsedMeasuredI, err := strconv.ParseFloat(ffmpegNormalizationData.InputI, 64)
			if err != nil {
				return nil, errors.Wrap(err, "failed to parse measured_I float")
			}

			if parsedMeasuredI > 0 {
				parsedMeasuredI = 0
			}

			//parsedMeasuredLRA, err := strconv.ParseFloat(ffmpegNormalizationData.InputLra, 64)
			//if err != nil {
			//	return nil, errors.Wrap(err, "failed to parse measured_LRA float")
			//}
			//
			//parsedMeasuredTP, err := strconv.ParseFloat(ffmpegNormalizationData.InputTp, 64)
			//if err != nil {
			//	return nil, errors.Wrap(err, "failed to parse measured_tp float")
			//}
			//
			//parsedOffset, err := strconv.ParseFloat(ffmpegNormalizationData.TargetOffset, 64)
			//if err != nil {
			//	return nil, errors.Wrap(err, "failed to parse offset float")
			//}
			//
			//parsedMeasuredThresh, err := strconv.ParseFloat(ffmpegNormalizationData.InputThresh, 64)
			//if err != nil {
			//	return nil, errors.Wrap(err, "failed to parse offset float")
			//}

			//loudNorm := "I=" + defaultIntensityLevel +
			//	":LRA=" + defaultLoudnessRange +
			//	":tp=" + defaultTruePeak +
			//	":measured_I=" + fmt.Sprintf("%.2f", constrain(parsedMeasuredI, -99, 0)) +
			//	":measured_LRA=" + fmt.Sprintf("%.2f", constrain(parsedMeasuredLRA, 0, 99)) +
			//	":measured_tp=" + fmt.Sprintf("%.2f", constrain(parsedMeasuredTP, -99, 99)) +
			//	":measured_thresh=" + fmt.Sprintf("%.2f", constrain(parsedMeasuredThresh, -99, 0)) +
			//	":offset=" + fmt.Sprintf("%.2f", constrain(parsedOffset, -99, 99)) +
			//	":linear=true"

			newFileName := uuid.New().String()
			defer os.Remove(newFileName)

			// get formats
			packets, err := ffmpeg_go.Probe(targetFileName, map[string]interface{}{
				"hide_banner":    "",
				"v":              "error",
				"select_streams": "v:0",
				"show_entries":   "stream=codec_name",
			})

			if err != nil {
				return nil, errors.Wrap(err, "failed to probe format")
			}

			var probePackets *ffmpegProbeStream

			if err := json.Unmarshal([]byte(packets), &probePackets); err != nil {
				return nil, errors.Wrap(err, "failed to unmarshal playlist probe")
			}

			args := ffmpeg_go.KwArgs{
				"map": []string{"0:v:0", "0:a:0"},
				////	"af":     "loudnorm=print_format=summary:linear=true:" + loudNorm,
				"format": "mp4",
			}

			if len(probePackets.Streams) > 0 && probePackets.Streams[0].CodecName == "h264" {
				args["c:v"] = "copy"
			} else {
				args["c:v"] = "libx264"
				args["crf"] = "1"
			}

			////
			//// process our audio
			//if err := ffmpeg_go.Input(targetFileName, ffmpeg_go.KwArgs{"hide_banner": "", "progress": "unix://" + validationSocket}).
			//	Output(newFileName, args).
			//	WithErrorOutput(ffmpegLogger).
			//	OverWriteOutput().
			//	Run(); err != nil {
			//	return nil, errors.Wrap(err, "failed to generate audio file: "+string(ffmpegLogger.Output))
			//}
			//
			//targetFileName = newFileName
		} else {
			videoNoAudio = true
		}
	}

	// probe for video streams
	str, err = ffmpeg_go.Probe(targetFileName, map[string]interface{}{
		"select_streams": "v:0",
		"show_entries":   "stream=width,height,r_frame_rate",
		"show_format":    "",
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe for video stream")
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

	type resolutionTarget struct {
		high    int
		low     int
		rate    string
		ar      string
		maxFps  int
		profile string
		level   string
		crf     string
	}

	resolutionTargets := []resolutionTarget{
		{
			high:    1920,
			low:     1080,
			ar:      "152k",
			rate:    "4500k",
			maxFps:  60,
			profile: "high",
			level:   "4.2",
			crf:     "23",
		},
		{
			high:    1280,
			low:     720,
			ar:      "128k",
			rate:    "2300k",
			maxFps:  60,
			profile: "high",
			level:   "3.2",
			crf:     "23",
		},
		{
			high:    854,
			low:     480,
			ar:      "96k",
			rate:    "1000k",
			maxFps:  30,
			profile: "main",
			level:   "3.1",
			crf:     "23",
		},
		{
			high:    480,
			low:     270,
			ar:      "48k",
			rate:    "500k",
			maxFps:  30,
			profile: "main",
			level:   "3.0",
			crf:     "23",
		},
	}

	var scales []resolutionTarget

	requiresResize := false
	hasOversized := false

	if isLandscape {
		if firstStream.Width > 2560 {
			requiresResize = true
		}

		if firstStream.Height > 1080 {
			hasOversized = true
		}
	} else {
		if firstStream.Height > 2560 {
			requiresResize = true
		}

		if firstStream.Width > 1080 {
			hasOversized = true
		}
	}

	for _, target := range resolutionTargets {
		if isLandscape {
			if firstStream.Height >= target.low {
				scales = append(scales, target)
			}
		} else {
			if firstStream.Width >= target.low {
				scales = append(scales, target)
			}
		}
	}

	if !requiresResize && !hasOversized {
		if len(scales) < 4 {

			var high, low int

			if isLandscape {
				high = firstStream.Width
				low = firstStream.Height
			} else {
				high = firstStream.Height
				low = firstStream.Width
			}

			var highTarget, lowTarget int

			if isLandscape {
				highTarget = scales[0].high
				lowTarget = scales[0].low
			} else {
				highTarget = scales[0].low
				lowTarget = scales[0].high
			}

			// include original resolution if the original resolution isn't the top one
			if high != highTarget && low != lowTarget {
				scales = append([]resolutionTarget{{
					high:    high,
					low:     low,
					ar:      "152k",
					rate:    "3100k",
					maxFps:  60,
					profile: "high",
					level:   "4.2",
					crf:     "23",
				}}, scales...)
			}
		}
	}

	processSocket, err, processCleanup := createFFMPEGTempSocket(target.RawProto().Id, parsedDuration, false)

	if err != nil {
		return nil, err
	}

	defer processCleanup()

	defaultAllArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + processSocket,
	}

	var streams []*ffmpeg_go.Stream

	mp4RawDirectory := fileName
	mp4ActualFileName := "original.mp4"
	_ = os.MkdirAll(mp4RawDirectory, os.ModePerm)
	mp4FileName := mp4RawDirectory + "/" + mp4ActualFileName

	generatedSoloFile := false

	input := ffmpeg_go.Input(targetFileName, defaultAllArgs).Split()

	for i, scale := range scales {

		index := strconv.Itoa(i)

		var targetScale string

		convertedLow := strconv.Itoa(scale.low)
		convertedHigh := strconv.Itoa(scale.high)

		if isLandscape {
			if firstStream.Height >= scale.low {
				if requiresResize {
					targetScale = "w=" + convertedHigh + ":h=" + convertedLow
				} else {
					targetScale = "w=-2:h=" + convertedLow
				}
			}
		} else {
			if firstStream.Width >= scale.low {
				if requiresResize {
					targetScale = "w=" + convertedLow + ":h=" + convertedHigh
				} else {
					targetScale = "w=" + convertedLow + ":h=-2"
				}
			}
		}

		fpsTarget := ""

		parsedFps := strings.Split(firstStream.FrameRate, "/")
		fpsDecimalFirst, err := strconv.ParseFloat(parsedFps[0], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse first decimal")
		}
		fpsDecimalSecond, err := strconv.ParseFloat(parsedFps[1], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse second decimal")
		}

		targetFrameRate := fpsDecimalFirst / fpsDecimalSecond

		// check if we need to limit our framerate
		if targetFrameRate > float64(scale.maxFps) {
			fpsTarget = strconv.Itoa(scale.maxFps)
		}

		// helper function to create a playlist variant
		createVariant := func(index, fileName string, args ffmpeg_go.KwArgs) {
			scaleWithAspectRatio := targetScale

			if requiresResize {
				scaleWithAspectRatio += ":force_original_aspect_ratio=decrease"
			}

			overlay := input.Get(index).
				Filter("scale", ffmpeg_go.Args{targetScale})

			if requiresResize {
				overlay = overlay.Filter("crop", ffmpeg_go.Args{"h=ceil(ih/2)*2"}).
					Filter("gblur", ffmpeg_go.Args{"sigma=20"})
			}

			if fpsTarget != "" {
				overlay = overlay.Filter("fps", ffmpeg_go.Args{fpsTarget})
			}

			overlayScale := ffmpeg_go.KwArgs{"x": "(main_w-overlay_w)/2", "y": "(main_h-overlay_h)/2"}

			if requiresResize {
				baseStream := input.Get("0"+index).
					Filter("scale", ffmpeg_go.Args{scaleWithAspectRatio})

				if fpsTarget != "" {
					baseStream = baseStream.Filter("fps", ffmpeg_go.Args{fpsTarget})
				}

				overlay = overlay.Overlay(baseStream, "", overlayScale)
			}

			streams = append(streams, overlay.
				Output(fileName, args))
		}

		hlsArgs := ffmpeg_go.KwArgs{
			"c:v":                    "libx264",
			"maxrate":                scale.rate,
			"bufsize":                scale.rate,
			"tune":                   "animation",
			"crf":                    scale.crf,
			"profile:v":              scale.profile,
			"force_key_frames":       "expr:gte(t,n_forced*3)",
			"preset":                 defaultPreset,
			"sc_threshold":           "0",
			"map_metadata":           "-1",
			"hls_segment_filename":   fileName + "/sg_" + index + "_%v_%02d.m4s",
			"hls_fmp4_init_filename": "init_" + index + ".mp4",
			"hls_time":               "3",
			"hls_playlist_type":      "vod",
			"hls_segment_type":       "fmp4",
			"hls_list_size":          "0",
			"level":                  scale.level,
		}

		if videoNoAudio {
			hlsArgs["an"] = ""
		} else {
			hlsArgs["b:a"] = scale.ar
			hlsArgs["map"] = []string{"0:a:0"}
			hlsArgs["ar"] = "48k"
			hlsArgs["c:a"] = "aac"
			hlsArgs["ac"] = "2"
		}

		createVariant(index, fileName+"/pl_"+index+"_%v.m3u8", hlsArgs)

		if scale.low <= 720 && !generatedSoloFile {

			mp4FileArgs := ffmpeg_go.KwArgs{
				"c:v":          "libx264",
				"preset":       defaultPreset,
				"movflags":     "+faststart",
				"crf":          "23",
				"map_metadata": "-1",
				"tune":         "animation",
				"profile":      "high",
				"level":        "3.2",
			}

			generatedSoloFile = true

			if !videoNoAudio {
				mp4FileArgs["b:a"] = scale.ar
				mp4FileArgs["map"] = []string{"0:a:0"}
				mp4FileArgs["ar"] = "48k"
				mp4FileArgs["c:a"] = "aac"
				mp4FileArgs["ac"] = "2"
			} else {
				mp4FileArgs["an"] = ""
			}

			mp4Index := strconv.Itoa(len(scales))

			createVariant(mp4Index, mp4FileName, mp4FileArgs)
		}
	}

	ffprobeSettings := map[string]interface{}{
		"v":            "error",
		"show_entries": "stream=width,height,display_aspect_ratio,bit_rate,codec_tag_string,profile,level",
		"show_format":  "",
		"hide_banner":  "",
	}

	cpuLimit := 2

	if os.Getenv("FFMPEG_CPU") != "" {
		parseInt, err := strconv.ParseInt(os.Getenv("FFMPEG_CPU"), 10, 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse ffmpeg cpu")
		}
		cpuLimit = int(parseInt)
	}

	if err := ffmpeg_go.MergeOutputs(streams...).
		OverWriteOutput().
		WithErrorOutput(ffmpegLogger).
		WithCpuCoreLimit(float32(cpuLimit)).
		WithCpuCoreRequest(float32(cpuLimit)).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	type playlist struct {
		bitrateInt     int
		bitrate        string
		averageBitrate string
		resolution     string
		uri            string
		codecs         string
	}

	var playlists []*playlist
	var highResolutionPlaylist *playlist

	if err := filepath.Walk(fileName, func(path string, info fs.FileInfo, err error) error {

		if info.IsDir() {
			return nil
		}

		if !strings.HasSuffix(info.Name(), ".m3u8") {
			return nil
		}

		str, err := ffmpeg_go.Probe(path, ffprobeSettings)

		if err != nil {
			return errors.Wrap(err, "failed to probe playlist file")
		}

		var probeResult *ffmpegProbeStream

		if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
			return errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		var codecs string
		var bitrate int64
		var audioBitRate int64

		finalStreamList := probeResult.Streams

		// reverse the stream list
		for i, j := 0, len(finalStreamList)-1; i < j; i, j = i+1, j-1 {
			finalStreamList[i], finalStreamList[j] = finalStreamList[j], finalStreamList[i]
		}

		var videoStreamWidth, videoStreamHeight int

		for i, stream := range finalStreamList {

			parsedInt, err := strconv.ParseInt(stream.BitRate, 10, 64)
			if err != nil {
				return err
			}

			bitrate += parsedInt

			if stream.CodecTagString == "mp4a" {
				codecs += "mp4a.40.2"
				audioBitRate = parsedInt
			} else if stream.CodecTagString == "avc1" {
				codecs += "avc1"

				if stream.Level == 42 {
					codecs += ".64002a"
				} else if stream.Level == 32 {
					codecs += ".640020"
				} else if stream.Level == 30 {
					codecs += ".4d001e"
				} else if stream.Level == 31 {
					codecs += ".4d001f"
				} else {
					return errors.New("unknown level with codec: " + stream.CodecTagString + " - " + stream.Profile + ": " + strconv.Itoa(stream.Level))
				}

				videoStreamWidth = stream.Width
				videoStreamHeight = stream.Height

			} else {
				return errors.New("unknown codec: " + stream.CodecTagString)
			}

			if i != len(probeResult.Streams)-1 {
				codecs += ","
			}
		}

		packets, err := ffmpeg_go.Probe(path, map[string]interface{}{
			"hide_banner":    "",
			"v":              "error",
			"select_streams": "v:0",
			"show_packets":   "",
			"show_entries":   "packet=pts_time,dts_time,duration_time,size,flags",
		})

		if err != nil {
			return errors.Wrap(err, "failed to probe packets")
		}

		var probePackets *ffmpegPacketsProbe

		if err := json.Unmarshal([]byte(packets), &probePackets); err != nil {
			return errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		var currentList []ffmpegPacket
		var aggregation [][]ffmpegPacket

		// bucket up packets, so we can get peak bit-rates
		for _, packet := range probePackets.Packets {
			// is an I-frame
			if packet.Flags == "K_" {
				if len(currentList) > 0 {
					aggregation = append(aggregation, currentList)
				}
				currentList = []ffmpegPacket{packet}
			} else {
				// Not an I-frame
				currentList = append(currentList, packet)
			}
		}

		var peakBitrate float64

		if len(aggregation) > 1 {
			// go through our bucketed list and get the largest bitrate in the bucket
			for _, aggregate := range aggregation {

				lastFrame, err := strconv.ParseFloat(aggregate[len(aggregate)-1].PtsTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse last frame time")
				}

				firstFrame, err := strconv.ParseFloat(aggregate[0].PtsTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse first frame time")
				}

				duration := lastFrame - firstFrame
				var totalSize float64
				for _, frame := range aggregate {
					parsedSize, err := strconv.ParseFloat(frame.Size, 64)
					if err != nil {
						return errors.Wrap(err, "failed to parse frame size")
					}
					totalSize += parsedSize
				}

				bitrateForFrame := ((totalSize * 8) / 1000) / duration * 1000

				if bitrateForFrame > peakBitrate {
					peakBitrate = bitrateForFrame
				}
			}

			// include audio bitrate in the peak bitrate
			peakBitrate += float64(audioBitRate)
		} else {
			peakBitrate = float64(bitrate)
		}

		playlist := &playlist{
			bitrate:        strconv.Itoa(int(peakBitrate)),
			averageBitrate: strconv.Itoa(int(bitrate)),
			resolution:     strconv.Itoa(videoStreamWidth) + "x" + strconv.Itoa(videoStreamHeight),
			uri:            path,
			codecs:         "\"" + codecs + "\"",
		}

		if highResolutionPlaylist == nil {
			highResolutionPlaylist = playlist
		} else {
			if playlist.bitrateInt > highResolutionPlaylist.bitrateInt {
				highResolutionPlaylist = playlist
			}
		}

		playlists = append(playlists, playlist)
		return nil
	}); err != nil {
		return nil, errors.Wrap(err, "failed to walk playlists")
	}

	foundFrame := false

	fileThumbnailName := uuid.New().String()

	durationAddition := float64(0)

	var fileThumbnail *os.File

	var testCounts int

	// keep looking for frames that are not all black (we can successfully generate a preview
	for testCounts <= 10 {

		fileThumbnail, err = os.Create(fileThumbnailName)
		if err != nil {
			return nil, err
		}

		str, err := ffmpeg_go.Probe(highResolutionPlaylist.uri, ffprobeSettings)

		if err != nil {
			return nil, errors.Wrap(err, "failed to probe playlist file")
		}

		var probeResult *ffmpegProbeStream

		if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		duration, err := strconv.ParseFloat(probeResult.Format.Duration, 64)

		if err != nil {
			return nil, err
		}

		parsedFps := strings.Split(probeResult.Streams[0].FrameRate, "/")
		fpsDecimalFirst, err := strconv.ParseFloat(parsedFps[0], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse first decimal")
		}
		fpsDecimalSecond, err := strconv.ParseFloat(parsedFps[1], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse second decimal")
		}

		targetFrameRate := fpsDecimalFirst / fpsDecimalSecond
		frameCut := ((duration + durationAddition - (duration / 10)) / float64(2)) * targetFrameRate

		if err := ffmpeg_go.Input(highResolutionPlaylist.uri, map[string]interface{}{
			"v":           "error",
			"hide_banner": "",
		}).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%f)", frameCut)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			return nil, errors.Wrap(err, "failed to generate thumbnail: "+string(ffmpegLogger.Output))
		}

		_, _ = fileThumbnail.Seek(0, io.SeekStart)
		_, _, err = createPreviewFromFile(fileThumbnail, false, true)

		if err != nil {
			// fully black image - we want to find a different one
			if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {
				testCounts += 1
				_ = os.Remove(fileThumbnail.Name())
				durationAddition += duration / 10
				continue
			}

			return nil, err
		}

		_ = fileThumbnail.Close()
		foundFrame = true

		break
	}

	defer os.Remove(fileThumbnailName)

	if !foundFrame {
		return nil, errors.New("failed to find a frame thumbnail in time")
	}

	targetDeviceDesktop := proto.MediaDeviceType_Desktop
	targetDeviceMobile := proto.MediaDeviceType_Mobile
	targetDeviceUniversal := proto.MediaDeviceType_Universal

	var videoContainers []*proto.VideoContainer

	if len(playlists) == 4 {
		videoContainers = []*proto.VideoContainer{
			{
				Id:           "master.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceDesktop,
			},
			{
				Id:           "master-d_mobile.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceMobile,
			},
		}
	} else {
		videoContainers = []*proto.VideoContainer{
			{
				Id:           "master.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceUniversal,
			},
		}
	}

	for _, container := range videoContainers {

		masterPlaylistFile, err := os.Create(fileName + "/" + container.Id)
		if err != nil {
			return nil, errors.Wrap(err, "failed to create file")
		}

		dataWriter := bufio.NewWriter(masterPlaylistFile)

		_, _ = dataWriter.WriteString("#EXTM3U" + "\n")
		_, _ = dataWriter.WriteString("#EXT-X-VERSION:7" + "\n")
		_, _ = dataWriter.WriteString("#EXT-X-INDEPENDENT-SEGMENTS" + "\n")

		// if mobile, put the largest resolution to the bottom (only if we have 4 playlists, like a 1080p stream at the top)
		if len(playlists) == 4 && *container.TargetDevice == proto.MediaDeviceType_Mobile {
			var popped *playlist
			popped, playlists = playlists[0], playlists[1:]
			playlists = append(playlists, popped)
		}

		for _, playlist := range playlists {
			_, _ = dataWriter.WriteString("#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=" + playlist.averageBitrate + ",BANDWIDTH=" + playlist.bitrate + ",RESOLUTION=" + playlist.resolution + ",CODECS=" + playlist.codecs + "\n")
			_, _ = dataWriter.WriteString(strings.Replace(playlist.uri, fileName+"/", "", 1) + "\n")
		}

		_ = dataWriter.Flush()
		_ = masterPlaylistFile.Close()
	}

	str, err = ffmpeg_go.Probe(mp4FileName, ffprobeSettings)

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe new video file")
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

	var widthAspect int64
	var heightAspect int64

	if len(aspectRatioSplit) == 2 {
		widthAspect, err = strconv.ParseInt(aspectRatioSplit[0], 10, 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse aspect ratio split width")
		}

		heightAspect, err = strconv.ParseInt(aspectRatioSplit[1], 10, 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse aspect ratio split height")
		}
	} else {

		// calculate aspect ratio manually since it's not available
		newWidth, newHeight := media.CalculateAspectRatio(probeResult.Streams[0].Width, probeResult.Streams[0].Height)

		widthAspect = int64(newWidth)
		heightAspect = int64(newHeight)
	}

	_, _ = fileThumbnail.Seek(0, io.SeekStart)
	processedResponses, err := processImageWithSizes(target, fileThumbnail, false)

	if err != nil {
		return nil, err
	}

	target.RawProto().VideoData = &proto.VideoData{
		Id: fileName,
		Containers: append(videoContainers, &proto.VideoContainer{
			Id:       mp4ActualFileName,
			MimeType: proto.MediaMimeType_VideoMp4,
			Bitrate:  uint64(bitRate),
			Width:    uint32(probeResult.Streams[0].Width),
			Height:   uint32(probeResult.Streams[0].Height),
		}),
		AspectRatio: &proto.VideoAspectRatio{
			Width:  uint32(widthAspect),
			Height: uint32(heightAspect),
		},
		DurationMilliseconds: int64(math.Round(s * 1000)),
		HasAudio:             !videoNoAudio,
	}

	return &ProcessResponse{
		move: append(processedResponses, &Move{
			directory: fileName,
		}),
	}, nil
}
