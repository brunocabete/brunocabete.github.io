---
title: "Contribuindo para um projeto open source: Julius, Augustus e Caesar III"
author: Bruno Cabete
pubDatetime: 2022-06-06T04:06:31Z
slug: example-draft-post
featured: false
draft: true
tags:
  - Open Source
description:
  "Minhas dores, aprendizados e contribuições"
---

Finalmente, depois de revisitar o jogo Caesar 3 várias vezes ao longo dos anos, resolvi checar o projeto Julius, que recria o jogo original de forma open source tentando manter compatibilidade total com todas as funcionalidades e bugs, mas apresentar ele de uma forma mais compatível com os sistemas modernos.

Do Julius sai também o projeto Augustus, que pega toda base do projeto original e agora sim se propõe a corrigir seus bugs e idiossincrasias , além de adicionar conteúdo novo ao jogo e se permitir mais liberdade para criar em cima da obra original.

Ao baixar a versão de linux do jogo, vi que a interface original ficava um pouco pequena no meu monitor moderno, então logo joguei a opção de escala de interface nos 200% só pra ver que agora o meu mouse não clicava mais onde eu queria. Para conseguir clicar em um botão, eu precisava ficar escaneando o vazio abaixo e a direita dele lentamente até ver o efeito de hover e saber que era la que o jogo achava que meu cursor estava.

Foi aí que me acendeu um fogo interno que não foi nem na alma nem no coração, e eu resolvi procurar eu mesmo o motivo do bug.

Fui lá no repositório do Augustus, pesquisei nas issues, e achei alguém com o mesmo bug que eu! E além disso tinha outra pessoa dando uma solução que aparentemente iria resolver o problema. Será que a galera não deu muita atenção porque a solução estava em um comentário na issue e nenhuma pull request tinha sido aberta? Será que consigo fazer a boa pra todo mundo e deixar tudo pronto só para os mantenedores aceitarem e então resolver um problema que impede a galera do linux de jogar?

Baixei o código fonte, sofri pra descobrir como funcionava um sistema de build de C, baixei as dependências e apliquei o patch que o coleguinha tinha comentado. Abri o jogo e... funcionou? Parece que realmente só faltava alguém com disposição de preparar tudo e fazer a PR.

Cheguei até a fazer a PR, deixando claro de onde tinha saído o patch e pedindo encarecidamente para que pessoas com acesso mais fácil a uma máquina windows testassem também.

No fim, minha ansiedade não deixou eu esperar e eu mesmo fui testar no windows só pra perceber que o patch tinha quebrado essa build.

O culpado parecia ser o tal do SDL, biblioteca usada em tudo quanto é plataforma pra que os devs possam interagir com a parte de áudio, vídeo e input do hardware de forma transparente e independente da plataforma ( nesse caso transparente significa abstraído, e não exposto. Engraçado que a mesma palavra tem sentidos praticamente opostos né).

Tentei então baixar o jogo pelo appimage ao invés de buildar eu mesmo ou baixar pelo flatpak, e dessa vez parecia que não tinha nenhum problema. Por que não tinha problema? Se quebrava em outras releases mas não nessa, então tem algo de diferente aqui.

Depois de fuçar um pouco (e aprender um bocado) mas pastas de build automatizada para o Github actions e tentar replicar os processos com docker, ferramentas locais e um pouco de alquimia digital mas, e apesar de não ter conseguido buildar o que eu queria, consegui algumas pistas.

O appimage usa uma versão mais antiga do SDL2 (2.0.20), enquanto minha distro Linux tem uma versão bem mais recente, a 2.32.68. E se eu testasse as versões até achar em qual delas o bug aparece? Aí eu consigo ver o que mudou e sugerir uma correção.

Depois de pesquisar um pouco achei uma metodologia que ia me permitir testar isso de uma maneira tranquila: extrair os arquivos do appimage (--appimage-extract), e rodar o executável do jogo com a variável de ambiente LD_LIBRARY_PATH apontando pra uma pasta com a versão do SDL que eu quisesse. Era só baixar e buildar a lib na versão que eu quisesse que o executável ia procurar primeiro na minha pasta, encontrar, e depois achar o resto das biblioteca dinâmicas na pasta padrão do appimage.

E assim fui testando. Algumas logo depois da 2.0.20, algumas mais recentes, algumas mais pro meio, e nunca que eu achava uma que quebrava o jogo. Cadê a versão 2.32.68 que eu sei que quebra? Não existe? De onde minha distro tirou isso? SDL2-compat???

Aparentemente as distros com pacotes mais atuais não usam mais o SDL2 original (que já é bem mais antigo). Elas usam o SDL2-compat, que é na verdade o SDL3 com uma camada de compatibilidade para funcionar em programas feitos com o SDL2.
O problema nunca foi o SDL2, e sim essa biblioteca de compatibilidade que, de acordo com os próprios devs, deveria ser 100% compatível e portanto quaisquer diferenças de comportamento devem ser reportadas (e foi isso que eu fiz).

Como aquele fogo que eu citei ali em cima ainda não tinha apagado, resolvi ver qual pacote o flatpak usava, e logicamente que ele usava a versão compat, e por isso o bug.
Consegui buildar uma versão local do flatpak com a biblioteca original e corrigiu o problema. Mais uma evidência que eu tinha resolvido o mistério.

No fim, de todas as build de Linux, somente a appimage usava uma versão dos pacotes do Ubuntu (que usa versões mais antigas) e portanto incorporava o SDL2 sem compat.
O resto todo usava a versão incompatível do compat e por isso quebrava.

Agora só me resta esperar o pessoal do SDL lançar um patch e — notificação do email — "Opa, tá aqui o patch."
Os caras lançaram o patch enquanto eu escrevia isso... Fiz um teste e funcionou!

Conclusão: Fui tentar jogar Caesar 3 e saí sabendo mais sobre C e suas ferramentas de compilação, bibliotecas dinâmicas e como são carregadas em runtime, desenvolvimento de jogos, ações automatizadas do Github e como funcionam os modos de distribuição de software no Linux por baixo dos panos.