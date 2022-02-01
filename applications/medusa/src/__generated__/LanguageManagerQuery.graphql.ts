/**
 * @generated SignedSource<<4c875a04603c4092c56db513ae081e60>>
 * @relayHash 0e88d71f29eae8e72f2dfcc17b595fd1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0e88d71f29eae8e72f2dfcc17b595fd1

import { ConcreteRequest, Query } from 'relay-runtime';
export type LanguageManagerQuery$variables = {};
export type LanguageManagerQueryVariables = LanguageManagerQuery$variables;
export type LanguageManagerQuery$data = {
  readonly languages: ReadonlyArray<{
    readonly locale: string;
    readonly name: string;
  }>;
  readonly language: {
    readonly locale: string;
    readonly name: string;
  };
};
export type LanguageManagerQueryResponse = LanguageManagerQuery$data;
export type LanguageManagerQuery = {
  variables: LanguageManagerQueryVariables;
  response: LanguageManagerQuery$data;
};

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

(node as any).hash = "91823d0e436a1eaa66668f545785aa49";

export default node;
