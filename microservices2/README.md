Application  | Port
------------- | -------------
Currency Exchange Service  | 8000, 8001...
Currency Conversion Service  | 8100, 8101...
Netflix Eureka Naming Server  | 8761
Netflix Zuul API Gateway Server  | 8765 
Zipkin Distributed Tracing Server  | 9411


##### E un API GATEWAY si doua microservicii (care sunt pur pentru testarea gatewayului):
##### Currency Exchange Service care are o baza de date cu rate de schimb care suporta requesturi de tipul:
	localhost:8000/currency-exchange/from/{from}/to/{to} 
	( de ex. localhost:8000/currency-exchange/from/EUR/to/RON )
##### Currency Conversion Service care suporta requesturi de tipul:
	localhost:8100/currency-converter-feign/from/{from}/to/{to}/quantity/{quantity} 
	( de ex. localhost:8100/currency-converter-feign/from/EUR/to/RON/quantity/120 )

##### Microserviciul cu conversii apeleaza microserviciul cu ratele de exchange tot prin API Gateway.

##### Requsturile catre api-gateway sunt de genul asta: 
	http://localhost:8765/{application-name}/{uri}
##### , adica un client nu va face request direct la microserviciu, ci va face request la gateway care va redirectiona requestul.


##### O ordine corecta de rulare a aplicatiilor:
	Eureka Naming Server 
	Zipkin Distributed Tracing
	Microservices
	Zuul API Gateway

##### Instalare RabbitMQ: https://www.rabbitmq.com/install-windows.html (atentie ca mai intai trebuie instalat erlang)

##### Ca sa pornesti zipkin mai intai trebuie pornit rabbitmq-server si dupa:
	SET RABBIT_URI=amqp://localhost
	java -jar zipkin-server-2.12.8-exec.jar




##### Microserviciile ar trebui sa:
1. Self registration cu EurekaDiscoveryClient(trebuie doar importat in pom.xml dependenta, pus in application.proprieties adresa la care o sa fie nameserverul si de pus @EnableDiscoveryClient)
	
2. Toate requesturile dintre microservicii se vor face tot prin api-gateway... aici faceti cum stiti sau folositi feign pentru requesturi... se face un proxy in care se va pune metoda de request a microserviciului la care vreti sa faceti request si se apeleaza simplu unde este nevoie.
	
3. Sa foloseasca sleuth care atribuie un id unic fiecarui request pentru a face trace la requesturi.
Se adauga dependenta pt sleuth	
```html
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-sleuth</artifactId>
	</dependency>
```
	
In Application, unde e mainul se adauga si
```html
	@Bean
	public Sampler defaultSampler(){
		return Sampler.ALWAYS_SAMPLE;
	}
```
Si ar mai trebuit adaugat eventual si un logger.info(ceva relevant) pentru fiecare request ca sa se vada ce raspuns da pt un anumit request. 

4. Sa fie configurate pt zipkin si rabbitmq.
	Toate microserviciile vor pune requesturile intr-un queue (rabbitmq) si serverul zipkin isi va lua de acolo requesturile si le va putea face trace, fiecare avand un id unic (de la sleuth).

	De adaugat in pom.xml dependentele:
	```html
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-sleuth-zipkin</artifactId>
	</dependency>
	<dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-bus-amqp</artifactId>
	</dependency> 
	```
