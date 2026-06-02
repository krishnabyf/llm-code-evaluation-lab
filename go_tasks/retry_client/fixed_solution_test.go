package retryclient

import (
    "errors"
    "testing"
)

func TestRetryReturnsSuccess(t *testing.T) {
    calls := 0
    value, err := Retry(func() (string, error) {
        calls++
        if calls < 3 {
            return "", errors.New("temporary")
        }
        return "ok", nil
    }, 3)

    if err != nil || value != "ok" || calls != 3 {
        t.Fatalf("unexpected result value=%q err=%v calls=%d", value, err, calls)
    }
}

func TestRetryStopsAfterMaxAttempts(t *testing.T) {
    calls := 0
    _, err := Retry(func() (string, error) {
        calls++
        return "", errors.New("temporary")
    }, 2)

    if err == nil || calls != 2 {
        t.Fatalf("expected failure after two attempts, err=%v calls=%d", err, calls)
    }
}
