# Quasar Clean Test

1. Clone and Install application (run: `yarn`, node version 16)
2. Run application (run: `yarn dev`)
3. When application opens, login with

login: `ask for credentials`
password: `ask for credentials`

4. Fix the title so that it doesn't go beyond the card borders (instead of `info+1@dreamvention.com`
   make it `info+1@dream...`)
5. Replace the image on the homepage with a real widget that displays a list of recommended courses with the same look as on the picture.

- Hint for task 5.
- You will need to create a Service called `LearningObjectsService` with a method `getRecommendedLearningObjects` that returns an Array of `ILearningObjectData`
- The service should implement the feature through a `LearningObjectsGateway` that returns an array of `ILearningObjectData` by using the `PrimeRepository` (learningObjects.list) and `LearningObjectMap` (toData)
- The learningObjects.list should make the following request (use `ILearningObjectOptions` to pass the pageLimit=10, filter.loTypes=course and include=enrollment )
  `https://captivateprimeeu.adobe.com/primeapi/v2/learningObjects/?page[limit]=10&filter.loTypes=course&include=enrollment `
- After you have created the `LearningObjectGateway` and `LearningObjectsService`, in the `src/stores` folder add a new module `learningObjects` where you add state item `recommended`, a getter `getRecommended` that uses the `LearningObjectMap.toDomain` to map from `ILearningObjectData` to `new LearningObject()` and an action `fetchRecommended` that uses the newly created service method `container.get(LearningObjectsService).getRecommendedLearningObjects()` to fetch the recommended learningObjects and store them in the `recommended` state,

- now that we have the store ready, we can create the component in folder `src/components/learningObject/RecommendedWidget.vue`. the component should accept props of learningObjects with a Array type `ILearningObject[]`
- when iterating through the LearningObjects, use a child component for the card `src/components/learningObject/thumb.vue`. the components should accept props of learningObject with a type `ILearningObject`

6. Design the components with BEM CSS like on the picture.

## Quasar Clean Architecture Framework

This is a starter kit for any frontend application built on Vue3 and Quasar. It can be used to create a web app, admin app, mobile app on capacitor or a desktop app on electron.

1. [Get started](docs/readme.md)
2. [Architecture](docs/architecture/readme.md)
3. [Development](docs/development/readme.md)
4. [Prime](docs/prime/readme.md)
5. [Standards](docs/standards/readme.md)

# Clean Architecture

Our new App Architecture will be based on the Clean Architecture concept:

