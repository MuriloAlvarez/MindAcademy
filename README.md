<h1 align="center"> Mind Academy </h1>

<p align="center">
Site desenvolvido para o processo seletivo da Mind Consulting <br/>
<a href="https://mindconsulting.com.br/">Conheça a Mind</a>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="projeto Mind Academy" src="./front/Assets/images/bg-readmemindacademy.png" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML e CSS
- JavaScript
- Git e Github
- Figma
- MySQL
- Booststrap
- Node.JS

## 💻 Projeto

A Mind Academy veio para ajudar Professores que desejam criar seus própios cursos Online;

- [Acesse o projeto finalizado, online]()


## 🔖 Layout

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/file/2YYemjvd25RRDIxcT6IxGz/Untitled?type=design&node-id=0%3A1&mode=design&t=C9hzwKmr8ggutzdh-1). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## :memo: Licença

Esse projeto está sob a licença MIT.


## ⚙️ Como Rodar a aplicação 

### Instalação do Node e verificação

- Certifique-se de que o Node já esteja baixado em sua máquina;
```ruby
node --version
```
- Caso não esteja, clique no link abaixo para ver o passo a passo do download (MacOS, Windows ou Linux);

<a href="https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos"> Clique aqui 👈</a>

---

### Rodando Banco de Dados e alterando a Conection String
- Criar e rodar o banco de dados em sua máquina;
#### Local do Documento 
- Pasta - scripts;
- Documento - criacao-db.js;

#### Alterar as informações da Conection Sting;
- Pasta - src;
- Documento - db.js;
- Linha de código 6;
- Insira as informações de seu banco da maneira sinalizada abaixo;
```ruby
mysql://username:password@localhost:3306/nomedobanco
```
---

### Instalando as dependências e iniciando a aplicação
- Para fazer o download das dependências, utilize o código abaixo no terminal do seu editor de código;
```ruby
npm install
```
- Para iniciar nossa aplicação, vamos utilizar o terminal novamente, inserindo o código abaixo;
```ruby
npm start
```
---
### Acessando nossa aplicação
- Nossa aplicação já esta iniciada, agora precisamos acessar ela !
#### Local do Documento
- Pasta - front;
- Pasta - Cadastro;
- Documento - index.html;

#### Rodando a aplicação
- É necessário ter a extensão **Live Server** instalado em seu editor de código;
- Com a extensão instalada, clique no botão localizado no canto inferior de seu editor de código -> **Go Live**;

#### Selecionando as dimensões corretas
- Com a aplicação rodando em seu navegador, abra o painel de **Inspecionar**
- Selecione a opção de Dimensão -> ** Pixel 7 **

#### Inserindo dados de nosso usuário
- Agora que nossa aplicação já está rodando em seu navegador e esta nas dimensões corretas, vamos inserir os dados de Login que estão listados abaixo;
```ruby
username: admin
password: 123
```


