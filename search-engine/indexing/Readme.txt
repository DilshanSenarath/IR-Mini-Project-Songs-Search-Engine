For Indexing Following codes should be used. (Execute in terminal)

1. First Install the ICU Analysis Plugin

    sudo bin/elasticsearch-plugin install analysis-icu

2. Create the mapping

    curl -X PUT "localhost:9200/songs-corpus?pretty" -H "Content-Type: application/json" -d @mapping.json

3. Index the documents

    curl -X POST "localhost:9200/songs-corpus/_bulk?pretty" -H "Content-Type: application/json" --data-binary @songs.json