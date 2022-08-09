/**
 * @generated SignedSource<<6d7ed4222b880d30c5c8f5fcb59c7a9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterLinkTileFragment$data = {
  readonly club: {
    readonly slug: string;
  } | null;
  readonly series: {
    readonly slug: string;
  } | null;
  readonly slug: string;
  readonly " $fragmentType": "CharacterLinkTileFragment";
};
export type CharacterLinkTileFragment$key = {
  readonly " $data"?: CharacterLinkTileFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterLinkTileFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterLinkTileFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "58a97e439449dd33b443710c223fa22f";

export default node;
