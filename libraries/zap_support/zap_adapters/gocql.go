package zap_adapters

import "go.uber.org/zap"

type GocqlZapAdapter struct {
	zl *zap.SugaredLogger
}

func NewGocqlZapAdapter(zapLogger *zap.SugaredLogger) *GocqlZapAdapter {
	return &GocqlZapAdapter{
		zl: zapLogger,
	}
}

func (g *GocqlZapAdapter) Print(v ...interface{}) {
	g.zl.Info(v)
}

func (g *GocqlZapAdapter) Printf(format string, v ...interface{}) {
	g.zl.Infof(format, v)
}

func (g *GocqlZapAdapter) Println(v ...interface{}) {
	g.zl.Info(v)
}
