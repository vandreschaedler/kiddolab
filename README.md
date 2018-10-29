# kiddolab

## Instalação

Clonar repositório => git@github.com:vandreschaedler/kiddolab.git
* **Success Response:**

```sh
cd kiddolab
docker-compose build
docker-compose up




Obs: não está funcional, não consegui fazer RabbitMQ (servidor AMQP) rodar no Docker Compose. 
Conecta, executa, não ocorrem erros, mas com o compose não funciona, nada ocorre, diferentemente de fora do docker, 
onde funciona normalmente. 
Devido isso, acabei não criando endpoint para enviar o arquivo .csv para ser consumido, estava colocando na mão. 

Arquivo .csv deve ser colocado na pasta ./amqp_server/charges onde, a cada minuto será lido e excluído. 

Endpoint para verificar dados do banco: http://consumer_server/v1/api/fetch
