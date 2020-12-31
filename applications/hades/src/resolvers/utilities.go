package resolvers

var OTPKey = "otp-key"

func softDeference(field *string) string {
	if field == nil {
		return ""
	}
	return *field
}
