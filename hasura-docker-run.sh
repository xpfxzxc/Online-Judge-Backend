#! /bin/bash
docker run -d -p 8080:8080 \
    -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
    hasura/graphql-engine:v1.1.0 \
    graphql-engine \
    --database-url postgres://postgres:root@docker.for.win.localhost:5432/online-judge \
    serve \
    --admin-secret myadminsecretkey \
    --jwt-secret '{"type":"HS256", "key": "q9j-Ct8iQD-Z8yuZRbAy6LulFo07VTKiRQntuSWWfRc"}' \
    --unauthorized-role guest