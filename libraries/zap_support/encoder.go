package zap_support

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/buffer"
	"go.uber.org/zap/zapcore"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
)

var alreadyInitialized = false

func NewCustomZap() (*zap.Logger, error) {

	if !alreadyInitialized {
		_ = zap.RegisterEncoder("prefer-stacktrace-from-source", func(config zapcore.EncoderConfig) (zapcore.Encoder, error) {
			if support.IsDebug() {
				return errorVerboseToStacktraceEncoder{
					Encoder: zapcore.NewConsoleEncoder(config),
				}, nil
			}

			return errorVerboseToStacktraceEncoder{
				Encoder: zapcore.NewJSONEncoder(config),
			}, nil
		})
		alreadyInitialized = true
	}

	config := &zap.Config{
		Level:       zap.NewAtomicLevelAt(zap.InfoLevel),
		Development: support.IsDebug(),
		Sampling: &zap.SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding:         "prefer-stacktrace-from-source",
		EncoderConfig:    zap.NewProductionEncoderConfig(),
		OutputPaths:      []string{"stderr"},
		ErrorOutputPaths: []string{"stderr"},
	}

	return config.Build()
}

type errorVerboseToStacktraceEncoder struct {
	zapcore.Encoder
}

type stackTracer interface {
	StackTrace() errors.StackTrace
}

func (he errorVerboseToStacktraceEncoder) EncodeEntry(ent zapcore.Entry, fields []zapcore.Field) (*buffer.Buffer, error) {
	filteredFields := make([]zapcore.Field, 0)
	var st stackTracer
	for _, f := range fields {
		if f.Type != zapcore.ErrorType {
			filteredFields = append(filteredFields, f)
			continue
		}

		if t, ok := f.Interface.(error); ok {
			stackTrace := errors.GetStackTracerFromError(t)

			if stackTrace != nil {
				st = stackTrace
			}
		}

		filteredFields = append(filteredFields, PlainError(f.Interface.(error)))
	}
	if st != nil {
		ent.Stack = fmt.Sprintf("%+v", st.StackTrace())
	}
	return he.Encoder.EncodeEntry(ent, filteredFields)
}
