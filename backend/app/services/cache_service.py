import time


class CacheService:

    def __init__(self):

        self.cache = {}

        self.expiry = 60  # seconds

    def get(self, key):

        item = self.cache.get(key)

        if item is None:

            return None

        if time.time() - item["time"] > self.expiry:

            del self.cache[key]

            return None

        return item["value"]

    def set(self, key, value):

        self.cache[key] = {

            "value": value,

            "time": time.time()

        }

    def clear(self):

        self.cache.clear()


cache_service = CacheService()