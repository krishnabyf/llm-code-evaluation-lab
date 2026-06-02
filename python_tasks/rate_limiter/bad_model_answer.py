requests = {}


def allow(user):
    requests[user] += 1
    return requests[user] < 100
