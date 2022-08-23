/**
 * @generated SignedSource<<e22ecefdf12cdc82ee4da57b1988ce48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCustomCharacterShareRedditButtonFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "SearchCustomCharacterShareRedditButtonFragment";
};
export type SearchCustomCharacterShareRedditButtonFragment$key = {
  readonly " $data"?: SearchCustomCharacterShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCustomCharacterShareRedditButtonFragment">;
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
  "name": "SearchCustomCharacterShareRedditButtonFragment",
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

(node as any).hash = "a3f7667c19d95c75c8d4823b25f82318";

export default node;
