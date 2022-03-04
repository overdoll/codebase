/**
 * @generated SignedSource<<896f97e6470a5495706bec9221418b98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClickCharacterFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly series: {
    readonly slug: string;
  };
  readonly " $fragmentType": "ClickCharacterFragment";
};
export type ClickCharacterFragment = ClickCharacterFragment$data;
export type ClickCharacterFragment$key = {
  readonly " $data"?: ClickCharacterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClickCharacterFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
  "name": "ClickCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};
})();

(node as any).hash = "f0d87ae5fe7aad2dfa09b4fa14f7bc4d";

export default node;
