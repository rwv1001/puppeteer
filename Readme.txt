To create image:
docker build . -t puppeteer

To run:
docker run -d --net=host --device /dev/snd --name puppeteer puppeteer
docker update --restart unless-stopped puppeteer

To see logs:
docker exec -it puppeteer /bin/bash
Then
tail -f logServerCall.log



