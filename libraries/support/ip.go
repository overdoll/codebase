package support

import (
	"net/http"
	"strings"
)

func GetIPFromRequest(req *http.Request) string {
	ip := ""

	forwarded := req.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {
		ip = strings.Split(forwarded, ",")[len(strings.Split(forwarded, ","))-1]
	} else {
		ip = req.RemoteAddr
	}

	return strings.TrimSpace(ip)
}
