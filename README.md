# Projet Marie COMON et Louis FRULEUX
## Les fonctionnalités suivantes fonctionnent :
 * Ajout de réponses
 * Ajout de questions
 * Noter les réponses
 * Noter les questions
 * Afficher les bons usernames et icone pour les questions et les réponses
 * Création de channel
 * CHangement de channel sans refresh la page

## Cependant certains bugs restent présent :
 * La page se refresh après l'ajout d'une question ou d'une réponse (dû à la non présence d'un event.preventDefault())
 * A chaque refresh, le login se perd (dû à la non présence de session et/ou de cookie)
 * L'API fetchJson peut poser des problèmes dû aux permissions de requêtes (normalement, les requêtes sur localhost doivent fonctionner, sinon une erreure de type "TypeError: NetworkError when attempting to fetch resource." apparaît)