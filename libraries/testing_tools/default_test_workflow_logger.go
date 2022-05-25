package testing_tools

import (
	"fmt"
	"go.temporal.io/sdk/log"
	golog "log"
	"os"
	"strings"
)

type DefaultTestWorkflowLogger struct {
	logger        *golog.Logger
	globalKeyvals string
}

func NewDefaultTestWorkflowLogger() *DefaultTestWorkflowLogger {
	return &DefaultTestWorkflowLogger{logger: golog.New(os.Stdout, "", golog.LstdFlags)}
}

func (l *DefaultTestWorkflowLogger) println(level, msg string, keyvals []interface{}) {
	// To avoid extra space when globalKeyvals is not specified.
	if l.globalKeyvals == "" {
		l.logger.Println(append([]interface{}{level, msg}, keyvals...)...)
	} else {
		l.logger.Println(append([]interface{}{level, msg, l.globalKeyvals}, keyvals...)...)
	}
}

// Debug writes message to the log.
func (l *DefaultTestWorkflowLogger) Debug(msg string, keyvals ...interface{}) {

}

// Info writes message to the log.
func (l *DefaultTestWorkflowLogger) Info(msg string, keyvals ...interface{}) {
	l.println("INFO ", msg, keyvals)
}

// Warn writes message to the log.
func (l *DefaultTestWorkflowLogger) Warn(msg string, keyvals ...interface{}) {
	l.println("WARN ", msg, keyvals)
}

// Error writes message to the log.
func (l *DefaultTestWorkflowLogger) Error(msg string, keyvals ...interface{}) {
	l.println("ERROR", msg, keyvals)
}

// With returns new logger the prepend every log entry with keyvals.
func (l *DefaultTestWorkflowLogger) With(keyvals ...interface{}) log.Logger {
	logger := &DefaultTestWorkflowLogger{
		logger: l.logger,
	}

	if l.globalKeyvals != "" {
		logger.globalKeyvals = l.globalKeyvals + " "
	}

	logger.globalKeyvals += strings.TrimSuffix(fmt.Sprintln(keyvals...), "\n")

	return logger
}
