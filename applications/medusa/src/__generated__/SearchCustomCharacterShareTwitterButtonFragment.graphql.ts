/**
 * @generated SignedSource<<536fc1cfb34e4479df4506bea376da62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCustomCharacterShareTwitterButtonFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "SearchCustomCharacterShareTwitterButtonFragment";
};
export type SearchCustomCharacterShareTwitterButtonFragment$key = {
  readonly " $data"?: SearchCustomCharacterShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCustomCharacterShareTwitterButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchCustomCharacterShareTwitterButtonFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "club"
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "0eddc3c92aded2bb834a9b41e9d73fae";

export default node;
