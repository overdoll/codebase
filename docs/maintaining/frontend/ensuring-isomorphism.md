# Ensuring Isomorphism

Since we want our app to be isomorphic \(works both on the server & client\), we want to make sure we write code that ensures isomorphism.

Make sure to write code that doesn't make use of any `document` or `window` variables, or use any React features that are only available on the client-side.

If you really must have client-only code, this can easily be achieved with the `CanUseDOM` constant, or use the `BailoutBoundary` which will only render the children on the client

```text
import CanUseDOM from '@//:modules/utilities/CanUseDOM';
import BailoutBoundary from '@//:modules/utilities/BailoutBoundary';
```
