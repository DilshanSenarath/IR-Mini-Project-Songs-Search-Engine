from elasticsearch import Elasticsearch
from sinling import SinhalaTokenizer
from sinling import word_splitter

# Host
HOST = "http://localhost:9200"
INDEX = "songs-corpus"

# Elasticsearch instance
es  = Elasticsearch(HOST)
# Tokenizer instance
tokenizer = SinhalaTokenizer()

# Boosting words for some fields
singer_boosters = ["ගේ","ගෙ","කියන","ගායනා","කිව්ව","ගැයූ","ගයපු"]
lyricist_boosters = ["රචනා","ලිව්ව","ලියන","ලියපු","රචිත"]
musician_boosters = ["වාදනය","සංගීතය","නාද"]
metaphor_boosters = ["උපමාවක්", "සමාන", "වගේ", "වෙනත්"]

class QueryProcessor:
    def __init__(self, query):
        self.query = query
        self.boosts_default = {"title": 1, "released_year": 1, "album": 1, "genre": 1, "lyrics": 1, "lyricist":1, "musician":1, "singer":1, "metaphor":1}

    def preprocess(self):
        if ("*" in self.query):
            return

        boost_params = []
        additional_tokens = []

        tokens = tokenizer.tokenize(self.query)

        for token in tokens:
            splits = word_splitter.split(token)
            additional_tokens.append(splits['base'])

            if(token in singer_boosters or splits['affix'] in singer_boosters or splits['base'] in singer_boosters):
                boost_params.append("singer")
                self.boosts_default['singer'] = 2
            if(token in lyricist_boosters or splits['affix'] in lyricist_boosters or splits['base'] in lyricist_boosters):
                boost_params.append("lyricist")
                self.boosts_default['lyricist'] = 2
            if(token in musician_boosters or splits['affix'] in musician_boosters or splits['base'] in musician_boosters):
                boost_params.append("musician")
                self.boosts_default['musician'] = 2
            if(token in metaphor_boosters or splits['affix'] in metaphor_boosters or splits['base'] in metaphor_boosters):
                boost_params.append("metaphor")
                self.boosts_default['metaphor'] = 2

        self.query = " ".join(tokens + additional_tokens)
        self.boost_params = set(boost_params)

    def execute(self):
        if ("*" in self.query):
            return es.search(index=INDEX, body=self.wild_card())
        else:
            return es.search(index=INDEX, body=self.multi_match_with_agg())

    def get_singal_result(self, id):
        query = {
            "query": {
                "bool": {
                    "must": {
                        "match": {
                            "id": {"query": f"{id}"}
                        }
                    }
                }
            }
        }
        
        return es.search(index=INDEX, body=query)

    def multi_match_with_agg(self):
        return {
            "query":{
                "multi_match": {
                    "query": self.query,
                    "type":"most_fields",
                    "fields":[
                        "title^" + str(self.boosts_default["title"]),
                        "released_year^" + str(self.boosts_default['released_year']),
                        "album^" + str(self.boosts_default["album"]),
                        "genre^" + str(self.boosts_default["genre"]),
                        "lyrics^" + str(self.boosts_default["lyrics"]),
                        "lyricist^" + str(self.boosts_default["lyricist"]),
                        "musician^" + str(self.boosts_default["musician"]),
                        "singer^" + str(self.boosts_default["singer"]),
                        "metaphor^" + str(self.boosts_default["metaphor"])
                    ]
                }
            },
            "aggs": {
                "singer_filter": {
                    "terms": {
                        "field": "singer.keyword"
                    }
                },
                "lyricist_filter": {
                    "terms": {
                        "field": "lyricist.keyword"
                    }
                },
                "musician_filter": {
                    "terms": {
                        "field": "musician.keyword"
                    }
                }
            },
        }

    def wild_card(self):
        return {
            "query": {
                "wildcard": {
                    "lyrics": {"value": f"{self.query}"}
                }
            }
        }
        