package zap_adapters

import (
	"fmt"
	"go.temporal.io/sdk/temporal"
	"go.uber.org/zap/zapcore"

	"go.temporal.io/sdk/log"
	"go.uber.org/zap"
)

type TemporalZapAdapter struct {
	zl *zap.Logger
}

func NewTemporalZapAdapter(zapLogger *zap.Logger) *TemporalZapAdapter {
	return &TemporalZapAdapter{
		// Skip one call frame to exclude zap_adapter itself.
		// Or it can be configured when logger is created (not always possible).
		zl: zapLogger.WithOptions(zap.AddCallerSkip(1)),
	}
}

func (log *TemporalZapAdapter) fields(keyvals []interface{}) []zap.Field {
	if len(keyvals)%2 != 0 {
		return []zap.Field{zap.Error(fmt.Errorf("odd number of keyvals pairs: %v", keyvals))}
	}

	var fields []zap.Field
	for i := 0; i < len(keyvals); i += 2 {
		key, ok := keyvals[i].(string)
		if !ok {
			key = fmt.Sprintf("%v", keyvals[i])
		}
		fields = append(fields, zap.Any(key, keyvals[i+1]))
	}

	return fields
}

func (log *TemporalZapAdapter) Debug(msg string, keyvals ...interface{}) {
	log.zl.Debug(msg, log.fields(keyvals)...)
}

func (log *TemporalZapAdapter) Info(msg string, keyvals ...interface{}) {
	log.zl.Info(msg, log.fields(keyvals)...)
}

func (log *TemporalZapAdapter) Warn(msg string, keyvals ...interface{}) {
	log.zl.Warn(msg, log.fields(keyvals)...)
}

func (log *TemporalZapAdapter) Error(msg string, keyvals ...interface{}) {

	fields := log.fields(keyvals)

	for _, field := range fields {
		if field.Type == zapcore.ErrorType {

			val, ok := field.Interface.(error)

			if ok {
				// ignore cancellation errors from being logged
				if temporal.IsCanceledError(val) {
					return
				}
			}

		}
	}

	log.zl.Error(msg, fields...)
}

func (log *TemporalZapAdapter) With(keyvals ...interface{}) log.Logger {
	return &TemporalZapAdapter{zl: log.zl.With(log.fields(keyvals)...)}
}
