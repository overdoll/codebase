package helpers

import (
	"context"
)

// get IP from a gin context
func GetIp(ctx context.Context) string {
	ip := ""

	req := GinContextFromContext(ctx).Request

	forwarded := req.Header.Get("X-FORWARDED-FOR")

	if forwarded != "" {
		ip = forwarded
	} else {
		ip = req.RemoteAddr
	}

	return ip
}
