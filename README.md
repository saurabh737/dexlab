# dexlab
Spring 2022 Project

Team members:

Sanket Bailmare - sbailmar@iu.edu

Kumar Saurabh - ksaurabh@iu.edu

Shubham Thakur - sdthakur@iu.edu

## Microservices:

dexlab is compose of following services:

gateway: Serve client-facing APIs and relay requests to other servies

ingestor: Download data from NEXRAD's S3 bucket and generate reflectivity plots

ORM: Interact with the databse. Other services cannot directly with the database.

## Installation:

### Prerequisites:

`docker` and `docker-compose` must be installed on the system.

### Setup:

Start the services:

```
$ docker-compose up
```

## Documentation:

Documentation about the respective services can be found in their respective branches.

OpenAPI compliant API docs are served on the following URL. 

Gateway: http://localhost:3001/apidocs

ORM: http://localhost:8000/swagger-ui.html

Ingestor: http://localhost:5001/apidocs




