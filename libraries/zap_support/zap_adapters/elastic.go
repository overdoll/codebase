package zap_adapters

import "go.uber.org/zap"

type ElasticZapAdapter struct {
	zl   *zap.SugaredLogger
	info bool
}

func NewElasticZapAdapter(zapLogger *zap.SugaredLogger, info bool) *ElasticZapAdapter {
	return &ElasticZapAdapter{
		zl:   zapLogger,
		info: info,
	}
}

func (g *ElasticZapAdapter) Printf(format string, v ...interface{}) {
	if g.info {
		g.zl.Infof(format, v)
	} else {
		g.zl.Errorf(format, v)
	}
}
