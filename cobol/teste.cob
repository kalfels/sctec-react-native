       identification division.
       program-id.   sys000
                     is initial program.
       author.       Eduardo Luiz Marques.
       installation. MEVALE.
       date-written. 20/04/1998.

      * -------------------------------------------------------------- *
      *  ACESSO AO MENU GERAL DE SISTEMAS - CONTROLE OPERACIONAL       *
      * -------------------------------------------------------------- *

       environment division.
       configuration section.
       special-names.
             decimal-point is comma.
       input-output section.
       file-control.
       copy "E:/Sistema MEVEPI/desenv/fontsys/selhoje.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/selfili.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/selsen1.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/selsenh.lib".

       data division.
       file section.
       copy "E:/Sistema MEVEPI/desenv/fontsys/layhoje.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/layfili.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/laysen1.lib".
       copy "E:/Sistema MEVEPI/desenv/fontsys/laysenh.lib".

       working-storage section.
       copy "E:/Sistema MEVEPI/desenv/library/syswork.lib".

       01  ws01-tabela.
           03 ws03-descricao    pic x(28)      occurs 13 times.

       01  link-parametros.
           03 link-filial       pic 9.
           03 link-nome         pic x(34).
           03 link-fantasia     pic x(07).
           03 link-data         pic 9(08).
           03 link-codigo       pic 999.
           03 link-usuario      pic x(10).
           03 link-sistema      pic 99.
           03 link-restricao    pic 99.

       copy "E:/Sistema MEVEPI/desenv/library/systabe.lib".
       copy "E:/Sistema MEVEPI/desenv/library/systela.lib".

       01  tela1.
           03 line 10 col 01  value "Nome do Usuario ..:              ".
           03 line 13 col 01  value "Codigo da Filial .:   -          ".
           03 line 16 col 01  value "Data Atual .......:           ".

       procedure division.
       p00-monta-tela.
            move function current-date (1:8) to ws77-data.

           accept ws01-hora-sis from time.

           string ws03-hor, ":", ws03-min, "     ",
           delimited by size  into link-usuario.

           move "     SISTEMAS ADMINISTRATIVOS    "  to link-nome.
           move "SYS  000"                           to ws77-cabnro.
           move "     ACESSO AO MENU PRINCIPAL     " to ws77-cabprog.

           display tela-moldura1.
           display tela-moldura4.
           display tela1.

       p01-accept-usuario.
           accept senh-codigo from user name.

       p02-accept-filial.
           display "Informe o Codigo da Filial a Utilizar...  " at 2412.

           display "          "    at 1325.
           accept  fili-codigo     at 1321   with prompt
                                   on escape go p99-exit.

           if fili-codigo       =  0
              go p11-accept-filial.

           move fili-codigo     to ws03-backfil.

       p03-abre-fili.
           move ws03-sistema(13)   to ws03-arqsis1       ws03-arqsis2.
           move "fili"             to ws03-arqnome.
           move       0            to ws03-arqfil.
           open input fili.
           if ws77-statfili not =  "00"
              string "PROBLEMAS NA ABERTURA DO ARQUIVO FILIAIS... ",
              "ERRO = ", ws77-statfili, delimited by size into ws77-msg
              perform p80-mostra-msg
              go p99-exit.

       p04-abre-senh.
           move ws03-sistema(13)   to ws03-arqsis1       ws03-arqsis2.
           move "senh"             to ws03-arqnome.
           move       0            to ws03-arqfil.
           open input senh.
           if ws77-statsenh not =  "00" 
              string "PROBLEMAS NA ABERTURA DO ARQUIVO USUùRIOS... ",
              "ERRO = ", ws77-statsenh, delimited by size into ws77-msg
              perform p80-mostra-msg
              close fili
              go p99-exit.

      * ------------------ ROTINAS DE PROCESSAMENTO ------------------ *

       p10-accept-usuario.
           read senh.
           if ws77-statsenh not =  "00"
              move "USUùRIO NùO CADASTRADO NO ARQUIVO..." to ws77-msg
              perform p80-mostra-msg
              close fili senh
              display " "             at 1680
              go p99-exit.

           move senh-codigo     to link-codigo.
           move senh-nome       to link-usuario.

           display senh-nome       at 1021.

       p11-accept-filial.
           read fili.
           if ws77-statfili not =  "00"
              move "FILIAL NùO CADASTRADA NO ARQUIVO..." to ws77-msg
              perform p80-mostra-msg
              go p02-accept-filial.

           move ws77-data       to ws77-data1.
           move fili-codigo     to link-filial.
           move fili-nome       to link-nome.
           move fili-fantasia   to link-fantasia.

           display link-fantasia   at 1325   with highlight.

       p12-accept-data1.
           display "Informe a Data para Processamento...      " at 2412.

           display "          "    at 1621.
           accept  ws77-data1      at 1621   with prompt update
                                   on escape go p11-accept-filial.

           move ws77-data1     to link-data             ws01-data-arq.
           move ws77-data1     to ws77-datavideo.

           display ws77-datavideo  at 1621.

           perform p84-verifica-data.

           if ws77-flag         =  "1"
              go p12-accept-data1.

           move       07        to ws77-lin1.
           move       01        to ws77-con1.
           move ws77-data       to ws77-datavideo.

           close fili senh.

           if ws77-data1    not =  ws77-data
              string "DATA ATUAL CORRETA ù ", ws77-datavideo, "...",
              delimited by size into ws77-msg
              perform p80-mostra-msg.

       p13-mostra-menu.
           move "SYS  000"                           to ws77-cabnro.
           move "MENU PRINCIPAL ACESSO AOS SISTEMAS" to ws77-cabprog.

           display tela-moldura1.
           display tela-moldura4.

           display "Utilize as Setas de Movimentaùùo...       " at 2412.

           perform varying ws77-con  from 01  by 01  until ws77-con > 13
           move spaces          to ws03-descricao(ws77-con)
           end-perform.

           move "CONTROLE DE VENDAS ... (COV)" to ws03-descricao(01).
           move "SISTEMA CONTABILIDADE  (CON)" to ws03-descricao(02).
           move "SISTEMA CONTAS RECEBER (REC)" to ws03-descricao(03).
           move "SISTEMA CONTAS A PAGAR (PAG)" to ws03-descricao(04).
           move "SISTEMA LIVROS FISCAIS (LIV)" to ws03-descricao(05).
           move "SISTEMA FLUXO DE CAIXA (CAI)" to ws03-descricao(06).
           move "SISTEMA FATURAMENTO .. (FAT)" to ws03-descricao(07).
           move "CONTROLE DE ESTOQUE .. (EST)" to ws03-descricao(08).
           move "CONTROLE DE OFICINA .. (OFI)" to ws03-descricao(09).
           move "SISTEMA MALA DIRETA .. (MAL)" to ws03-descricao(10).
           move "FOLHA DE PAGAMENTO ... (FOL)" to ws03-descricao(11).
           move "DISPONùVEL ........... (   )" to ws03-descricao(12).
           move "CONTROLE OPERACIONAL . (SYS)" to ws03-descricao(13).

           compute ws77-lin     =  ws77-lin1        -    01.
           compute ws77-con     =  ws77-con1        -    01.

           display "                              "
                                   at 0526   with underline highlight.

           display ws03-descricao(01)  at 0727.
           display ws03-descricao(02)  at 0827.
           display ws03-descricao(03)  at 0927.
           display ws03-descricao(04)  at 1027.
           display ws03-descricao(05)  at 1127.
           display ws03-descricao(06)  at 1227.
           display ws03-descricao(07)  at 1327.
           display ws03-descricao(08)  at 1427.
           display ws03-descricao(09)  at 1527.
           display ws03-descricao(10)  at 1627.
           display ws03-descricao(11)  at 1727.
           display ws03-descricao(12)  at 1827.
           display ws03-descricao(13)  at 1927.
           display "                              "
                                   at 2026   with underline highlight.

       p14-seleciona-escolha.
           add        01        to ws77-lin              ws77-con.

           display "=ù"            at line   ws77-lin    column 24
                                             with reverse-video
                                                  highlight.

           display ws03-descricao(ws77-con)  at line ws77-lin column 27
                                             with highlight.

           accept  ws77-prompt     at line   ws77-lin    column 24
                                             with secure auto-skip
                                   on escape go p00-monta-tela.

           display "   "           at line   ws77-lin    column 24.

           if ws77-prompt       =  0
              go p15-abre-sen1.

           display ws03-descricao(ws77-con)  at line ws77-lin column 27.

           if ws77-prompt   not =  2  and  8
              subtract 01     from ws77-con              ws77-lin
              go p14-seleciona-escolha.

           if ws77-prompt       =  2

              if ws77-con       =  13
                 move 06        to ws77-lin
                 move 00        to ws77-con.

           if ws77-prompt       =  8

              if ws77-con       =  01
                 move 18        to ws77-lin
                 move 12        to ws77-con
              else
                 subtract 02  from ws77-con              ws77-lin.

           go p14-seleciona-escolha.

       p15-abre-sen1.
           move ws03-sistema(13)   to ws03-arqsis1       ws03-arqsis2.
           move "sen1"             to ws03-arqnome.
           move link-filial        to ws03-arqfil.
           open input sen1.
           if ws77-statsen1 not =  "00"
              string "PROBLEMAS NA ABERTURA DO ARQUIVO SISTEMAS... ",
              "ERRO = ", ws77-statsen1, delimited by size into ws77-msg
              perform p80-mostra-msg
              go p99-exit.

           move senh-codigo     to sen1-codigo.
           move ws77-con        to sen1-sistema.
           read sen1.
           if ws77-statsen1 not =  "00"
              move "ACESSO NùO PERMITIDO A ESTE SISTEMA..." to ws77-msg
              perform p80-mostra-msg
              close sen1
              go p13-mostra-menu.

           move sen1-nivel      to link-restricao.
           move ws77-con        to link-sistema.

           close sen1.

       p16-rumo.
           move ws77-con        to ws77-con1.
           move ws77-lin        to ws77-lin1.

           string "/local/objetos/", ws03-sistema(ws77-con), "100",
           delimited by size  into ws77-prog1.

           call ws77-prog1 using link-parametros
                           on exception  go p13-mostra-menu.

           go p13-mostra-menu.

      * --------------------- ROTINAS AUXILIARES --------------------- *
         copy "E:/Sistema MEVEPI/desenv/library/rotinas.lib".

      * ------------------ PARAGRAFO DE ENCERRAMENTO ----------------- *

       p99-exit.
           stop run.
