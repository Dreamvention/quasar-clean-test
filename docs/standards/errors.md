# Error handling

> Erros need love too ❤️

## Error Layers

- Data: Errors that emit repositores and mappers. They can be different depening on the repository interfaces
- Domain: Are listed in `domain/entities` and are located next to the appropriate entity. They are emited by Entities, services and are also Mapped to Data errors by `ErrorMap`
- App: (application) errors, that are emitted by the presentation layer. They are handled by the presentation and do not need extra abstraction.

## ErrorHandler

The Presentation layer catches all the Errors emitted by the Domain Layers. It is forbidden to propagate a Data Error directly to the Presentation layer. Every Data Error must be mapped to a Domain Error and specified as the `source` of the Error.
