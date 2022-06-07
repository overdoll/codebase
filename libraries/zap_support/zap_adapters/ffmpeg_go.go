package zap_adapters

type FfmpegGoLogErrorAdapter struct {
	output []byte
}

func (l *FfmpegGoLogErrorAdapter) GetOutput() []byte {
	return l.output
}

func (l *FfmpegGoLogErrorAdapter) Write(p []byte) (n int, err error) {
	l.output = append(l.output, p...)
	return len(p), nil
}
