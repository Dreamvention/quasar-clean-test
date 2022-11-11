# TypeScript config

```json
{
  "extends": "@quasar/app-vite/tsconfig-preset",
  "compilerOptions": {
    "allowJs": true,
    "sourceMap": true,
    "target": "es6",
    "strict": true,
    "skipLibCheck": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "types": ["quasar", "node", "lodash", "jest", "cypress", "@ionic-native"],
    "typeRoots": ["./types", "./node_modules/@types"],
    "lib": ["esnext", "dom", "es5", "dom.iterable", "scripthost"],
    "baseUrl": ".",
    "paths": {
      "setup/*": ["setup/*"],
      "data/*": ["data/*"],
      "domain/*": ["domain/*"],
      "src/*": ["src/*"],
      "app/*": ["*"],
      "components/*": ["src/components/*"],
      "layouts/*": ["src/layouts/*"],
      "pages/*": ["src/pages/*"],
      "assets/*": ["src/assets/*"],
      "boot/*": ["src/boot/*"],
      "stores/*": ["src/stores/*"]
    }
  },
  "include": ["data/**/*", "domain/**/*", "setup/**/*", "src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### target:ES6

Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.

### strict

The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options, which are outlined below. You can then turn off individual strict mode family checks as needed.

### noImplicitAny

If we don’t specify a type, and TypeScript can’t infer it automatically, the compiler will default to any type. This can be a serious problem in some instances because having any type to a variable tells the compiler “don’t type check this”

The existence of the noImplicitAny compiler option will cause cases where any is inferred for a type to become errors.

### noImplicitThis

Raise error on ‘this’ expressions with an implied ‘any’ type.

For example, the class below returns a function which tries to access this.width and this.height – but the context for this inside the function inside getAreaFunction is not the instance of the Rectangle.

### skipLibCheck

This can save time during compilation at the expense of type-system accuracy. For example, two libraries could define two copies of the same type in an inconsistent way. Rather than doing a full check of all d.ts files, TypeScript will type check the code you specifically refer to in your app’s source code.

### esModuleInterop

Turning on esModuleInterop will fix both of these problems in the code transpiled by TypeScript.

By default (with esModuleInterop false or not set) TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules. In doing this, there are two parts in particular which turned out to be flawed assumptions:

a namespace import like import \* as moment from "moment" acts the same as const moment = require("moment")

a default import like import moment from "moment" acts the same as const moment = require("moment").default

### module:esnext

Generally speaking, ESNext is the way forward it is supported by 98% of clients.

Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. Well-known module loaders used in JavaScript are Node.js’s loader for CommonJS modules and the RequireJS loader for AMD modules in Web applications.

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

**CommonJS**

```ts
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.twoPi = void 0;
const constants_1 = require('./constants');
exports.twoPi = constants_1.valueOfPi * 2;
```

**ESNext**

```ts
import { valueOfPi } from './constants';
export const twoPi = valueOfPi * 2;
```

### moduleResolution:node

Module resolution is the process the compiler uses to figure out what an import refers to. Consider an import statement like import { a } from "moduleA"; in order to check any use of a, the compiler needs to know exactly what it represents, and will need to check its definition moduleA.

This resolution strategy attempts to mimic the Node.js module resolution mechanism at runtime. The full Node.js resolution algorithm is outlined in Node.js module documentation.
