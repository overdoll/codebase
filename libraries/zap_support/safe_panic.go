package zap_support

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func SafePanic(msg string, args ...zapcore.Field) {
	if ce := zap.L().Check(zap.PanicLevel, msg); ce != nil {
		zap.L().Core().Write(ce.Entry, args)
	}
}
