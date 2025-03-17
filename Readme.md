
### Requisitos Funcionais

1. Funcionalidades do Administrador
- [x] Cadastrar os laboratórios disponíveis. (25/02 Front) - (18/03 Back)
- [x] Cadastrar datas e horários disponíveis para uso dos laboratórios. (11/03 Front) - (18/03 Back)
- [x] Cadastrar usuários que podem solicitar agendamento de laboratório (informando nome, email, login, senha e categoria de usuário).(11/03 Front) - (18/03 Back)
- [x] Cadastrar administradores que poderão aprovar as solicitações de reserva.(11/03 Front) - (18/03 Back)
- [] Aprovar ou rejeitar solicitações de reserva de laboratórios.
- [] Permitir que administradores bloqueiem determinados horários para manutenção ou eventos institucionais.
- [] Deve existir opção de enviar notificações automáticas antes da reserva para lembrar o usuário da utilização do laboratório.
- [] Emitir relatório de reservas contendo: data da solicitação, data e horário da reserva, e responsável pela reserva.
- [] Emitir relatório de usuários cadastrados contendo: data de cadastro, nome, email e categoria do usuário.
2. Funcionalidades do Usuário
- [x] Realizar login no sistema. (11/03 Front) - (18/03 Back)
- [x] Visualizar um calendário com os horários disponíveis e indisponíveis para reserva de laboratórios.(11/03 Front) - (18/03 Back)
- [] Solicitar reserva informando: nome, data e horário da reserva, e evento que será realizado.
- [] Cancelar uma reserva a qualquer momento.
- [] Receber notificações por email sobre o status da reserva (aprovada ou rejeitada).
- [] Deve existir uma página pública onde qualquer usuário consiga visualizar as reservas.

### Requisitos Não Funcionais

O sistema deve ser uma aplicação web.
O front-end, back-end e banco de dados podem ser hospedados em um único servidor.
O sistema deve ser desenvolvido utilizando tecnologias adequadas para aplicações web.
O sistema deve enviar emails automáticos:
Para o administrador quando uma reserva for solicitada, contendo um link para aprovação.
Para o usuário quando sua reserva for aprovada ou rejeitada.
