package retryclient

import "errors"

func Retry(operation func() (string, error), attempts int) (string, error) {
    if attempts <= 0 {
        return "", errors.New("attempts must be positive")
    }

    var lastErr error
    for i := 0; i < attempts; i++ {
        value, err := operation()
        if err == nil {
            return value, nil
        }
        lastErr = err
    }
    return "", lastErr
}
