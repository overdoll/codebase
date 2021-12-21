/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 0e88d71f29eae8e72f2dfcc17b595fd1 */

import { ConcreteRequest } from "relay-runtime";
export type LanguageManagerQueryVariables = {};
export type LanguageManagerQueryResponse = {
    readonly languages: ReadonlyArray<{
        readonly locale: string;
        readonly name: string;
    }>;
    readonly language: {
        readonly locale: string;
        readonly name: string;
    };
};
export type LanguageManagerQuery = {
    readonly response: LanguageManagerQueryResponse;
    readonly variables: LanguageManagerQueryVariables;
};



/*
query LanguageManagerQuery {
  languages {
    locale
    name
  }
  language {
    locale
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "locale",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Language",
    "kind": "LinkedField",
    "name": "languages",
    "plural": true,
    "selections": (v0/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Language",
    "kind": "LinkedField",
    "name": "language",
    "plural": false,
    "selections": (v0/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LanguageManagerQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LanguageManagerQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0e88d71f29eae8e72f2dfcc17b595fd1",
    "metadata": {},
    "name": "LanguageManagerQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '91823d0e436a1eaa66668f545785aa49';
export default node;
