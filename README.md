## Primeiro Passos


- Renomear o arquivo `.env.example` para `.env`.

- Confirmar se as porta `8000` e `4444` estão livres no seu sistema.
Se não tiverem livres, alterar as variáveis `PORT_APP` e `PORT_DB` no arquivo `.env` para portas livres.




## Instalação e Execução do Projeto

```bash
$ docker compose up --build
```

## Informações Adicionais
- A aplicação estará disponível em `http://localhost:8000` (variavel `PORT_APP`)
- O banco de dados mysql estará disponível em `localhost:4444` (variavel `PORT_DB`)
- O App só será iniciado após o docker conseguir iniciar o banco de dados.
- As migrations serão executadas automaticamente na primeira vez que o app for iniciado.
- O banco de dados será criado automaticamente na primeira vez que o app for iniciado.
- O client prisma será criado automaticamente na primeira vez que o app for iniciado.
- O app apenas tem criado os arquivos de testes, mas não tem testes implementados.

## Link de Funcionamento

https://drive.google.com/file/d/1ieI7HyNb5Y2lYrxKBw3hin3EtP3OIFHh/view?usp=sharing

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
