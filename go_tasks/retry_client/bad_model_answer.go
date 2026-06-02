//go:build ignore
// +build ignore

package retryclient

func Retry(operation func() (string, error), attempts int) string {
    for i := 0; i < attempts; i++ {
        value, _ := operation()
        return value
    }
    return ""
}
