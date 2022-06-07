package zap_adapters

type FfmpegGoLogErrorAdapter struct {
	Output []byte
}

func (l *FfmpegGoLogErrorAdapter) Write(p []byte) (n int, err error) {
	l.Output = append(l.Output, p...)
	return len(p), nil
}
