package support

import (
	"net/http"
	"strings"
)

func GetIPFromRequest(req *http.Request) string {
	ip := ""

	forwarded := req.Header.Get("X-FORWARDED-FOR")
	if forwarded != "" {

		splits := strings.Split(forwarded, ",")

		for _, r := range splits {
			if strings.TrimSpace(r) != "unknown" {
				ip = r
				break
			}
		}
	} else {
		ip = req.RemoteAddr
	}

	ip = strings.TrimSpace(ip)

	split := strings.Split(ip, ":")

	return split[0]
}
