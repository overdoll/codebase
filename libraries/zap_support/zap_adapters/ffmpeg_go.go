package zap_adapters

import (
	"go.uber.org/zap"
)

type FfmpegGoLogErrorAdapter struct{}

func (l *FfmpegGoLogErrorAdapter) Write(p []byte) (n int, err error) {
	zap.S().Errorw("%s", string(p))
	return len(p), nil
}
