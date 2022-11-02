/**
 * @generated SignedSource<<73b61a4cd7a6fcdb734467c513bbaa8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostCharactersModalFragment$data = {
  readonly characterRequests: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly characters: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "UpdatePostCharactersModalFragment";
};
export type UpdatePostCharactersModalFragment$key = {
  readonly " $data"?: UpdatePostCharactersModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostCharactersModalFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostCharactersModalFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CharacterRequest",
      "kind": "LinkedField",
      "name": "characterRequests",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "74b201fa2a834a3eb39989563d9f8610";

export default node;
