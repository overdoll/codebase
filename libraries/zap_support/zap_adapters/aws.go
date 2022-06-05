package zap_adapters

import "go.uber.org/zap"

type AwsZapAdapter struct {
	zl *zap.SugaredLogger
}

func NewAwsZapAdapter(zapLogger *zap.SugaredLogger) *AwsZapAdapter {
	return &AwsZapAdapter{
		zl: zapLogger,
	}
}

func (g *AwsZapAdapter) Log(v ...interface{}) {
	g.zl.Info(v)
}
