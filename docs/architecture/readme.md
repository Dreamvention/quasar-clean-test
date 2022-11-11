# Application Architecture

## Layers and their Responsibilities

1. Presentation - Provision of services, display of information (e.g., in Windows or HTML, handling of user request (mouse clicks, keyboard hits), HTTP requests, command-line invocations, batch API)
2. Domain - Logic that is the real point of the system
3. Data - Communication with databases, messaging systems, transaction managers, other packages
4. Setup - the setup layer is where we keep out config files and setup the Dependency injection container

### Domain Layer

1. [Entities](domain-entities.md)
2. [Services](domain-services.md)

### Data Layer

1. [Repositores](data-repositories.md)
2. [Mappers](data-mappers.md)

### Presentation Layer

1. Boot
2. Pages and layouts
3. Components
4. [Store](presentation-store.md)
5. [Utils](presentation-utils.md)
6. Css
7. Assets

### Setup Layer

1. Config
2. DI
