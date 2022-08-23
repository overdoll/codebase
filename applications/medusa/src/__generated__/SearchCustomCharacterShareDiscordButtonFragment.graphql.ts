/**
 * @generated SignedSource<<b799368d4b8f4f78c58699cd166dffaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchCustomCharacterShareDiscordButtonFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "SearchCustomCharacterShareDiscordButtonFragment";
};
export type SearchCustomCharacterShareDiscordButtonFragment$key = {
  readonly " $data"?: SearchCustomCharacterShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchCustomCharacterShareDiscordButtonFragment">;
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
  "name": "SearchCustomCharacterShareDiscordButtonFragment",
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

(node as any).hash = "1211a06dea68387a5b7b2f9172f31c1f";

export default node;