![image](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

Here are some basic principles that derive from the SOLID principals:

1. Separate logic from UI.
2. Separate Dumb components from Smart components.
3. Separate Business logic from Application logic.
4. Store management (Pinia) is part of presentation.
5. Depend on obstructions (interfaces), not concretions (implementation).

## Separate logic from UI

In our Web Applications we would have the following layers

1. Presentation (Vuejs, UI Libraries, Pinia)
2. Domain (Services, Entities, Interfaces, Repository interfaces)
3. Data (Repositories, mappers)

#### UI rules:

1. No API Calls
2. No `any` types. Depends on Interfaces (Dependency Inversion principle)
3. Events are emitted. Possible Application logic (show/hide). No business logic.

> This way we can decouple our presentation from the domain logic and easily replace Vue with React as an example.

### Starter Kit

The folder structure looks like this:

```
app
 └── src
    //--------------------- Data
    └── repositories
        └── api
        └── prime
        └── auth
        └── webex
        └── wiw
        └── ...
    └── mappers
        └── course
    └── gateways
        └── course
    //--------------------- Domain
    └── entities
        └── course
            └── course.ts
            └── course.types.ts
            └── index.ts
        └── slide
        └── user
        └── auth
        └── ...
    └── services
        └── courses
        └── slides
        └── users
        └── auth
        └── ...
    └── interfaces
        └── gateways
    //--------------------- Setup
    └── setup
      //------------------- Dependency Injection Setup
      └── di
          └── index.ts
          └── di.ts
          └── repositories.ts
          └── mappers.ts
          └── services.ts
      └── config.js
    //--------------------- Presentation
    └── assets
    └── boot
        └── i18n.ts
        └── auth.ts
        └── di.ts
    └── components
        └── common
            └── Header.vue
            └── Footer.vue
        └── user
        └── course
        └── ...
    └── css
        └── scss
        └── fonts
    └── helpers
    └── layouts
    └── pages
        └── Home.vue
        └── Error.vue
        └── Catalog.vue
        └── Course.vue
        └── Search.vue
        └── Profile.vue
        └── ...
    └── router
    └── statics
    └── store
        └── modules
            └── courses
            └── slides
            └── users
            └── ...
```

# Domain layer

## Entities (Domain: Business logic)

Entities are our Business Logic and are part of the Domain. They are our Users, LearningObjects, Enrollments etc. They only know about themselves and operate only with the data provided.

> They can reference other entities.
> They hold the business validation logic. (Ex. a user can not have an empty Lastname, or be less then 18 years old)

## Services (Domain: Application logic)

Services are Application logic part of the Domain layer. They define the functionality of our Application (ex. our application can register users, enroll in Learning Objects etc). But they don't actually make the API requests. Instead, they use Repositories to do the ground work. Through dependency inversion they utilizes Repositories to implement the actual logic which is calling axios to do a POST request to register a user or enroll.

1. Layering ( Data -> Domain -> Presentation )
2. Decoupling ( Repositories -> DTO -> Entities/Services -> DTO -> Entities/Store -> Components)
3. Dependency injection (Inversion of control / IoC)

## Interfaces

The interfaces for Gateways are kept in the Domain folder because Services can not reference anything beyond the Domain folder. Think of interfaces as instruction manual for the Data layer to implement and thus be compatible with the Domain layer.

Here we will store the Gateway's interfaces that will describe the list of method a gateway should implement for it to be used by the service. This way the Dependency is pointed inwards from the Data layer into the Domain layer.

# Data layer

The Implementation Logic is stored here: api calls, DB calls etc.

## Repositories (Data: Infrastructure)

Repositories are part of the infrastructure. They are responsible for actually communicating with an API or Database. In reality it is often a set of basic CRUD requests. They are as simple as it can be and they know nothing about your application logic, their only task is to know the corresponding API and interact with it (SDKs, client libraries)

Unlike Services, repositories are part of the Data layer where they live with Mappers.

> A nice solution for generating API SDK Clients is https://www.npmjs.com/package/openapi-typescript-codegen that utilizes the Swagger OpenAPI 3.0 JSON documentation to generate a TypeScript SDK client. This is very helpful when working with REST API and can be used for Prime and our custom APIs.

## Mappers (Data: DTOs)

According to Clean Architecture, the Domain layer should not know anything about the outer layer. Entities and Services should not know about Vue or Repositories.

Repositories return data that should be mapped to an EntityData (a simple JSON Object). Since we want to outsource Repositories, they should also not know anything about the Application Entities. Therefore we need a middle layer that would know about Repositories and Entities and would do the conversion from one to the other.

This sets the following rules:

> RepositoryResponse does not know Entities.
> Entities do not know RepositoryResponse.
> Mappers know Entities and RepositoryResponse and live inside Data Layer.
> Mappers Interfaces live in Domain Layer.

## Gateways

Gateways is the bridge between the Data Layer and the Domain layer. Gateways implement gateways interfaces that are specified by the Domain layer by using the repositories and mappers. Their only task is to combine the two to provide the necessary functionality in the expected format.

## Setup

The Setup folder stores configuration files and the DI container.

### Config JSON

The configuration vars should be loaded on the initial build. Unlike know, the config vars are loaded asynchronously via axios which leads to many unpredictable bugs.

> We have 3 environments, so for the purposes we have the following config jsons.

- config.json (DEV env. can by modified for development purposes)

### Dependency injection

A very handy pattern for decoupling your Business logic from Implementation logic is Dependency Injection. Basically your Business logic tells your implementation logic what it wants, and implementation logic has to follow those rules.

For this we use Abstractions (repository interfaces). To simplify this process in TypeScript we can use libraries such as https://github.com/radzserg/rsdi, https://github.com/vovaspace/brandi, https://github.com/typestack/typedi, https://github.com/microsoft/tsyringe, https://github.com/inversify/InversifyJS or https://github.com/mgechev/injection-js which will do this for use. I like typedi with Decorators or rsdi without, but all are great.

It is locaded in `setup/di`

# Presentation layer

The presentation layer is our Quasar app. So all the files will be located in the src folder. I decided to move the Domain and Data folders outside the src folder to introduce a strict separation between the layers. This is not necessary and can all live inside the src folder is desired.

## Assets

Quasar Guide: https://quasar.dev/quasar-cli/handling-assets
Use ~ in referance images in assets folder `<img src="~assets/logo.png">`

> Image naming convetion:
> for pages:
> `src/assets/pages/<type>-<pageName>-<imageName>-<state>.svg`
> ex.: `src/assets/pages/bg-home-avatar-man-primary.svg`

for components:
`src/assets/components/<type>-<componentPathName>-<imageName>-<state>.svg`
ex.: `src/assets/components/icon-common-header-cart-active.svg`

## Boot

Follow Quasar conventions.

## Components

You will have two types of components. Smart and Dumb components.

- Dumb components are concerned with `how it looks`. They are basically pure functions. You pass them values in props and get results via events. They do not have side effects.
- Smart components (aka `Container`, `Provider`, `Wrapper`) are concerned with `how it works`. They can access the Pinia store and make action calls. They have side effects.

## CSS

Quasar Guide:

> !Important: Always start with setting up the `quasar.variables.sass` for your project. If your primary color is green, do not use `success` class instead.

> Use the BEM css naming convention http://getbem.com/faq/#css-nested-elements and stick to it.

> Use `app.scss` to import scss files from the folder `scss`. Use `scss` folder for element components like `button` or `list`. Page or complex component spesific styles go direclty into the component.

Side your `css` folder you may have

```
    css
    └── app.scss
    └── quasar.variables.sass
        └── scss
            └── button.scss
            └── modal.scss
            └── ...
        └── fonts
```

## Layouts

Quasar Guide: https://quasar.dev/layout/routing-with-layouts-and-pages
The layout folder is responsible strictly for the overall page structure. Positions of header, footer, drawer, sidebar, full width or max-width etc.

> Important! The layout is not responsible for the app logic, therefore it should never have any Pinia calls, axios calls ets. It may have some basic styles specific to this layout. In case you have multiple layouts, you should name them accordingly: `MainLayout.vue`, `ErrorLayout.vue`, `LoginLayout.vue` etc.

## Pages

The page is responsible for initiating data fetching. Most of the Pinia Actions should go here. This way you can easily control the flow of data from top to bottom.

Since Pages are smart components, to avoid creating over-coded pages, decouple presentation logic into dumb components. For example if you have a dorp-down menu on a page, instead of coding the menu, its active item, its list and onClick method in the page, create a component move this specific code there. The list of items for the menu can be fetched in the page and passed via props to the menu component, while the current item can be returned via an event.

> Best to have the shortest page possible, breaking it up into small simple components.

## Router

Follow Quasar conventions.

## Store

Pinia Store is part of the presentation layer and is responsible for making data reactive and accessible from different components. It should not implement any Application logic, not to mention infrastructure like making calls to the API.

> The Presentation Store knows nothing about the where the data comes from. It only knows how to store it and provide it.

- Use Store modules and keep the root file simple.
- In Actions call the DIContainer->Services to access the application logic.
- Store DTOs, not VOs. On `Getter` initialize by calling the `mapper->toDomain()`

# For Reading

Simple explanation of Clean Architecture
https://proandroiddev.com/clean-architecture-data-flow-dependency-rule-615ffdd79e29

Here is an article that had big influence on my code design "Building an Enterprise Application with Vue"
https://javascript.plainenglish.io/building-vue-enterprise-application-part-0-overture-6d41bea14236

and this
https://dirodriguezm.medium.com/implementing-a-clean-architecture-modular-application-in-nuxt-vue-typescript-part-1-domain-layer-ca721f266a58

Another article that helps better understand Clean Architecture
https://habr.com/ru/company/mobileup/blog/335382/
https://habr.com/ru/company/croc/blog/560674/

Article on mappers
https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/

I wrote an article on "Finding the perfect component file structure for a VueJS project" in 2019 and not much has changed since then.
https://medium.com/@vuefront/finding-the-perfect-component-file-structure-for-out-vuejs-app-b808a69dacac

We should also take advantage of TypeScript and avoid these mistakes
https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html

and follow these guidelines
https://basarat.gitbook.io/typescript/

and implement SOLID principals
https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design

Clean Architecture on Github
https://github.com/falsy/react-with-clean-architecture
https://github.com/thanhchungbtc/vue-shopping-clean-architecture
