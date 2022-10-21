# Sobre Web Scraping
Web scraping é o processo de coleta de dados estruturados da web de maneira automatizada. Também é chamado de extração de dados da web. Alguns dos principais casos de uso do web scraping incluem monitoramento de preços, inteligência de preços, monitoramento de notícias, geração de leads e pesquisa de mercado, entre muitos outros.

Em geral, a extração de dados da web é usada por pessoas e empresas que desejam usar a vasta quantidade de dados da web disponíveis publicamente para tomar decisões mais inteligentes.

Se você já copiou e colou informações de um site, você executou a mesma função que qualquer “raspador” da web, apenas em uma escala microscópica e manual. Ao contrário do processo mundano e entorpecedor de extrair dados manualmente, o web scraping usa automação inteligente para recuperar centenas, milhões ou até bilhões de pontos de dados da fronteira aparentemente infinita da Internet.

E não deve ser surpresa, porque web scraping fornece uma coisa realmente valiosa, que nada além dele pode: ele fornece dados estruturados da web de qualquer site público.

Mais do que uma conveniência moderna, o verdadeiro poder do web scraping está na sua capacidade de criar e potencializar alguns dos aplicativos de negócios mais revolucionários do mundo. “Transformativo” nem mesmo começa a descrever a maneira como algumas empresas usam dados coletados da web para aprimorar as suas operações, desde informando decisões executivas até experiências individuais de atendimento ao cliente.

## Técnica utilizada para Web Scraping
1. Identifique o site de destino.
2. Colete URLs das páginas de onde você deseja extrair dados.
3. Faça uma solicitação a esses URLs para obter o HTML da página.
4. Use localizadores para encontrar os dados no HTML.
5. Salve os dados em banco de dados de forma estruturada de acordo com o que você precisa

# Instalação
> 1. Crie um novo projeto no Google Cloud Platform
> 2. Ative o faturamento em seu projeto (Para efeitos de testes, este serviço entra no Tear Free do Google Cloud Platform. [ Veja Mais sobre Tear Free do GCP ](https://cloud.google.com/free/docs/free-cloud-features)
> 3. Para setup do Datastore em modo Datastore: [Instalação](https://cloud.google.com/datastore/docs/store-query-data)
> 4. Crie uma conta de serviço com permissões de leitura e escrita para o Datastore. [passo-a-passo](https://console.cloud.google.com/iam-admin/serviceaccounts/create)
> 	4.1- Para criar um KEY para esta nova conta, clique na conta criada > clique na aba "KEYS" > clique no botão "Add Key" > clique em Create New Key > Selecione JSON. Baixe o seu json dentro do projeto, na pasta [/key]() e renomeie-o para "service-account.json"
> 5. Execute ```npm install``` na raiz do projeto, para executar a instalação das dependências. 
> 6. Altere a variável PROJECT_ID dentro do arquivo [/app/config/index.js](https://github.com/N4W-Web-Solutions/web-scraping/blob/main/app/config/index.js) com o ID de seu projeto no GCP.
> 7. Altere a variável PROJECT_ID dentro do arquivo [/package.json](https://github.com/N4W-Web-Solutions/web-scraping/blob/main/package.json) com o ID de seu projeto no GCP.
> 8. Altere a variável PROJECT_ID dentro do arquivo [/app.yaml](https://github.com/N4W-Web-Solutions/web-scraping/blob/main/app.yaml) com o ID de seu projeto no GCP.
> 9. Caso não exista a pasta
> 10. Executar o comando de deploy: ```npm run deploy```. Este comando fará o deploy de seu serviço no [Google App Engine - GAE](https://console.cloud.google.com/appengine) com os seguintes parâmetros configurados no arquivo [/app.yaml](https://github.com/N4W-Web-Solutions/web-scraping/blob/main/app.yaml)
> ```yaml
> runtime: nodejs14
> env: standard
> service: default
> automatic_scaling:
>   min_instances: 1
>   max_instances: 1
> network:
>   instance_tag: appengine-webscraping-service
>   subnetwork_name: subnet-eua
> env_variables:
>   GOOGLE_APLLICATION_ID: [ID_DO_PROJETO]
> ```
> 11. Via "POSTMAN", acessar as urls do serviço abaixo (Postman Collection na raíz do projeto, bastando alterar a url do serviço)
> 12. Para verificar os dados, acesse o [Google Datastore](https://console.cloud.google.com/datastore]) de seu projeto.

# Execução do serviço
1. Execute o ***endpoint*** ```(POST) /veiculos``` para cadastrar um novo veículo de notícia, com os parâmetros setados conforme a Coleção do Postman disponibilizada. Este serviço somente deve ser executado quando houver um novo veículo para ser cadastrado.
2. Execute o ***endpoint*** ```(GET) /veiculos``` para listar todos veículos cadastados.
3. Execute o ***endpoint*** ```(POST) /sitemap``` para começar a varrer as urls do sitemap cadastado (veículo), salvando-as no database.
4. Execute o ***endpoint*** ```(POST) /readnews``` para ler todos os htmls dos urls salvos no database, extraindo os campos que estão nos modelos de dados.

# Suporte
Para suporte, me envie um e-mail: <desenvolvedor@outlook.com>