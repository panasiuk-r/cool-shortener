# cool-shortener
Really quick guide:
To create a shorter URL, you need to:
PUT http://your_host:your_port/shorten
with a body like this:
{
  "url": "http://www.facebook.com"
}
If you want to get URL redirection:
GET http://your_host:your_port/shorten?url=http://xpl.ac/Vddcs
All configuration can be changed in the config.env file. Be aware that if you're changing database-related configuration, update it in the docker-compose file as well.

HOW TO SCALE:
First of all, I haven't made the origin URL a unique value because I want to keep it user-friendly. If a user loses their short URL, they can create a new one. However, it's obvious that with larger scaling, the database would contain lots of unnecessary information.
Also, I haven't implemented a checker to see if a short URL already exists. Yet, it should still be unique because it's the primary key. I didn't do it because there are nearly a billion combinations with a 5-symbol sequence from 62 possible characters.
With a large scale, using a string as a primary key might not be ideal due to MySQL indexing.
It's also a good idea to host it in Kubernetes (k8s) or simple VMs so you can implement vertical scaling with a load balancer.
